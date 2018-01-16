import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View,ListView, TouchableOpacity,
    TextInput,
    Linking
} from 'react-native';
import registerForPushNotificationsAsync from '../registerForPushNotificationsAsync';


import { styles } from '../styeles.js';
import firebase from 'firebase';
import {Notifications} from "expo";

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            products: [],
            dataSource: this.ds.cloneWithRows([]),
        };
        this.user = firebase.auth().currentUser;

        console.log("Home user=" + JSON.stringify(this.user));
        this.ref = firebase.database().ref().child('users').child(this.user.uid).child('products');
        this.isPremium = true;
        this.refPremium = firebase.database().ref().child('users').child(this.user.uid).child('premium');


        this.refPremium.on('value', (snapshot) => {
            console.log(snapshot.val()
            );
            this.isPremium = snapshot.val();
        });
        this.update();
    }

    componentDidMount() {
        this._notificationSubscription = this._registerForPushNotifications();
        // this._clearIconBadgeAsync();
    }
    componentWillUnmount() {
        this._notificationSubscription && this._notificationSubscription.remove();


    }

    _registerForPushNotifications() {
        // Send our push token over to our backend so we can receive notifications
        // You can comment the following line out if you want to stop receiving
        // a notification every time you open the app. Check out the source
        // for this function in api/registerForPushNotificationsAsync.js

        // Watch for incoming notifications
        this._notificationSubscription = Notifications.addListener(
            this._handleNotification
        );
    }
    _handleNotification = (notification) => {
        this.userID = firebase.auth().currentUser.uid;
        this.props.navigation.navigate('Notifications');
        this.setState({ notification: notification });

        firebase.database().ref('users2/' + this.userID + '/notifications').push(notification.data);
    };

   /** async componentDidMount() {
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const products = await storageService.getProducts();
        this.setState({
            products: products,
            dataSource: this.ds.cloneWithRows(products),
        });
    }*/

   update(){
       this.ref.on('value', (snap) => {
           var List = [];
           snap.forEach(element => {
               List.push(element.val())
           });
           console.log(List);
           this.setState({dataSource: this.ds.cloneWithRows(List), products: List});
       })
   }

    renderRow(rowData)
    {
        return (
            <View style={styles.welcome} >
                <TouchableOpacity  onPress={() => this.props.navigation.navigate('Update', {item: rowData, update: this.update.bind(this), products: this.state.products})}>
                    <Text style={styles.instructions}> {rowData.name} Price: {rowData.price}  Quantity: {rowData.quantity}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {

        if (!this.state.dataSource) {
            return (
                <View style={styles.container}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Create', {update: this.update.bind(this), products: this.state.products})}
                        title="Add new"
                    />

                </View>
            );
        }
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
                <Button
                    onPress={() => this.props.navigation.navigate('Create', {update: this.update.bind(this), products: this.state.products})}
                    title="Add new"
                />

                <Button title={"Charts"} disabled={!this.isPremium}/>

                <TextInput style={{fontSize: 20, width: 30}} value={this.state.email} placeholder="Email:"
                           onChangeText={(text) => this.setState({email: text})}>
                </TextInput>
                <Button
                    onPress={() => Linking.openURL('mailto:' + this.state.email)}
                    title="Send mail"
                />

            </View>


        );
    }
}
