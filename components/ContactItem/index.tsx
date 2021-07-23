import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import { AntDesign } from '@expo/vector-icons';

const ContactItem = (props: any) => {
  const { user, myInfo } = props;
  const [isShow, setIsShow] = useState<any>(null);


  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: "100%",
      justifyContent: 'space-between',
      padding: 10,
    },
    lefContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: "100%",
    },
    midContainer: {
      justifyContent: 'space-around'
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 50,
      marginRight: 15,
    },
    username: {
      fontWeight: 'bold',
      fontSize: 16,
      color: Colors[colorScheme].text
    },
    status: {
      fontSize: 16,
      color: Colors[colorScheme].text50
    },
  });

  useEffect(() => {
    setIsShow(user.friendList.findIndex(item => item.id == myInfo._id) == -1 ? true : false)
  }, []);

  const sendRequest = () => {
    return fetch("http://localhost:3000/api/user/send-request", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          id: myInfo._id,
          username: myInfo.username,
          imageUri: myInfo.imageUri
        },
        receiver: {
          id: user._id,
          username: user.username,
          imageUri: user.imageUri
        }
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson) {
          setIsShow(false)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const onClick = async () => {
    try {
      navigation.navigate("ChatRoom", {
        targetUser: user,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <View style={{flexDirection: 'row'}}>
            <Image source={{ uri: user.imageUri }} style={styles.avatar} />
            <View style={styles.midContainer}>
              <Text style={styles.username}>{user.username}</Text>
              <Text numberOfLines={2} style={styles.status}>
                Online
              </Text>
            </View>
          </View>
          {isShow ? <TouchableOpacity onPress={sendRequest}>
          <AntDesign name="adduser" size={24} color="black" style={{marginTop: 4}} />
          </TouchableOpacity>: null}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ContactItem;
