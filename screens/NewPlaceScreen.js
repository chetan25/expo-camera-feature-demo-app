import React, {useState} from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import ImgPicker from '../components/ImagePicker';
import { addPlace } from '../store/action/place';
import Colors from '../constants/Colors';

const NewPlaceScreen = props => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        setTitle(text);
    }

    const savePlaceHandler = () => {
        dispatch(addPlace(title));
        props.navigation.navigate('Places');
    }

    return (
        <ScrollView>
            <View style={styles.form}> 
              <Text style={styles.label}>Titile</Text>
              <TextInput style={styles.testInput} onChangeText={titleChangeHandler} value={title} />
              <ImgPicker/>
              <Button title='Save Place'  color={Colors.primary} onPress={savePlaceHandler} />
            </View>  
        </ScrollView>
    )
}

NewPlaceScreen.navigationOptions = {
    headerTitile: 'Add Place'
}

const styles = StyleSheet.create({
    form: {
        margin: 30
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
    }
});

export default NewPlaceScreen;