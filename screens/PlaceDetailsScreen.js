import React from 'react';
import {StyleSheet, Image, View, Text, ScrollView, ActivityIndicator} from 'react-native';
import { useSelector } from 'react-redux';
import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';

const PlaceDetailScreen = props => {
    const placeId = props.navigation.getParam('placeId');
    const placeData = useSelector(state => state.places.places.find(place => place.id === placeId));
    const selectedLocation = {lat: placeData.lat, lng: placeData.lng};

    const showMapHandler = () => {
       props.navigation.navigate('Map', {
           readeOnly: true,
           initialLocation: selectedLocation
       });
    };

    return (
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <Image source={{uri: placeData.imageUri}} style={styles.image}/>
            <View style={styles.container}>
                <View style={styles.addressContainer}>
                   <Text style={styles.address}>{placeData.address}</Text>
                </View>
                <MapPreview style={styles.mapPreview} location={selectedLocation} onPress={showMapHandler}/>
            </View>
        </ScrollView>
    )
}

PlaceDetailScreen.navigationOptions = (navData) => {
    return {
        headerTitle:  navData.navigation.getParam('placeTitle')
    }
}


const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        maxWidth: 350,
        height: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
        backgroundColor: '#ccc'
    },
    container: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10
    },
    address: {
        color: Colors.primary,
        textAlign: 'center'
    },
    addressContainer: {
        padding: 20
    }
});

export default PlaceDetailScreen;