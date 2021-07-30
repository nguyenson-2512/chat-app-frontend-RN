import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
  },
  messageBox: {
    borderRadius: 5,
    padding: 10,
    width: '80%'
  },
  name: {
    color: Colors.light.tint,
    fontWeight: "bold",
    marginBottom: 5,
  },
  messageContainer: {
    width: '100%'
  },
  time: {
    alignSelf: "flex-end",
    color: 'grey'
  },
  message: {
    width: '100%'
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginLeft: 22
  },
  like: {
    position: "absolute",
    bottom: -10,
    right: -8,
    borderRadius: 50,
    backgroundColor: '#F1F3F4',
  }
});

export default styles;