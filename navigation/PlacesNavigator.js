import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
// import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import {Platform } from 'react-native';

import Colors from '../constants/Colors';
import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailsScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';


const PacesNavigator = createStackNavigator({
  Places: PlacesListScreen,
  Placedetail: PlaceDetailScreen,
  NewPlace: NewPlaceScreen,
  Map: MapScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
           backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});


export default createAppContainer(PacesNavigator);