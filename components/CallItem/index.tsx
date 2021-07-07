import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import { User } from "../../types";
import styles from "./style";
import { useNavigation } from '@react-navigation/native';



export type CallItemProps = {
  user: User;
  myInfo: User;
}

const CallItem = (props: CallItemProps) => {

    const { user, myInfo } = props;
    var callIcon = "https://img.icons8.com/color/48/000000/phone.png";

    const navigation = useNavigation();
    const onClick = () => {
      navigation.navigate('CallVoice', {
        user,
        myInfo
      })
    }

  return (
    <TouchableOpacity onPress={onClick}>
        <View style={styles.row}>
        <Image source={{ uri: user.imageUri }} style={styles.pic} />
        <View>
            <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{user.username}</Text>
            </View>
            <View style={styles.end}>
            <Image style={[styles.icon, {marginLeft:15, marginRight:5, width:14, height:14}]} source={{uri:"https://img.icons8.com/small/14/000000/double-tick.png"}}/>
            {/* <Text style={styles.time}>{user.date} {user.time}</Text> */}
            </View>
        </View>
        <Image style={[styles.icon, { marginRight: 50 }]} source={{uri: callIcon}}/>
        </View>
  </TouchableOpacity>
  )
};

export default CallItem;