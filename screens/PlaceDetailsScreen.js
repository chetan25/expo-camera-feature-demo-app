import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const PlaceDetailScreen = props => {
    return (
        <View>
            <Text>Places Detail</Text>
        </View>
    )
}

PlaceDetailScreen.navigationOptions = (navData) => {
    return {
        headerTitle:  navData.navigation.getParam('placeTitle')
    }
}


const styles = StyleSheet.create({
});

export default PlaceDetailScreen;