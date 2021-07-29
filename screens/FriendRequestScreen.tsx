import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import { Feather } from '@expo/vector-icons';

import { Text, View } from "../components/Themed";

export default function FriendRequestScreen({navigation}) {
  const [userRequest, setUserRequest] = useState<any>({});
  const [myInfo, setMyInfo] = useState<any>({});

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function getUserInfo() {
      const { user } = await getData();
      setMyInfo(user);
      getListUser(user?._id);
    }
    getUserInfo();
  }, []);

  const getListUser = (userId: any) => {
    fetch(`http://localhost:3000/api/user/request/${userId}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data.request, '----')
        setUserRequest(json.data.request);
      })
      .catch((error) => console.error(error));
  };

  const acceptInvite = (user: any) => {
    navigation.navigate('Friend List')
    return fetch("http://localhost:3000/api/user/accept-request", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        acceptorUser: {
          id: myInfo._id,
          username: myInfo.username,
          imageUri: myInfo.imageUri
        },
        acceptedUser: {
          id: user.id,
          username: user.username,
          imageUri: user.imageUri
        }
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson) {
          navigation.navigate('Friend List')
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <View lightColor="white" darkColor="black" style={{ flex: 1 }}>
      <FlatList
        data={userRequest}
        keyExtractor={(item) => {
          return item?._id;
        }}
        renderItem={({ item }) => {
          return (
            <View lightColor="white" darkColor="black">
            <TouchableOpacity>
              <View style={[styles.card, { borderColor: "#4482B5", marginTop:10 }]}>
              <View lightColor="white" darkColor="black" style={styles.cardContent}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                <Image
                  style={[styles.image, styles.imageContent]}
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
                  }}
                />
                <Text lightColor="black" darkColor="white" style={styles.name}>{item.username}</Text>
                </View>
                <TouchableOpacity onPress={() => acceptInvite(item)}>
                  <Feather name="user-check" size={24} color="black" />
                </TouchableOpacity>
              </View>
              </View>
            </TouchableOpacity>
            </View>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
  card: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "column",
    borderTopWidth: 40,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: "row",
    marginLeft: 10,
    justifyContent: 'space-between'
  },
  imageContent: {
    marginTop: -40,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    alignSelf: "center",
  },
});
