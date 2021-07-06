import * as React from 'react';
import {FlatList, StyleSheet} from 'react-native';
// import { API, graphqlOperation } from 'aws-amplify';
import { View, Text } from '../components/Themed';
// import ContactListItem from '../components/ContactListItem';

// import { listUsers }  from '../src/graphql/queries';
import {useEffect, useState} from "react";
import { useRoute } from '@react-navigation/native'
import ChatMessage from '../components/ChatMessage'
import chatRoomData from '../data/chatRoom'
import message from '../data/message';
import InputMessage from '../components/InputMessage';
import axios from "axios";
import socketClient  from "socket.io-client";
import AsyncStorage from '@react-native-async-storage/async-storage';
const SERVER = "http://localhost:8000/";


const ContactsScreen = (props: any) => {
  const socket = socketClient(SERVER);
  const route = useRoute()
  // another

  // const { user } = route.params;
  // console.log('naotj', user)

  const [ userId, setUserId] = useState('');
  const [ chatRoomId, setChatRoomId] = useState('607dc018409cd8c0bdaf6bae');
  const [ chatList, setChatList] = useState<any[]>([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log(e);
    }
  }

  // const createChatRoom = async () => {
  //   return fetch('http://localhost:3000/api/chat', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type':'application/json'
  //     },
  //     body: JSON.stringify({
  //       username: this.state.username,
  //       password: this.state.password,
  //     }),
  //     // body: `username=${this.state.username}&password=${this.state.password}`
  //   })
  //     .then((response) => response.json())
  //     .then(async (responseJson) => {
  //       console.log(responseJson)
  //       // console.log(JSON.stringify(responseJson))
  //       // this.setState({ checkLogin: JSON.stringify(responseJson.body) });
  //       this.setState({ checkLogin: responseJson.resultcode });
  //       if (this.state.checkLogin === 0) {
  //         //console.warn(responseJson);
  //         Alert.alert("Thông báo!", "Bạn đã đăng nhập thành công!");
  //         // await this.storeUser(responseJson.data);
  //         // this.props.navigation.navigate('Root', {
  //         // })
  //         await this.storeData(responseJson.data)
  //         this.props.navigation.reset({
  //           index: 0,
  //           routes: [{ name: 'Root' }],
  //         });
  //       } else {
  //         Alert.alert("Thông báo!", "Bạn đã đăng nhập không thành công!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  useEffect(() => {
    async function getUserInfo() {
      const {user} = await getData();
      setUserId(user._id);
    }
    getUserInfo()
    socket.emit('current-chatroom', chatRoomId)
    socket.on('init', (chats) => {
      // console.log(chats)
      setChatList(chats)
    })
    // fetchChatList();
  }, [chatList])

  const callbackFunction = (childData: any) => {
    socket.emit('chat', childData);
    // socket.on('init', (chats) => {
    //   setChatList(chats)
    // })
    socket.on('new-chat', (newChat) => {
      console.log("new chat from be", newChat)

      // const newList = [...chatList, newChat]
      setChatList([...chatList, newChat])
    })
  }

  // const fetchChatList = async () => {
  //   axios
  //     .get(
  //       `http://localhost:3000/api/chat/${chatRoomId}`
  //     )
  //     .then((res) => {
  //       // console.log(res?.data)
  //       setChatList(res?.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <View style={styles.container}>
      {/* <FlatList
        style={{width: '100%'}}
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
      /> */}
      <FlatList
        data={chatList}
        renderItem={({ item }) => <ChatMessage message={item} myId={userId}/>}
        inverted
        keyExtractor={(item) => item._id.toString()}
      />
      <InputMessage parentCallback={callbackFunction} chatRoomID={1}/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ContactsScreen