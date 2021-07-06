import React, { Component } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { Button } from "react-native-elements";
// import { AppStyles } from '../AppStyles';

export default class RegisterScreen extends Component<any, any> {
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
    return fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.password,
        imageUri: this.state.imageUri
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log(responseJson)
        this.setState({ checkLogin: responseJson.resultcode });
        if (this.state.checkLogin === 0) {
          Alert.alert("Thông báo!", "Bạn đã tạo tài khoản thành công!");
          this.props.navigation.navigate('Login')
        } else {
          Alert.alert("Thông báo!", "Tạo tài khoản không thành công!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>Create your account</Text>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Username"
            onChangeText={(text) => this.setState({ username: text })}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Email"
            onChangeText={(text) => this.setState({ email: text })}
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
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Image Uri"
            onChangeText={(text) => this.setState({ imageUri: text })}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <Button
          buttonStyle={styles.loginButton}
          title="Sign up"
          onPress={() => this._onSubmit()}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Already have an account? </Text>
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
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
    marginTop: 4,
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
