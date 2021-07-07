import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { ChatRoom } from "../../types";
import styles from "./style";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

export type ChatListItemProps = {
  chatRoom: ChatRoom;
};

function ChatListItem(props: any) {
  const { chatRoom } = props;

  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate("ChatRoom", {
      targetUser: chatRoom.users[1],
    });
  };

  useEffect(() => {
    console.log(chatRoom, "hhee prop child");
  });

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image
            source={{ uri: chatRoom.users[1].imageUri }}
            style={styles.avatar}
          />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{chatRoom.users[1].username}</Text>
            <Text numberOfLines={2} style={styles.lastMessage}>
              {chatRoom?.lastMessage ? `${chatRoom?.lastMessage?.content}` : ""}
            </Text>
          </View>
        </View>
        <Text style={styles.time}>
          {chatRoom?.lastMessage &&
            moment(chatRoom?.lastMessage?.createdAt).format("DD/MM/YYYY")}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ChatListItem;
