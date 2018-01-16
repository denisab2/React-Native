import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View,ListView, TouchableOpacity,
    TextInput,
    Picker
} from 'react-native';
import firebase from 'firebase';

export default class CreateScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            price: '',
            quantity: ''
        };

        this.auth = firebase.auth();
        this.auth.onAuthStateChanged((user) => {
            if(user){
                this.dbRef = firebase.database().ref().child('users').child(user.uid).child('products')
            }
        });
    }

    save(){
        const products = this.props.navigation.state.params.products || [];
        let newProducts = products.slice();
        let maxId = Math.max.apply(Math, newProducts.map(function(p){ return p.id; })) + 1;
        if (newProducts.length == 0) {
            maxId = 1;
        }
        newProducts.push({
            id: maxId,
            name: this.state.name,
            price: this.state.price,
            quantity: this.state.quantity,
        });
        this.dbRef.child(this.state.name).set({
            name: this.state.name,
            price: this.state.price,
            quantity: this.state.quantity
        }).then(() => {
            this.props.navigation.state.params.update();
            this.props.navigation.goBack();
        });

    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', margin: 10}}>
                <Text style={{fontSize: 20}}> Create new element</Text>
                <TextInput style={{fontSize: 20, width: 250}} value={this.state.name} placeholder="Name"
                           onChangeText={(text) => this.setState({name: text})}>
                </TextInput>
                <TextInput style={{fontSize: 20, width: 250}} value={this.state.price} placeholder="Price"
                           onChangeText={(text) => this.setState({price: text})}>
                </TextInput>
                <Text style={{fontSize: 20}}>Quantity</Text>
                <Picker
                    style={{width: 100}}
                    selectedValue={this.state.quantity}
                    onValueChange={(itemValue, itemIndex) => this.setState({quantity: itemValue})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />

                </Picker>
                <Button
                    onPress={this.save.bind(this)}
                    title="Save"
                />
            </View>
        );
    }
}