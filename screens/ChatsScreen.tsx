import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import ChatListItem from "../components/ChatListItem";
// import NewMessageButton from "../components/NewMessageButton";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChatsScreen(props: any) {
  const [chatRoomList, setChatRoomsList] = useState([]);
  const [userId, setUserId] = useState();

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
      setUserId(user._id);
      fetchChatRoomList(user._id);
    }
    getUserInfo();
  }, []);

  const fetchChatRoomList = (userId: any) => {
    fetch(`http://localhost:3000/api/chat/${userId}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json, "list chat rôm");
        setChatRoomsList(json);
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={chatRoomList}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        keyExtractor={(item) => item?._id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
