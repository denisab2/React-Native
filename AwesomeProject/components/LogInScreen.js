import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View, ListView, TouchableOpacity,
    TextInput, Switch,
} from 'react-native';
import { styles } from '../styeles.js';
import firebase from 'firebase';



export default class LogInScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {email: "", password: ""};
        this.auth = firebase.auth();


    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <TextInput placeholder={"Email"} onChangeText={(email) => this.setState({email})}/>
                    <TextInput placeholder={"Password"} onChangeText={(password) => this.setState({password})}/>
                    <Button title="Log in" onPress={() => {
                        this.auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(this.props.navigation.navigate('Home'));
                    }}/>

                    <Button title="Sign up" onPress={() => {
                        this.props.navigation.navigate('SignUp');
                    }}
                    />
                </View>
            </View>
        );
    }
}