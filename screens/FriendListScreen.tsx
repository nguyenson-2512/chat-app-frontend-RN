import * as React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

import { Text, View } from "../components/Themed";

export default function FriendListScreen() {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>Frenene</Text>
    //   <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    // </View>
    <>
      <TouchableOpacity style={[styles.card, { borderColor: "#4482B5" }]}>
        <View style={styles.cardContent}>
          <Image
            style={[styles.image, styles.imageContent]}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
            }}
          />
          <Text style={styles.name}>Son Nguyen</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
  icon: {
    width: 30,
    height: 30,
  },
  card: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    borderTopWidth: 40,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: "row",
    marginLeft: 10,
  },
  imageContent: {
    marginTop: -40,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    alignSelf: "center",
  },
});
