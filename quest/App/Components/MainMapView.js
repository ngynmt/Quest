import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  AlertIOS,
  StyleSheet,
  Text,
  Image,
  View,
  NavigatorIOS,
  TouchableHighlight,
  TouchableWithoutFeedback,
  MapView,
  TouchableOpacity
} from 'react-native';

class MainMapView extends Component {

  constructor(props) {
    super(props)

    this.state = {
      region: {
        latitude: 37.74825,
        longitude: -122.4224,
        latitudeDelta: 0.1922,
        longitudeDelta: 0.0421
      }, 
      annotations : [
        {latitude: 37.74825, longitude: -122.4224, title: 'Jeff:', subtitle: '"yooooooo"'},
        {latitude: 37.75825, longitude: -122.4324, title: 'Julius', subtitle: '"whats up"'},
        {latitude: 37.73825, longitude: -122.4124, title: 'Michelle', subtitle: '"heyoo"'},
        {latitude: 37.76825, longitude: -122.4124, title: 'Chris', subtitle: '"yum"'}
      ]
    } 
  }

  _handleNextPage(componentName) {

    this.props.navigator.push({name: componentName});

    // //this.props.toggleNavBar();
    // this.props.navigator.push({
    //   title: title,
    //   component: component,
    //   passProps: {
    //     dbRef: this.props.dbRef,
    //     storageRef: this.props.storageRef
    //     //toggleNavBar: this.props.toggleNavBar,
    //   }
    // });
  }

  render() {
    return (
      <View style={styles.mapContainer}>
          <MapView
          style={styles.map}
          showsUserLocation={true}
          region={this.state.region}
          annotations={this.state.annotations}
          />
          <View style={styles.bottomNav}>

            <TouchableWithoutFeedback onPress={() => this._handleNextPage('ProfileView')}>
              <View style={styles.bottomNavButton}>
                <Text>Button: Go to Profile</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() =>
              AlertIOS.alert(
                'Add an Artifact',
                'What kind of artifact would you like to add?',
                 [
                   {text: 'Picture', onPress: () => this._handleNextPage('CameraView')},
                   {text: 'Message', onPress: () => this._handleNextPage('DropView')},
                 ],
              )}>
              <View style={styles.bottomNavButton}>
                <Text>Button: Add Artifact</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this._handleNextPage('CameraRollView')}>
              <View style={styles.bottomNavButton}>
                <Text>Button: Camera Roll</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this._handleNextPage('ArtifactListView')}>
              <View style={styles.bottomNavButton}>
                <Text>Button: Go to List View</Text>
              </View>
            </TouchableWithoutFeedback>

          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    flex:1
  }, 
  bottomNav: { 
    flex:2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  map: {
    height:400,
    flex: 5
  },
  bottomNavButton: {
    flex:1,
    backgroundColor: "#d3d3d3",
    alignItems: 'center',
    borderWidth: 1
  }
});


export {MainMapView};