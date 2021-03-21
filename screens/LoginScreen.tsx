import React, { Component }  from 'react';
import { Text, View } from '../components/Themed';
import {StyleSheet,Keyboard, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';

export default class LoginScreen extends Component<any, any> {
    constructor(props: any){
        super(props);
        this.state ={
          username:"sn",
          password:"12345678",
          checkLogin:1
        }
    }

    _onSubmit=()=>{
        return fetch('http://localhost:3000/api/users/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({checkLogin:responseJson.resultcode});
            if(this.state.checkLogin===0){
                //console.warn(responseJson);
                Alert.alert("Thông báo!","Bạn đã đăng nhập thành công!");
            }
            else{
               // console.warn(responseJson);
                Alert.alert("Thông báo!","Bạn đã đăng nhập không thành công!");
            }
        })
        .catch((error) =>{
            console.error(error);
        });
      }
    
    
    render() {
        return (
          <KeyboardAvoidingView style={styles.containerView} behavior="padding">
    
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.loginScreenContainer}>
              <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Instamobile</Text>
                <TextInput placeholder="Username" placeholderTextColor="#c4c3cb" style={styles.loginFormTextInput} />
                <TextInput placeholder="Password" placeholderTextColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}/>
                <Button
                  buttonStyle={styles.loginButton}
                  title="Login"
                  onPress={() => this._onSubmit()}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        );
      }
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
      },
      loginScreenContainer: {
        flex: 1,
      },
      logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: 'center',
      },
      loginFormView: {
        flex: 1
      },
      loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
      
      },
      loginButton: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
      },
      fbLoginButton: {
        height: 45,
        marginTop: 10,
        backgroundColor: 'transparent',
        color: "#3897f1",
      },
  });
  