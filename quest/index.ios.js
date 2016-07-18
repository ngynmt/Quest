/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  Image,
  View,
  NavigatorIOS,
  TouchableHighlight,
  TouchableWithoutFeedback,
  MapView
} from 'react-native';

var ArtifactList = require('./App/Components/ArtifactListView')
//var MapViewContainer = require('./App/Components/MapView')
//There's a bug in requiring MapViewContainer as a separate file. For now the class is defined in the main file.

class MapViewContainer extends Component {

  constructor(props) {
    super(props)

      this.state = {
      region: {
        latitude: 37.74825,
        longitude: -122.4224,
        latitudeDelta: 0.1922,
        longitudeDelta: 0.0421
      }
    }
  }

  _handleChangePage() {
    //this.props.toggleNavBar();
    this.props.navigator.push({
      title: "Artifact List View",
      component: ArtifactList,
      passProps: {
        //toggleNavBar: this.props.toggleNavBar,
      }
    });
  }

  render() {
    return (
      <View style={styles.mapContainer}>
          <MapView
          style={styles.map}
          showsUserLocation={true}
          region={this.state.region}
          />
          <View style={styles.bottomNav}>
            <TouchableWithoutFeedback>
              <View style={styles.bottomNavButton}>
                <Text>Button: Add Artifact</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this._handleChangePage()}>
              <View style={styles.bottomNavButton}>
                <Text>Button: Go to List View</Text>
              </View>
            </TouchableWithoutFeedback>

          </View>
      </View>
    );
  }
}

class quest extends Component {
  constructor(props) {
    super(props)
    this.state = {navigationBarHidden: false}
  }

  toggleNavBar() {
    this.setState({
      navigationBarHidden: !this.state.navigationBarHidden
    });
  }

  render() {
    return (
      <NavigatorIOS ref="nav"
                    itemWrapperStyle={styles.navWrap}
                    style={styles.nav}
                    navigationBarHidden={this.state.navigationBarHidden}
                    initialRoute={{
                      component: MapViewContainer,
                      title: "Map View",
                      passProps: {
                        //toggleNavBar: this.toggleNavBar.bind(this)
                      }
                    }} />
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
  navWrap: {
    flex: 1
  }, 
  nav: {
    flex: 1
  },
  bottomNavButton: {
    flex:1,
    backgroundColor: "#d3d3d3",
    alignItems: 'center',
    borderWidth: 1
  }
});

AppRegistry.registerComponent('quest', () => quest);
