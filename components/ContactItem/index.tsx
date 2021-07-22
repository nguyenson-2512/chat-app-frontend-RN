import React from "react";
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { User } from "../../types";
// import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";

export type ContactItemProps = {
  user: User;
};

const ContactItem = (props: ContactItemProps) => {
  const { user } = props;

  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: "100%",
      justifyContent: 'space-between',
      padding: 10,
    },
    lefContainer: {
      flexDirection: 'row',
    },
    midContainer: {
      justifyContent: 'space-around'
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 50,
      marginRight: 15,
    },
    username: {
      fontWeight: 'bold',
      fontSize: 16,
      color: Colors[colorScheme].text
    },
    status: {
      fontSize: 16,
      color: Colors[colorScheme].text50
    },
  });
  

  const onClick = async () => {
    try {
      navigation.navigate("ChatRoom", {
        targetUser: user,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.username}</Text>
            <Text numberOfLines={2} style={styles.status}>
              Online
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ContactItem;
