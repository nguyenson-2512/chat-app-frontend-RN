import * as React from "react";
import { FlatList, StyleSheet, Image, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from "../components/Themed";
import ContactItem from "../components/ContactItem";
import { useEffect, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import { filter } from "lodash";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export default function ContactsScreen() {
  const [userId, setUserId] = useState({});
  const [userList, setUserList] = useState<any>([]);
  const [userFullList, setFullUserList] = useState<any>([]);
  const [searchInput, setSearchInput] = useState("");
  const colorScheme = useColorScheme();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function getUserInfo() {
      const {user} = await getData();
      setUserId(user);
      fetchUserList(user._id)
    }
    getUserInfo();
  }, []);

  const fetchUserList = (userId: string) => {
    fetch(`http://localhost:3000/api/user/${userId}/list-users/`)
    .then((response) => response.json())
    .then((json) => {
      setUserList(json);
      setFullUserList(json);
    })
    .catch((error) => console.error(error));
  }

  const handleSearch = (text: string) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(userFullList, (user) => {
      return contains(user, formattedQuery);
    });
    setUserList(filteredData);
    setSearchInput(text);
  };

  const contains = (user: any, query: string) => {
    if (user.username.includes(query) || user.email.includes(query)) {
      return true;
    }
    return false;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors[colorScheme].background,
    },
    formContent: {
      flexDirection: "row",
      marginTop: 5,
      borderRadius: 30,
    },
    inputContainer: {
      // borderBottomColor: "#F5FCFF",
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 30,
      height: 45,
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      margin: 10,
    },
    iconBtnSearch: {
      alignSelf: "center",
    },
    inputs: {
      height: 45,
      marginLeft: 16,
      borderBottomColor: "#FFFFFF",
      flex: 1,
    },
    inputIcon: {
      marginLeft: 15,
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.formContent}>
        <View style={styles.inputContainer}>
          <Octicons
            name="search"
            style={styles.inputIcon}
            size={22}
            color={"black"}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Search"
            onChangeText={(text) => handleSearch(text)}
            value={searchInput}
          />
        </View>
      </View>
      <FlatList
        style={{ width: "100%" }}
        data={userList}
        renderItem={({ item }) => <ContactItem user={item} myInfo={userId}/>}
        keyExtractor={(item) => item?._id}
      />
    </View>
  );
}


