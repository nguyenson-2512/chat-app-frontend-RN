import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform,} from "react-native";
import styles from './style';

// import {
//   API,
//   Auth,
//   graphqlOperation,
// } from 'aws-amplify';

// import {
//   createMessage,
//   updateChatRoom,
// } from '../../src/graphql/mutations';

import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Entypo,
  Fontisto,
} from '@expo/vector-icons';
import socketClient  from "socket.io-client";
const SERVER = "http://localhost:8000/";

const InputMessage = (props: any) => {
  const socket = socketClient(SERVER);
  const { chatRoomID } = props;

  const [message, setMessage] = useState('');
  const [myUserId, setMyUserId] = useState(null);
  const [ userId, setUserId] = useState('607dbf50409cd8c0bdaf6bad');
  const [ chatRoomId, setChatRoomId] = useState('607dc018409cd8c0bdaf6bae');


  useEffect(() => {
    // const fetchUser = async () => {
    //   const userInfo = await Auth.currentAuthenticatedUser();
    //   setMyUserId(userInfo.attributes.sub);
    // }
    // fetchUser();

  })

  const onMicrophonePress = () => {
    console.warn('Microphone')
  }

//   const updateChatRoomLastMessage = async (messageId: string) => {
//     try {
//       await API.graphql(
//         graphqlOperation(
//           updateChatRoom, {
//             input: {
//               id: chatRoomID,
//               lastMessageID: messageId,
//             }
//           }
//         )
//       );
//     } catch (e) {
//       console.log(e);
//     }
//   }

  const onSendPress = async () => {
    try {
      // const newMessageData = await API.graphql(
      //   graphqlOperation(
      //     createMessage, {
      //       input: {
      //         content: message,
      //         userID: myUserId,
      //         chatRoomID
      //       }
      //     }
      //   )
      // )

      // await updateChatRoomLastMessage(newMessageData.data.createMessage.id)

      // socket.emit('chat', {
      //   chatRoomId,
      //   content: message,
      //   user: {
      //     id: userId,
      //     username: 'son-uiui',
      //     imageUri: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'
      //   }
      // });

      props.parentCallback({
        chatRoomId,
        content: message,
        user: {
          id: userId,
          username: 'son-uiui',
          imageUri: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'
        }
      })

      
  
      // this.setState((state) => {
      //   // Update the chat with the user's message and remove the current message.
      //   return {
      //     chat: [...state.chat, {
      //       name: state.name,
      //       content: state.content,
      //     }],
      //     content: '',
      //   };
      // }, this.scrollToBottom);

    } catch (e) {
      console.log(e);
    }

    setMessage('');
  }

  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendPress();
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{width: '100%'}}
    >
      <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FontAwesome5 name="laugh-beam" size={24} color="grey" />
        <TextInput
          placeholder={"Type a message"}
          style={styles.textInput}
          multiline
          value={message}
          onChangeText={setMessage}
        />
        <Entypo name="attachment" size={24} color="grey" style={styles.icon} />
        {!message && <Fontisto name="camera" size={24} color="grey" style={styles.icon} />}
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          {!message
            ? <MaterialCommunityIcons name="microphone" size={28} color="white" />
            : <MaterialIcons name="send" size={28} color="white" />}
        </View>
      </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default InputMessage;