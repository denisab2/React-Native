import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View,ListView, TouchableOpacity,
    TextInput,
    Alert,
    Picker
} from 'react-native';
import firebase from 'firebase';

export default class UpdateScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id:  this.props.navigation.state.params.item.id,
            name: this.props.navigation.state.params.item.name,
            price: this.props.navigation.state.params.item.price,
            quantity: this.props.navigation.state.params.item.quantity
        };

        this.auth = firebase.auth();
        this.auth.onAuthStateChanged((user) => {
            if(user){
                this.dbRef = firebase.database().ref().child('users').child(user.uid).child('products')
            }
        });
    }

    save() {
        const products = this.props.navigation.state.params.products || [];
        let newProducts = products.slice();
        for(var i=0;i<newProducts.length;i++){
            if(this.state.id==newProducts[i].id){
                newProducts[i].name=this.state.name;
                newProducts[i].price=this.state.price;
                newProducts[i].quantity=this.state.quantity;
                break;
            }
        }
        this.dbRef.child(this.state.name).set({
            name: this.state.name,
            price: this.state.price,
            quantity: this.state.quantity
        }).then(() => {
            this.props.navigation.state.params.update();
            this.props.navigation.goBack();
        });
    }

    delete() {
        const products = this.props.navigation.state.params.products || [];
        let pos;
        for (i = 0; i < products.length; i++) {
            if (this.state.id == products[i].id) {
                pos = i;
                break;
            }
        }
        let newProducts = products.slice();
        newProducts.splice(pos, 1);
        this.dbRef.child(this.state.name).remove().then(() => {
            this.props.navigation.state.params.update();
            this.props.navigation.goBack();
        });
        this.props.navigation.state.params.update();
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', margin: 10}}>
                <Text style={{fontSize: 20}}> Edit details</Text>
                <TextInput style={{fontSize: 20}} value={this.state.name}
                           onChangeText={(text) => this.setState({name: text})}>
                </TextInput>
                <TextInput style={{fontSize: 20}} value={this.state.price}
                           onChangeText={(text) => this.setState({price: text})}>
                </TextInput>
                <Text style={{fontSize: 20}}>Quantity</Text>
                <Picker
                    style={{width: 100}}
                    selectedValue={this.state.quantity}
                    onValueChange={(itemValue) => this.setState({quantity: itemValue})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                </Picker>
                <Button style={{marginBottom: 20}}
                        onPress={this.save.bind(this)}
                        title="Save"
                />
                <Button style={{marginTop: 20}}
                        onPress={() => Alert.alert(
                            'Delete product',
                            'Are you sure you want to delete this product?',
                            [
                                {text: 'No', style: 'cancel'},
                                {text: 'Yes', onPress: this.delete.bind(this)},
                            ],
                            { cancelable: false }
                        )}
                        title="Delete"
                />
            </View>
        );
    }
}