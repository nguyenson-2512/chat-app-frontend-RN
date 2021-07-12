import React, { Component } from "react";
import { Text, View } from "../components/Themed";
import {
  StyleSheet,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LoginScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      imageUri: "",
      checkLogin: 1,
    };
  }

  _onSubmit = () => {
    return fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      // body: `username=${this.state.username}&password=${this.state.password}`
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log(responseJson)
        // console.log(JSON.stringify(responseJson))
        // this.setState({ checkLogin: JSON.stringify(responseJson.body) });
        this.setState({ checkLogin: responseJson.resultcode });
        if (this.state.checkLogin === 0) {
          //console.warn(responseJson);
          Alert.alert("Thông báo!", "Bạn đã đăng nhập thành công!");
          // await this.storeUser(responseJson.data);
          // this.props.navigation.navigate('Root', {
          // })
          await this.storeData(responseJson.data)
          this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Root' }],
          });
        } else {
          Alert.alert("Thông báo!", "Bạn đã đăng nhập không thành công!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  storeData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('user', jsonValue)
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>Login your account</Text>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="User Name"
            onChangeText={(text) => this.setState({ username: text })}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>

        <Button
          buttonStyle={styles.loginButton}
          title="Login"
          onPress={() => this._onSubmit()}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Don't have an account?</Text>
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Register')}
          >
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//     containerView: {
//         flex: 1,
//       },
//       loginScreenContainer: {
//         flex: 1,
//       },
//       logoText: {
//         fontSize: 40,
//         fontWeight: "800",
//         marginTop: 150,
//         marginBottom: 30,
//         textAlign: 'center',
//       },
//       loginFormView: {
//         flex: 1
//       },
//       loginFormTextInput: {
//         height: 43,
//         fontSize: 14,
//         borderRadius: 5,
//         borderWidth: 1,
//         borderColor: '#eaeaea',
//         backgroundColor: '#fafafa',
//         paddingLeft: 10,
//         marginLeft: 15,
//         marginRight: 15,
//         marginTop: 5,
//         marginBottom: 5,

//       },
//       loginButton: {
//         backgroundColor: '#3897f1',
//         borderRadius: 5,
//         height: 45,
//         marginTop: 10,
//       },
//       fbLoginButton: {
//         height: 45,
//         marginTop: 10,
//         backgroundColor: 'transparent',
//         color: "#3897f1",
//       },
//   });

const AppStyles = {
  color: {
    main: "#5ea23a",
    text: "#696969",
    title: "#464646",
    subtitle: "#545454",
    categoryTitle: "#161616",
    tint: "#ff5a66",
    description: "#bbbbbb",
    filterTitle: "#8a8a8a",
    starRating: "#2bdf85",
    location: "#a9a9a9",
    white: "white",
    facebook: "#4267b2",
    grey: "grey",
    greenBlue: "#00aea8",
    placeholder: "#a0a0a0",
    background: "#f2f2f2",
    blue: "#3293fe",
  },
  fontSize: {
    title: 30,
    content: 20,
    normal: 16,
  },
  buttonWidth: {
    main: "70%",
  },
  textInputWidth: {
    main: "80%",
  },
  fontName: {
    main: "Noto Sans",
    bold: "Noto Sans",
  },
  borderRadius: {
    main: 25,
    small: 5,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 40
  },
  row: {
    flexDirection: 'row',
    marginTop: 6,
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20,
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20,
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text,
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: AppStyles.color.white,
  },
  placeholder: {
    fontFamily: AppStyles.fontName.main,
    color: "red",
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  },
  label: {
    color: 'gray',
    paddingRight: 7
  },
  link: {
    fontWeight: 'bold',
    color: 'blue'
  },
  facebookContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  facebookText: {
    color: AppStyles.color.white,
  },
  loginButton: {
    backgroundColor: AppStyles.color.tint,
    borderRadius: 10,
    height: 45,
    width: 100,
    marginTop: 30,
  },
});
