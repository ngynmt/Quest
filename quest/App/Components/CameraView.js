import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  TextInput,
  Slider,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Switch,
  ScrollView
} from 'react-native';
import Camera from 'react-native-camera';
class CameraView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: ''
    }
  }
  takePicture() {
    this.camera.capture()
      .then((data) => this.setState({ picture: data }))
      .catch(err => console.error(err));
  }
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
            <TouchableHighlight>
              <View style={styles.goToCameraRoll}>
                <Text style={styles.cameraRollText}>CAMERAROLL</Text>
              </View>
            </TouchableHighlight>
          <View style={styles.capture} onPress={this.takePicture.bind(this)}></View>
        </Camera>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: 'red',
    borderRadius: 50,
    height: 100,
    width: 100,
    padding: 10,
    justifyContent: 'center',
    margin: 40,
    borderWidth: 5,
    borderColor: 'white'
  },
  goToCameraRoll: {
    borderRadius: 25,
    justifyContent: 'center',
    height: 50,
    width: 50,
    backgroundColor: 'white'
  },
  cameraRollText: {
    color: 'black',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  }
});

export { CameraView }; 