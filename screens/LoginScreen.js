import React, { Component } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

const googleIcon = {
  uri:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png',
};

class LoginScreen extends Component { 

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          // googleUser.getAuthResponse().id_token
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase
        .auth()
        .signInWithCredential(credential)
        .then(function(result){
          console.log('User signed in')
          if(result.additionalUserInfo.isNewUser){
            firebase
            .database()
            .ref('/users/' + result.user.uid)
            .set({
              gmail: result.user.email,
              profile_picture: result.additionalUserInfo.profile.picture,
              first_name: result.additionalUserInfo.profile.given_name,
              last_name: result.additionalUserInfo.profile.family_name,
              created_at: Date.now()
            })
            .then(function(snapshot) {
              // console.log('Snapshot', snapshot);
            });
          }
          else{
            firebase
            .database()
            .ref('/users/' + result.user.uid)
            .update({
              last_logged_in: Date.now()
            })
          }
        })
      
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  }

  LoginWithGoogleAsync = async() => {
      try {
        const result = await Google.logInAsync({
          androidClientId: '',
          // behavior: 'web',
          iosClientId: '',
          scopes: ['profile', 'email'],
        });
    
        if (result.type === 'success') {
          this.onSignIn(result);
          return result.accessToken;
        } else {
          return { cancelled: true };
        }
      } catch (e) {
        alert(e)
        return { error: true };
      }
    }

  render(){
      return (
          <View style = {styles.container}>
              <Button 
                  title = "Sign In With Google"
                  onPress = {() => this.LoginWithGoogleAsync()}
              />
          </View>
      );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


// // import React from 'react';
// // import { Text, View, StyleSheet, Button } from 'react-native';
// // import { GoogleSignIn } from 'expo-google-sign-in';

// // export default class LoginScreen extends React.Component {
// //   state = { user: null };

// //   componentDidMount() {
// //     this.initAsync();
// //   }

// //   initAsync = async () => {
// //     await GoogleSignIn.initAsync({
// //       clientId: '870218586757-qsj28dq0meuj69sdqtfqa2cnkqksg5iu.apps.googleusercontent.com',
// //     });
// //     this._syncUserWithStateAsync();
// //   };

// //   _syncUserWithStateAsync = async () => {
// //     const user = await GoogleSignIn.signInSilentlyAsync();
// //     this.setState({ user });
// //   };

// //   signOutAsync = async () => {
// //     await GoogleSignIn.signOutAsync();
// //     this.setState({ user: null });
// //   };

// //   signInAsync = async () => {
// //     try {
// //       await GoogleSignIn.askForPlayServicesAsync();
// //       const { type, user } = await GoogleSignIn.signInAsync();
// //       if (type === 'success') {
// //         this._syncUserWithStateAsync();
// //       }
// //     } catch ({ message }) {
// //       alert('login: Error:' + message);
// //     }
// //   };

// // //   onPress = () => {
// // //     if (this.state.user) {
// // //       this.signOutAsync();
// // //     } else {
// // //       this.signInAsync();
// // //     }
// // //   };

// //   render() {
// //     return (
// //             <View style = {styles.container}>
// //             <Button 
// //                 title = "Sign In With Google"
// //                 onPress = {() => this.signInAsync()}
// //             />
// //         </View>
// //     );
// //   }
// // }

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         alignItems: 'center',
// //         justifyContent: 'center'
// //     }
// // })

