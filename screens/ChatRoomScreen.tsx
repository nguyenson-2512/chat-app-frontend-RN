import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import * as React from "react";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import socketClient from "socket.io-client";
import ChatMessage from "../components/ChatMessage";
import InputMessage from "../components/InputMessage";
import { View } from "../components/Themed";
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

  const removeUserData = async () => {
    try {
      await AsyncStorage.removeItem("target-user");
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
      await storeData(targetUser);
      const ids = [user._id, targetUser._id];
      fetchChatRoom(ids, user);
    }
    getUserInfo();
    return () => {
      removeUserData();
    };
  }, []);

  const storeData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("target-user", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const storeChatRoom = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("target-chatroom", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

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
          storeChatRoom(json.id);
          socket.emit("current-chatroom", json.id);
          socket.on("init", (chats) => {
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
        style={styles.flatList}
      />
      <View style={styles.input}>
        <InputMessage
          parentCallback={callbackFunction}
          chatRoomID={chatRoomId}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    height: 680,
    flexGrow: 0,
    marginBottom: 70
  },
  input: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ContactsScreen;
