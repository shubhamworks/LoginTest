// import React, { Component } from 'react';
// import {View, Text, StyleSheet, ActivityIndicator, Button, TextInput} from 'react-native';
// import firebase from 'firebase'

// class ProfileCompleteScreen extends Component { 
//     render(){
//         const [value, onChangeText] = React.useState('Name');
//         return (
//             <View style = {styles.container}>
//                 <Text>ProfileCompleteScreen</Text>
//                 <Text>Name</Text>
//                 <TextInput onChangeText={text => onChangeText(text)} value = {value} />
//                 <Button title = "sign out" onPress = {()=> firebase.auth().signOut()}/>
//             </View>
//         );
//     }
// }

// export default ProfileCompleteScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// })

import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import firebase from 'firebase'

class ProfileCompleteScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ProfileCompleteScreen</Text>
      </View>
    );
  }
}

export default ProfileCompleteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})