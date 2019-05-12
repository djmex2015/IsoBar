import React, { Component } from 'react';
import AlbumsScreen from './app/screens/AlbumsScreen';
import BandsScreen from './app/screens/BandsScreen';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { View, Dimensions } from 'react-native';

const RootStack = createStackNavigator({
  Bands: { screen: BandsScreen },
  Albums: { screen: AlbumsScreen },
}, {
    initialRouteName: 'Bands',
    headerLayoutPreset: 'center', // default is 'left'
  }
)

class App extends Component {
  render() {
    return (
      <View style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
      }}>
        <Navigator />
      </View>

    );
  }
}

export default createAppContainer(RootStack);