/**
 * Object classifier React Native App
 * vibhu bhatia
 */

import React, {Component} from 'react';
import homeScreen from './app/screen/homescreen';
import cameraScreen from './app/screen/camerascreen';
import resultScreen from './app/screen/displayresult';
import oldResultScreen from './app/screen/oldResults';
import { createStackNavigator } from 'react-navigation';


export default createStackNavigator({
  Home: {
    screen: homeScreen
  },
  Camera : {
    screen: cameraScreen
  },
  Result:{
    screen: resultScreen
  },
  Old: {
    screen : oldResultScreen
  },
},
{   mode:'card',
    initialRouteName:'Home',
    gesturesEnabled:true,
    transitionConfig: () => ({
      screenInterpolator: sceneProps => {
          const { layout, position, scene } = sceneProps;
          const { index } = scene;
  
          const translateX = position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [layout.initWidth, 0, 0]
          });
  
          const opacity = position.interpolate({
              inputRange: [
                  index - 1,
                  index - 0.99,
                  index,
                  index + 0.99,
                  index + 1
              ],
              outputRange: [0, 1, 1, 0.3, 0]
          });
  
          return { opacity, transform: [{ translateX }] };
      }
  }),
  
}
);


