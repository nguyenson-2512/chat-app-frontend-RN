import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { User } from "../../types";
import styles from "./style";
import { useNavigation } from '@react-navigation/native';

export type ContactItemProps = {
  user: User;
}

const ContactItem = (props: ContactItemProps) => {
  const { user } = props;

  const navigation = useNavigation();

  const onClick = async () => {
    try {
      //  1. Create a new Chat Room
    //   const newChatRoomData = await API.graphql(
    //     graphqlOperation(
    //       createChatRoom, {
    //         input: {
    //           lastMessageID: "zz753fca-e8c3-473b-8e85-b14196e84e16"
    //         }
    //       }
    //     )
    //   )
    //   if (!newChatRoomData.data) {
    //     console.log(" Failed to create a chat room");
    //     return;
    //   }
    //   const newChatRoom = newChatRoomData.data.createChatRoom;

      // 2. Add `user` to the Chat Room

      //  3. Add authenticated user to the Chat Room
    //   const userInfo = await Auth.currentAuthenticatedUser();
    //   await API.graphql(
    //     graphqlOperation(
    //       createChatRoomUser, {
    //         input: {
    //           userID: userInfo.attributes.sub,
    //           chatRoomID: newChatRoom.id,
    //         }
    //       }
    //     )
    //   )

      navigation.navigate('ChatRoom', {
        user
        // id: newChatRoom.id,
      })

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar}/>
          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.username}</Text>
            <Text numberOfLines={2} style={styles.status}>Online</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
};

export default ContactItem;