import React, { Component } from "react";
import {
    StyleSheet, Text
} from "react-native";
import { Button } from "react-native-elements";
import { View } from "../components/Themed";

export default class WelcomeScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
    };
  }

  login() {
    this.props.navigation.navigate('Login')
  }

  signup() {
    this.props.navigation.navigate('Register')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.content]}>Welcome to CH4TTER</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', flex: 1, width: '100%'}}>
        <Button
          buttonStyle={styles.loginButton}
          title="Login"
          onPress={() => this.login()}
        />
                <Button
          buttonStyle={styles.signupButton}
          title="Sign up"
          onPress={() => this.signup()}
        />
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
    paddingTop: '40%',
    textAlign: "center",
    // fontSize: AppStyles.fontSize.content,
    fontSize: 28,
    // color: AppStyles.color.text,
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
  signupButton: {
    backgroundColor: AppStyles.color.facebook,
    borderRadius: 10,
    height: 45,
    width: 100,
    marginTop: 30,
  },
});
