import React, { Component }  from 'react';
import { StyleSheet, TextInput } from "react-native";
import { Text, View } from '../components/Themed';
import { Button } from 'react-native-elements';

// import { AppStyles } from '../AppStyles';

export default class RegisterScreen extends Component {
    constructor(props: any) {
        super(props);
    
        this.state = {
          loading: true,
          fullname: "",
          phone: "",
          email: "",
          password: ""
        };
      }


      render() {
        return (
          <View style={styles.container}>
            <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.body}
                placeholder="Full Name"
                onChangeText={text => this.setState({ fullname: text })}

                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.body}
                placeholder="Phone Number"
                onChangeText={text => this.setState({ phone: text })}

                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.body}
                placeholder="E-mail Address"
                onChangeText={text => this.setState({ email: text })}

                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.body}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}

                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>
            <Button
              buttonStyle={[styles.facebookContainer, { marginTop: 50 }]}

            >
              Sign Up
            </Button>
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
      blue: "#3293fe"
    },
    fontSize: {
      title: 30,
      content: 20,
      normal: 16
    },
    buttonWidth: {
      main: "70%"
    },
    textInputWidth: {
      main: "80%"
    },
    fontName: {
      main: "Noto Sans",
      bold: "Noto Sans"
    },
    borderRadius: {
      main: 25,
      small: 5
    }
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center"
    },
    title: {
      fontSize: AppStyles.fontSize.title,
      fontWeight: "bold",
      color: AppStyles.color.tint,
      marginTop: 20,
      marginBottom: 20
    },
    leftTitle: {
      alignSelf: "stretch",
      textAlign: "left",
      marginLeft: 20
    },
    content: {
      paddingLeft: 50,
      paddingRight: 50,
      textAlign: "center",
      fontSize: AppStyles.fontSize.content,
      color: AppStyles.color.text
    },
    loginContainer: {
      width: AppStyles.buttonWidth.main,
      backgroundColor: AppStyles.color.tint,
      borderRadius: AppStyles.borderRadius.main,
      padding: 10,
      marginTop: 30
    },
    loginText: {
      color: AppStyles.color.white
    },
    placeholder: {
      fontFamily: AppStyles.fontName.main,
      color: "red"
    },
    InputContainer: {
      width: AppStyles.textInputWidth.main,
      marginTop: 30,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: AppStyles.color.grey,
      borderRadius: AppStyles.borderRadius.main
    },
    body: {
      height: 42,
      paddingLeft: 20,
      paddingRight: 20,
      color: AppStyles.color.text
    },
    facebookContainer: {
      width: AppStyles.buttonWidth.main,
      backgroundColor: AppStyles.color.tint,
      borderRadius: AppStyles.borderRadius.main,
      padding: 10,
      marginTop: 30
    },
    facebookText: {
      color: AppStyles.color.white
    }
  });
  

  