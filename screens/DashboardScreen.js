import React, { Component } from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import firebase from 'firebase';

class DashboardScreen extends Component { 
    render(){
        var userData = this.props.navigation.state.params.userData
        return (
            <View style = {styles.container}>
                <Text>DashboardScreen</Text>
                <Text>{userData.displayName}</Text>
                <Text>{userData.email}</Text>
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri: userData.photoURL}}
                />
                <Button title = "sign out" onPress = {()=> firebase.auth().signOut()}/>
                <Button title = "Complete Profile" onPress={() => this.props.navigation.navigate('ProfileCompleteScreen')}/>
            </View>
        );
    }
}

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})