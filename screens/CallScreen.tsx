import * as React from "react";
import { FlatList } from "react-native";
import { View } from "../components/Themed";
import CallItem from "../components/CallItem";

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CallScreen() {
  const [userList, setUserList] = useState<any>([]);
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
    fetch(`http://localhost:3000/api/user/${userId}/list-users/`)
      .then((response) => response.json())
      .then((json) => {
        setUserList(json);
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={userList}
        keyExtractor={(item) => {
          return item?._id;
        }}
        renderItem={({ item }) => <CallItem user={item} myInfo={myInfo}/>}
      />
    </View>
  );
}
