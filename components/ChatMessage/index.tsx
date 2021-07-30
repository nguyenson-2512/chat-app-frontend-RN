import React, { useState } from 'react';
import {Text, View, Image, TouchableWithoutFeedback, Alert, TouchableOpacity} from 'react-native';
import { Message } from "../../types";
import moment from "moment";
import styles from './style';
import { Entypo } from '@expo/vector-icons';

export type ChatMessageProps = {
  message: Message;
  myId: String,
}

const ChatMessage = (props: any) => {
  const { message, myId } = props;
  const [chat, setChat] = useState(message);


  const isMyMessage = () => {
    return message.user.id === myId;
  }

  function deleteChat() {
    console.log('jjaja')
    props.parentCallback(
      {...message}
    );


    // Alert.alert(
    //   "Are your sure?",
    //   "Are you sure you want to remove this chat item?",
    //   [
    //     // The "Yes" button
    //     {
    //       text: "Yes",
    //       onPress: async () => {
    //         try {
    //           props.parentCallback({
    //             message
    //           });
    //         } catch (e) {
    //           console.log(e);
    //         }
    //       },
    //     },
    //     {
    //       text: "No",
    //     },
    //   ]
    // );
  }

  function likeChat(chatItem) {
    fetch(`http://localhost:3000/api/chat/like/${chatItem._id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if(json) {
          const updateChat = {...chat, like: true}
          setChat(updateChat)
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <TouchableWithoutFeedback onLongPress={() => deleteChat()}>
    <View style={styles.container}>
      <View style={[
        styles.messageBox, {
          backgroundColor: isMyMessage() ? '#DCF8C5' : '#d7d9d7',
          marginLeft: isMyMessage() ? '20%' : 0,
        }
      ]}>
        <View style={styles.messageContainer}>
          {!isMyMessage() && <Text style={styles.name}>{message.user.username}</Text>}
          {message.content.length < 255 ? <Text style={styles.message}>{message.content}</Text> : 
            <Image
              source={{ uri: message.content }}
              style={styles.image}
            />}
          <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
        </View>
        {chat?.like ? <Entypo name="heart" size={20} color="red" style={[styles.like, {
          marginLeft: isMyMessage() ? '20%' : 0,
        }]}/>: <TouchableWithoutFeedback onPress={() => likeChat(message)}>
        <Entypo name="heart" size={20} color="white" style={[styles.like, {
          marginLeft: isMyMessage() ? '20%' : 0,
        }]}/>
        </TouchableWithoutFeedback>}
      </View>
    </View>
    </TouchableWithoutFeedback>
  )
}

export default ChatMessage;