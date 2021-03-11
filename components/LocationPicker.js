import React, {useState, useEffect} from 'react';
import {
    View,
    Button,
    Text,
    ActivityIndicator,
    Alert,
    StyleSheet
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import MapPreview from '../components/MapPreview';


const LocationPicker = props => {
    const { onLocationSelected } = props;
    const [pickedLocation, setPickedLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);

    const pickedLocationFromMap = props.navigation.getParam('pickedLocation');

    useEffect(() => {
         if(pickedLocationFromMap) {
            setPickedLocation({
                lat: pickedLocationFromMap.latitude,
                lng: pickedLocationFromMap.longitude
            }); 
            onLocationSelected({
                lat: pickedLocationFromMap.latitude,
                lng: pickedLocationFromMap.longitude
            });
         }
    }, [pickedLocationFromMap, onLocationSelected]);

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map');
    };  

    const verifyPermission = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert('Insufficient permissions', 'App needs Camera Permission', [{
                text: 'Okay'
            }]);

            return false;
        }

        return true;
    }

    const getLocationHandler = async () => {
        setIsFetching(true);

       const hasPermission = await verifyPermission();
       if (!hasPermission) {
           return;
       }

       try {
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000
            });

            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
            onLocationSelected({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });

       } catch (err) {
           Alert.alert('Could not fetch location', 'Please try again',[{
               text: 'Okay'
           }]);
       }
       setIsFetching(false);
    }

   return (
     <View styles={styles.locationPicker}>
         <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandler}>
            { isFetching ? <ActivityIndicator size='small' color={Colors.primary}/> : <Text>No location selected</Text> }
         </MapPreview>
         <View style={styles.action}>
            <Button title='Get User Location' color={Colors.primary} onPress={getLocationHandler}/>
            <Button title='Pick on Map' color={Colors.primary} onPress={pickOnMapHandler}/>
          </View>   
     </View>
   );
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});

export default LocationPicker;