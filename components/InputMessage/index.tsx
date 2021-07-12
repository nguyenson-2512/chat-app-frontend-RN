import {
  Entypo,
  FontAwesome5,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./style";

const InputMessage = (props: any) => {
  const { chatRoomID } = props;

  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function getUserInfo() {
      const { user } = await getData();
      setUserData(user);
    }
    getUserInfo();
  }, []);

  const onSendPress = async () => {
    try {
      props.parentCallback({
        chatRoomId: chatRoomID,
        content: message,
        user: {
          id: userData._id,
          username: userData.username,
          imageUri: userData.imageUri,
        },
      });
    } catch (e) {
      console.log(e);
    }

    setMessage("");
  };

  const onPress = () => {
    if (message) {
      onSendPress();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ width: "100%" }}
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
          <Entypo
            name="attachment"
            size={24}
            color="grey"
            style={styles.icon}
          />
          {!message && (
            <Fontisto
              name="camera"
              size={24}
              color="grey"
              style={styles.icon}
            />
          )}
        </View>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.buttonContainer}>
            <MaterialIcons name="send" size={28} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default InputMessage;
