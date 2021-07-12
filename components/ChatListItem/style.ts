import { StyleSheet } from 'react-native';
 
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    padding: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    width: '80%'
  },
  midContainer: {
    justifyContent: 'space-around',
    width: '80%'
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
  },
  lastMessage: {
    fontSize: 16,
    color: 'grey',
  },
  time: {
    fontSize: 14,
    color: 'grey',
    width: '20%'
  },
});
 
export default styles;
