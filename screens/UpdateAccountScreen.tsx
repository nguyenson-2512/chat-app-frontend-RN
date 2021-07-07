import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import { KeyboardAvoidingView, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-elements";
import { Text, View } from "../components/Themed";

export default class UpdateAccountScreen extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      _id: "",
      username: "",
      email: "",
      imageUri: "",
      bio: "",
      address: "",
    };
  }

  componentDidMount() {
    this.setState({ ...this.props.route.params.userInfo });
  }

  _onSubmit = (id: string) => {
    return fetch(`http://localhost:3000/api/user/edit/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        bio: this.state.bio,
        address: this.state.address,
        // imageUri: this.state.imageUri
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log(responseJson);
        await this.storeData(responseJson.data);
        this.props.navigation.goBack();
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
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <View style={styles.screenContainer}>
          <View style={styles.formView}>
            <TextInput
              placeholder="Username"
              style={styles.formTextInput}
              onChangeText={(username) => {
                this.setState({ username });
              }}
              value={this.state.username}
            />
            <TextInput
              placeholder="Email"
              style={styles.formTextInput}
              onChangeText={(email) => {
                this.setState({ email });
              }}
              value={this.state.email}
            />
            <TextInput placeholder="Avatar" style={styles.formTextInput} />
            <TextInput
              placeholder="Bio"
              style={styles.formTextInput}
              onChangeText={(bio) => {
                this.setState({ bio });
              }}
              value={this.state.bio}
            />
            <TextInput
              placeholder="Address"
              style={styles.formTextInput}
              onChangeText={(address) => {
                this.setState({ address });
              }}
              value={this.state.address}
            />
            <Button
              buttonStyle={styles.button}
              onPress={() => this._onSubmit(this.state._id)}
              title="Update"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
  formView: {
    flex: 1,
    paddingTop: 30
  },
  formTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 100,
    justifyContent: "center",
    marginLeft: '40%'
  },
});
