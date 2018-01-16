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


export default class SignUpScreen extends Component {

    constructor(props){
        super(props);
        this.state = {mail: "", password: "", premium: false};
        this.dbRef = firebase.database().ref().child('users');
        this.auth = firebase.auth();



        this.auth.onAuthStateChanged((user) => {
            if(user){
                this.dbRef.child(user.uid).set({
                    email: this.state.email,
                    password: this.state.password,
                    premium: this.state.premium,
                    products: []
                })
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>

                        <TextInput placeholder={"Email"} onChangeText={(email) => this.setState({email})}/>

                        <TextInput placeholder={"Password"} onChangeText={(password) => this.setState({password})}/>
                    <View>
                        <Text>Is premium </Text>
                        <Switch value={this.state.premium}
                                onValueChange={(isPremium) => this.setState({premium: isPremium}) }/>
                    </View>
                    <Button title="Sign up" onPress={ () => {
                        this.auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(this.props.navigation.navigate('LogIn'));

                    }}
                    />


                <Button title="Go to Log in" onPress={() => {
                    this.props.navigation.navigate('SignUp');
                }}
                />
                </View>

        );
    }
}

