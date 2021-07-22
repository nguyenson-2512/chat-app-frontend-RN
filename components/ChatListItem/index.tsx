import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { ChatRoom } from "../../types";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";

export type ChatListItemProps = {
  chatRoom: ChatRoom;
};

function ChatListItem(props: any) {
  const { chatRoom, myId } = props;
  const [targetUser, setTargetUser] = useState(null);
  const colorScheme = useColorScheme();

  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate("ChatRoom", {
      targetUser: targetUser,
    });
  };

  useEffect(() => {
    console.log(chatRoom, "chatRoom");
    const result = chatRoom.users.filter(user =>  user._id != myId)
    setTargetUser(result[0])
  });

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: "100%",
      justifyContent: 'space-between',
      padding: 10,
    },
    leftContainer: {
      flexDirection: 'row',
      width: '80%'
    },
    midContainer: {
      justifyContent: 'space-around',
      width: '80%'
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
    lastMessage: {
      fontSize: 16,
      color: Colors[colorScheme].text50
    },
    time: {
      fontSize: 14,
      width: '20%',
      color: Colors[colorScheme].text40
    },
  });

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image
            source={{ uri: targetUser?.imageUri }}
            style={styles.avatar}
          />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{targetUser?.username}</Text>
            <Text numberOfLines={1} style={styles.lastMessage}>
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
