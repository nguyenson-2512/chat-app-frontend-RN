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
  }
});

export default styles;