import * as React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "../components/Themed";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const [userInfo, setUserInfo] = useState<any>();
  const navigation = useNavigation();

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
      setUserInfo(user);
    }
    getUserInfo();
  }, []);

  const navigateEditAccount = () => {
    navigation.navigate("UpdateAccount", {
      userInfo,
    });
  };

  return (
    <View style={styles.header}>
      <View>
        <View style={styles.headerContent}>
          <ImageBackground
            source={{ uri: userInfo?.imageUri }}
            style={styles.imageBackground}
          >
            <Image style={styles.avatar} source={{ uri: userInfo?.imageUri }} />
          </ImageBackground>
          <Text style={styles.name}>{userInfo?.username}</Text>
          <Text style={styles.userInfo}>{userInfo?.email}</Text>
          <Text style={styles.userInfo}>
            Join Ch4tter in {moment(userInfo?.createdAt).format("DD/MM/YYYY")}{" "}
          </Text>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={navigateEditAccount}
          >
            <AntDesign name="edit" size={24} color="black" />
            <Text style={styles.editLabel}>Update account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
  },
  imageBackground: {
    width: 500,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  headerContent: {
    paddingBottom: 30,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    position: "absolute",
    bottom: -60,
    left: "37%",
    resizeMode: "cover",
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "600",
    marginTop: 50,
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: "600",
  },
  body: {
    backgroundColor: "#778899",
    height: 500,
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
  },
  infoContent: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#FFFFFF",
  },
  editBtn: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  editLabel: {
    color: "#2F95DC",
    marginLeft: 5,
    fontSize: 16,
  },
});
