import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text } from "react-native";
import Menu, { MenuItem } from "react-native-material-menu";
import { useNavigation } from '@react-navigation/native';


function MenuThreeDots() {
  let _menu = null;
  const navigation = useNavigation();

  const setMenuRef = (ref) => {
    _menu = ref;
  };

  function hideMenu() {
    _menu.hide();
  }

  const showMenu = () => {
    _menu.show();
  };

  function logout() {
    clearUser();
    navigation.navigate('Login');
  }

  const switchTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem("theme");
      if(theme == 'light') {
        await AsyncStorage.setItem("theme", JSON.stringify('dark'));
      } else {
        await AsyncStorage.setItem("theme", JSON.stringify('light'));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const clearUser = async () => {
    try {
      await AsyncStorage.removeItem("user");
    } catch (e) {
      console.error(e);
    }
  };

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
          <MenuItem 
                      onPress={() => {
                        hideMenu();
                        switchTheme();
                      }}
          >Switch Mode</MenuItem>
          <MenuItem
            onPress={() => {
              hideMenu();
              logout();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </View>
    );

}

export default MenuThreeDots;
