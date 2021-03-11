import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';


const MapScreen = props => {
    const initialLocation = props.navigation.getParam('initialLocation');
    const readeOnly = props.navigation.getParam('readeOnly');

    const [selectedLocation, setSelectedLocation] = useState(() => {
        return {
            latitude: initialLocation.lat,
            longitude:initialLocation.lng
        }
    });

    const mapRegion = {
     latitude:  initialLocation ? initialLocation.lat : 37.78,
     longitude: initialLocation ? initialLocation.lng : -122.43,
     latitudeDelta: 0.0922,
     longitudeDelta: 0.0421, // zoom factor
    };

    const savePickedLocation = useCallback(() => {
        if (!selectedLocation) {
            // show Alert
            return;
        }
        props.navigation.navigate('NewPlace', {
           pickedLocation: selectedLocation
        });
    }, [selectedLocation]);

    useEffect(() => {
        props.navigation.setParams({saveLocation: savePickedLocation});     
    }, [savePickedLocation]);

    const selectPlaceHandler = (event) => {
        if (readeOnly) {
            return;
        }
        setSelectedLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
        });
    }

    return (
        <MapView region={mapRegion} style={styles.map} onPress={selectPlaceHandler} >
            { selectedLocation ? <Marker title='Picked Location' coordinate={selectedLocation}></Marker> : null }
        </MapView>
    )
}

MapScreen.navigationOptions = (navData) =>  {
    const saveFn = navData.navigation.getParam('saveLocation');
    const readeOnly = navData.navigation.getParam('readeOnly');

    if (readeOnly) {
        return {
            headerTitle: 'Map',
        }
    }

    return {
        headerTitle: 'Map',
        headerRight: () => <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
            <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>,
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1 // need for the map to display
    },
    headerButton: {
       marginHorizontal: 20
    },
    headerButtonText: {
       fontSize: 16,
       color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});

export default MapScreen;