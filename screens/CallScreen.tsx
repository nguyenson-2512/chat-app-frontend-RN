import * as React from "react";
import { FlatList, StyleSheet, Image, TextInput } from "react-native";
import { View, Text } from "../components/Themed";
import CallItem from "../components/CallItem";


import { useEffect, useState } from "react";


export default function CallScreen() {
  const [userId, setUserId] = useState("607dbf50409cd8c0bdaf6bad");
  const [userList, setUserList] = useState<any>([]);
  const [userFullList, setFullUserList] = useState<any>([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/user/${userId}/list-users/`)
      .then((response) => response.json())
      .then((json) => {
        setUserList(json);
        setFullUserList(json);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={{ flex: 1 }} >
    <FlatList
      data={userList}
      keyExtractor = {(item) => {
        return item?.id;
      }}
      renderItem={({ item }) => <CallItem user={item} />}
    />
  </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 270,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,

  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  end: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
  },
  icon:{
    height: 28,
    width: 28,
  }
});
