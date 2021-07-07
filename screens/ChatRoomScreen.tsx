import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { View, Text } from "../components/Themed";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import ChatMessage from "../components/ChatMessage";
import InputMessage from "../components/InputMessage";
import socketClient from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SERVER = "http://localhost:8000/";

const ContactsScreen = (props: any) => {
  const socket = socketClient(SERVER);
  const route = useRoute();
  const { targetUser } = route.params;
  const [userId, setUserId] = useState("");
  const [chatRoomId, setChatRoomId] = useState("");
  const [chatList, setChatList] = useState<any[]>([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const createChatRoom = async (userData: any) => {
    return fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users: [userData, targetUser],
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson, "llđkkf");
        socket.emit("current-chatroom", responseJson.data._id);
        socket.on("init", (chats) => {
          setChatList(chats);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    async function getUserInfo() {
      const { user } = await getData();
      setUserId(user._id);
      const ids = [user._id, targetUser._id];
      fetchChatRoom(ids, user);
    }
    getUserInfo();
  }, []);

  const fetchChatRoom = (userIds: any, userData: any) => {
    fetch("http://localhost:3000/api/chat/chatroom", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users: userIds,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.id != 0) {
          setChatRoomId(json.id);
          socket.emit("current-chatroom", json.id);
          socket.on("init", (chats) => {
            console.log("hehe", chats);
            setChatList(chats);
          });
        } else {
          createChatRoom(userData);
        }
      })
      .catch((error) => console.error(error));
  };

  const callbackFunction = (childData: any) => {
    socket.emit("chat", childData);
    socket.on("new-chat", (newChat) => {
      console.log("new chat from be", newChat);
      setChatList([newChat, ...chatList]);
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chatList}
        renderItem={({ item }) => <ChatMessage message={item} myId={userId} />}
        inverted
        keyExtractor={(item) => item._id.toString()}
      />
      <InputMessage parentCallback={callbackFunction} chatRoomID={chatRoomId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ContactsScreen;
