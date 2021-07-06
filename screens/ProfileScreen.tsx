import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Text, View } from '../components/Themed';
import moment from "moment";


export default function ProfileScreen() {
  const [ userId, setUserId] = useState('607dbf50409cd8c0bdaf6bad');
  const [ userInfo, setUserInfo ] = useState<any>()
  useEffect(() => {
    fetch(`http://localhost:3000/api/user/${userId}`)
    .then((response) => {
      console.log(response)
      return response.json()})
    .then((json) => setUserInfo(json))
    .catch((error) => console.error(error))
  }, [])

  return (
      <View style={styles.header}>
          <View>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: userInfo?.imageUri}}/>
                <Text style={styles.name}>{userInfo?.username}</Text>
                <Text style={styles.userInfo}>{userInfo?.email}</Text>
                <Text style={styles.userInfo}>Join Ch4tter in {moment(userInfo?.createdAt).format("DD/MM/YYYY")} </Text>
            </View>
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "white",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  userInfo:{
    fontSize:16,
    color:"#778899",
    fontWeight:'600',
  },
  body:{
    backgroundColor: "#778899",
    height:500,
    alignItems:'center',
  },
  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  iconContent:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:5,
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
  info:{
    fontSize:18,
    marginTop:20,
    color: "#FFFFFF",
  }
});