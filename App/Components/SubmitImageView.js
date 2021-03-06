import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  TextInput,
  Slider,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Switch,
  AlertIOS,
  ScrollView
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#FFF'
  },
  mainImage: {
    height: 400,
    marginTop: 50
  },
  caption: {
    fontSize: 20,
    padding: 10,
    height: 50,
    textAlign: 'left'
  },
   bottomNav: { 
    flex:2,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  bottomNavButton: {
    flex:1,
    backgroundColor: "#24CE84",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 110,
    paddingBottom:30
  },
  buttonText: {
    color: '#FFF',
    fontSize: 30
  }
})

class SubmitImageView extends Component {
  constructor(props) {
    super(props);
    this.user = firebase.auth().currentUser;
    this.state = {
      text: ''
    }
  }
  
  componentDidMount() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let initialPosition = position;
          this.setState({initialPosition: initialPosition});
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
      navigator.geolocation.watchPosition((position) => {
        let lastPosition = position;
        this.setState({lastPosition: lastPosition});
      });
  }

  componentWillUnmount() {
     this.props.dbRef.off();
   }

  sendArtifact() {
    //the JSON object sent to Firebase below contains text, geolocation, username, and a timestamp
    this.props.dbRef.push({ 
      message: this.state.text,
      user: this.user.displayName,
      latitude: this.state.lastPosition.coords.latitude,
      longitude: this.state.lastPosition.coords.longitude, 
      timestamp: Date.now(), 
      base64: this.props.base64 },
      () => { AlertIOS.alert('New message posted!')});

    this.props.navigator.popToTop();

  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableHighlight onPress={() => this.sendArtifact()}>
            <View style={styles.bottomNavButton}>
              <Text style={styles.buttonText}>SUBMIT ARTIFACT</Text>
            </View>
        </TouchableHighlight>
        <TextInput multiline={true} onChangeText={(text) => this.setState({text})} value={this.state.text} style={styles.caption} placeholder='Add caption'></TextInput>
        <Image style={styles.mainImage} source={{uri: this.props.path}}/>
      </View>
    )
  }
}

export { SubmitImageView };