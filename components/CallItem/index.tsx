import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { User } from "../../types";
import { useNavigation } from '@react-navigation/native';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons'



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
    const colorScheme = useColorScheme();
    const styles = StyleSheet.create({
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#dcdcdc',
        // backgroundColor: '#fff',
        backgroundColor: Colors[colorScheme].background,
        borderBottomWidth: 1,
        padding: 10,
        justifyContent: 'space-between',
      },
      pic: {
        borderRadius: 25,
        width: 50,
        height: 50,
      },
      nameContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 270,
      },
      nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: Colors[colorScheme].text,
        fontSize: 15,
        marginTop: 10
      },
      active: {
        marginLeft: 15,
        fontWeight: '400',
        color: '#69a3ea',
        fontSize: 12,
        marginTop: 5
      },
      end: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon:{
        height: 28,
        width: 28,
      }
    });

  return (
    <TouchableOpacity onPress={onClick}>
        <View style={styles.row}>
        <Image source={{ uri: user.imageUri }} style={styles.pic} />
        <View>
            <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{user.username}</Text>
            <Text style={styles.active}>Active</Text>
            </View>
            <View style={styles.end}>
            <Ionicons style={[styles.icon, {marginLeft:15, marginRight:5, width:14, height:14}]} name="checkmark" size={24} color={Colors[colorScheme].icon} />
            </View>
        </View>
        <Image style={[styles.icon, { marginRight: 20 }]} source={{uri: callIcon}}/>
        </View>
  </TouchableOpacity>
  )
};

export default CallItem;