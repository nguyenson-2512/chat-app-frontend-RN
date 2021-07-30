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
import * as ImagePicker from "expo-image-picker";
import EmojiPicker from 'rn-emoji-keyboard';
import { Camera } from 'expo-camera';

const InputMessage = (props: any) => {
  const { chatRoomID } = props;

  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const handlePick = (emojiObject: any) => {
    setMessage(message + emojiObject.emoji)
  };

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

  const onSendPress = async (image?: string) => {
    try {
      props.parentCallback({
        chatRoomId: chatRoomID,
        content: image ? image : message,
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

  const selectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      onSendPress(result.uri)
    }
  };

  const openCamera = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos
    });
    if (!result.cancelled) {
      console.log(result)
      // onSendPress(result.uri)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ width: "100%" }}
    >
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <TouchableOpacity onPress={() => setIsOpen(true)}>
            <FontAwesome5 name="laugh-beam" size={24} color="grey" />
          </TouchableOpacity>
          <TextInput
            placeholder={"Type a message"}
            style={styles.textInput}
            multiline
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity onPress={openCamera}>
            <Fontisto
                  name="camera"
                  size={24}
                  color="grey"
                  style={styles.icon}
                />
          </TouchableOpacity>
          {!message && (
            <TouchableOpacity onPress={selectImage}>
              <MaterialIcons name="photo-library" size={26} color="black" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.buttonContainer}>
            <MaterialIcons name="send" size={28} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      <EmojiPicker
      onEmojiSelected={handlePick}
      open={isOpen}
      onClose={() => setIsOpen(false)} />
    </KeyboardAvoidingView>
  );
};

export default InputMessage;
