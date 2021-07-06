
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  BackHandler
} from "react-native";
import { ChatRoom } from "../../types";
import styles from "./style";
import moment from "moment";
import { useNavigation } from '@react-navigation/native';
import navigation from '../../navigation';

import socketClient  from "socket.io-client";
const SERVER = "http://localhost:8000/";

export type ChatListItemProps = {
    chatRoom: ChatRoom;
}

function ChatListItem(props: any) {
  var socket = socketClient(SERVER);
  
    const { chatRoom } = props;
    // const user = chatRoom.users[1]
    // const [ otherUser, setOtherUser] = useState(null);

    const navigation = useNavigation();

    // useEffect(() => {
    //     const getOtherUser = async () => {
    //       const userInfo = await Auth.currentAuthenticatedUser();
    //       if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
    //         setOtherUser(chatRoom.chatRoomUsers.items[1].user);
    //       } else {
    //         setOtherUser(chatRoom.chatRoomUsers.items[0].user);
    //       }
    //     }
    //     getOtherUser();
    //   }, [])

    const onClick = () => {
      //   navigation.navigate('ChatRoom', {
      //     id: chatRoom.id,
      //     name: otherUser?.name,
      //   })
      // }

      // if (!otherUser) {
      //   return null;
      // }

      navigation.navigate('ChatRoom', {
        id: chatRoom._id,
        name: chatRoom.users[0].username
        // name: 'son'
      })
    }

    useEffect(() => {
      console.log(chatRoom)
    })

      return (
        <TouchableWithoutFeedback onPress={onClick}>
          <View style={styles.container}>
            <View style={styles.lefContainer}>
              <Image source={{ uri: chatRoom.users[0].imageUri}} style={styles.avatar}/>
    
              <View style={styles.midContainer}>
                <Text style={styles.username}>{chatRoom.users[0].username}</Text>
                <Text
                  numberOfLines={2}
                  style={styles.lastMessage}>
                  {chatRoom.lastMessage.content
                    // ? `${chatRoom.lastMessage.user.name}: ${chatRoom.lastMessage.content}`
                    ? `${chatRoom.lastMessage.content}`
                    : ""}
                </Text>
              </View>
    
            </View>
    
            <Text style={styles.time}>
              {chatRoom.lastMessage && moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        )
      
}

export default ChatListItem