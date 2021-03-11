import React, {useState} from 'react';
import {View, Button, Text, StyleSheet, Image, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

const ImgPicker = props => {
    const [imagePicked, setImagePicked] = useState();

    const verifyPermission = async () => {
        //CAMERARoll fro alery
        const result = await Permissions.askAsync(Permissions.CAMERA);
        if (result.status !== 'granted') {
            Alert.alert('Insufficient permissions', 'App needs Camera Permission', [{
                text: 'Okay'
            }]);

            return false;
        }

        return true;
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            return;
        }

        // will open device camera and is async and returns promise
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5 // max is 1
        });
        // image = {
        //     cancelled: '',
        //     height: '',
        //     type: '',
        //     uri: '', // link to image, is temporary directory
        //     width: ""
        // }

        setImagePicked(image.uri);
        props.onImageTaken(image.uri);
    }

   return (
       <View style={styles.imagePicker}>
           <View style={styles.imagePreview}>
               {
                   imagePicked ? <Image style={styles.image} source={{uri: imagePicked  }}/> : <Text>No Image picked yet</Text>
               }
               
           </View>
           <Button title='Take Image' color={Colors.primary} onPress={takeImageHandler} />
       </View>
   )
}

const styles = StyleSheet.create({
    imagePicker: {
       alignItems: 'center',
       marginBottom: 15
    },
    imagePreview: {
      width: '100%',
      height: 200,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#ccc',
      borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%',
    }
});

export default ImgPicker;