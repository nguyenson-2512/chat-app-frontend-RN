import React from 'react';
import {Text, View} from 'react-native';
import { Message } from "../../types";
import moment from "moment";
import styles from './style';

export type ChatMessageProps = {
  message: Message;
  myId: String,
}

const ChatMessage = (props: any) => {
  const { message, myId } = props;

  const isMyMessage = () => {
    return message.user.id === myId;
  }

  return (
    <View style={styles.container}>
      <View style={[
        styles.messageBox, {
          backgroundColor: isMyMessage() ? '#DCF8C5' : '#d7d9d7',
          marginLeft: isMyMessage() ? '20%' : 0,
        }
      ]}>
        <View style={styles.messageContainer}>
          {!isMyMessage() && <Text style={styles.name}>{message.user.username}</Text>}
          <Text style={styles.message}>{message.content}</Text>
          <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
        </View>
      </View>
    </View>
  )
}

export default ChatMessage;