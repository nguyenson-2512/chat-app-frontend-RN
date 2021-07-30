import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, Alert } from "react-native";
import Menu, { MenuDivider, MenuItem } from "react-native-material-menu";
import { useNavigation } from "@react-navigation/native";

function ChatRoomMenu() {
  let _menu = null;
  const navigation = useNavigation();
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("target-chatroom");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const setMenuRef = (ref) => {
    _menu = ref;
  };

  function hideMenu() {
    _menu.hide();
  }

  const showMenu = () => {
    _menu.show();
  };

  async function onDeleteChats() {
    Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this chat room?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: async () => {
            const targetChatroom = await getData();
            fetch(`http://localhost:3000/api/chat/delete/${targetChatroom}`, {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((responseJson) => {
                navigation.goBack();
              })
              .catch((error) => {
                console.error(error);
              });
          },
        },
        {
          text: "No",
        },
      ]
    );
  }

  function navigateProfile() {
    navigation.navigate("UserDetail");
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Menu
        ref={setMenuRef}
        button={
          <Text onPress={showMenu}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={22}
              color={"white"}
            />
          </Text>
        }
      >
        <MenuItem disabled>Options</MenuItem>
        <MenuDivider />
        <MenuItem
          onPress={() => {
            hideMenu();
            navigateProfile();
          }}
        >
          See Profile
        </MenuItem>
        <MenuItem
          onPress={() => {
            // hideMenu();
            onDeleteChats();
          }}
        >
          Delete chats
        </MenuItem>
      </Menu>
    </View>
  );
}

export default ChatRoomMenu;
