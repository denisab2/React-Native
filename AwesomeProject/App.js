import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import UpdateScreen from './components/UpdateScreen';
import CreateScreen from './components/CreateScreen';
import SignUpScreen from './components/SignUpScreen';
import LogInScreen from './components/LogInScreen';
import registerForPushNotificationsAsync from './registerForPushNotificationsAsync'
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAL19fgvJD32AUAOpq5quctVoXtwLiSK54",
    authDomain: "awesomeproject-e06c1.firebaseapp.com",
    databaseURL: "https://awesomeproject-e06c1.firebaseio.com",
    projectId: "awesomeproject-e06c1",
    storageBucket: "awesomeproject-e06c1.appspot.com",
    messagingSenderId: "954294222353",
    persistence: true
};
firebase.initializeApp(config);


const RootNavigator = StackNavigator({
    LogIn: {
        screen: LogInScreen,
        navigationOptions: {
            headerTitle: 'LogIn',
        },
    },

    SignUp: {
        screen: SignUpScreen,
        navigationOptions: {
            headerTitle: 'SignUp',
        },
    },

    Home: {
        screen: HomeScreen,
        navigationOptions: {
            headerTitle: 'Home',
        },
    },
    Update: {
        screen: UpdateScreen,
        navigationOptions: {
            headerTitle: 'Update',
        },
    },
    Create: {
        screen: CreateScreen,
        navigationOptions: {
            headerTitle: 'Create',
        },
    },
});


export default RootNavigator;
