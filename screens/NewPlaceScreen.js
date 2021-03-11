import React, {useState, useCallback} from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, Button, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import ImgPicker from '../components/ImagePicker';
import { addPlace } from '../store/action/place';
import LocationPicker from '../components/LocationPicker';
import Colors from '../constants/Colors';

const NewPlaceScreen = props => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [selectedImageUri, setSelectedImageUri] = useState();
    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        setTitle(text);
    }

    const savePlaceHandler = () => {
        dispatch(addPlace(title, selectedImageUri, location.lat, location.lng));
        props.navigation.navigate('Places');
    }

    const handleImageTaken = (uri) => {
        setSelectedImageUri(uri);
    }

    const pickedLocationHandler = useCallback((location) => {
        setLocation(location);
    }, []);

    return (
        <ScrollView style={styles.wrapper}>
            <View style={styles.form}> 
              <Text style={styles.label}>Title</Text>
              <TextInput style={styles.testInput} onChangeText={titleChangeHandler} value={title} />
              <ImgPicker onImageTaken={handleImageTaken}/>
              <View style={styles.location}>
                 <LocationPicker navigation={props.navigation} onLocationSelected={pickedLocationHandler}/>
              </View>
              <Button title='Save Place'  style={styles.button} color={Colors.primary} onPress={savePlaceHandler} />
            </View>  
        </ScrollView>
    )
}

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add Place'
}

const styles = StyleSheet.create({
    wrapper: {
    },
    form: {
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 15,
    },
    testInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 25,
        paddingVertical: 4,
        paddingHorizontal: 2
    },
    location: {
        marginVertical: 20
    }
});

export default NewPlaceScreen;