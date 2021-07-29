import * as React from "react";
import { StyleSheet, Image, Dimensions, Alert, TouchableOpacity } from "react-native";
import { View, Text } from "../components/Themed";
const { width } = Dimensions.get('window');

import { useEffect, useState } from "react";
import socketClient from "socket.io-client";

const SERVER = "http://localhost:8000/";


export default function CallVoiceScreen(props: any) {

  const { user, myInfo } = props.route.params;
  const socket = socketClient(SERVER);


  const clickEventListener = () =>{
    Alert.alert('Message', 'button clicked');
  }

  useEffect(() => {
    socket.on('connect', function () {
      socket.emit('join', {
        username: myInfo.username
      });
    });
    socket.emit('userPresence', {
      username: myInfo.username
    });
    socket.on('onlineUsers', function (onlineUsers) {
      console.log(onlineUsers, 'check')
      //save data-user not sender
      // for(let u in onlineUsers) {
        // chatObject.data.connections[user.username] = {
        //   onlineStatus: 'online'
      // }
    });

    socket.on('disconnect', function () {
      // To intimate other clients about disconnection from server
      socket.emit('disconnect', {
        username: myInfo.username
      });
    });

    socket.on('disconnected', function (username) {
      // chatObject.data.connections[username] = {
      //   onlineStatus: 'offline',
      // };
    });

  }, [])

  return (
    <View style={{ flex: 1 }}>
    <View style={styles.topBar}>
      {/* <View style={{ flexDirection: 'row' }}>
        <Image style={[styles.iconImg, { marginRight: 50 }]} source={{uri: "https://img.icons8.com/color/48/000000/video-call.png"}}/>
        <Text style={styles.subText}>CH4TTER CALL</Text>
      </View> */}
      <Text style={styles.title}>{user.username}</Text>
      <Text style={styles.subText}>CALLING</Text>
    </View>
    <Image style={[styles.image]} source={{ uri: user.imageUri }}/>
    <View style={styles.bottomBar}>
      <TouchableOpacity style={[styles.btnStopCall, styles.shadow]} onPress={clickEventListener}>
        <Image style={styles.iconImg} source={{uri: "https://img.icons8.com/windows/32/000000/phone.png"}}/>
      </TouchableOpacity>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#3898c1',
    height: 140,
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e20e30',
    marginTop: 250 
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3898c1',
    flex: 1,
  },
  title: {
    color: '#f0efef',
    fontSize: 36,
  },
  subText: {
    color: '#c8c8c8',
    fontSize: 14,
  },
  iconImg:{
    height: 32,
    width: 32, 
    alignSelf:'center'
  },
  btnStopCall: {
    height:65,
    width:65,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:32,
    backgroundColor: "#FF0000",
    position:'absolute',
    bottom:50,
    left:'43%',
    zIndex:1,
  },
  btnAction: {
    height:45,
    width:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:22,
    backgroundColor: "#fff",
  },
  shadow:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  }
});