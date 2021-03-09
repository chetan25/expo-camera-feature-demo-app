import React from 'react';
import {StyleSheet, View, Text, Platform, FlatList} from 'react-native';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import CustomButtom from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';

const PlacesListScreen = props => {
    const places = useSelector(state => state.places.places);

    return (
       <FlatList
          data={places}
          keyExtractor={item => item.id}
          renderItem={itemData => <PlaceItem
              title={itemData.item.title}
              image={null}
              address={null}
              onSelect={() => {
                  props.navigation.navigate('Placedetail', {
                      placeTitle: itemData.item.title,
                      placeId: itemData.item.id
                  });
              }}
          />}
        />
    )
}

PlacesListScreen.navigationOptions = (navData) => {
    return {
        headerTitile: 'All Places',
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomButtom}>
            <Item
                title='Add Place'
                iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                onPress={() => {
                    navData.navigation.navigate('NewPlace')
                }}
            />
        </HeaderButtons>,
    }
}

const styles = StyleSheet.create({

});

export default PlacesListScreen;