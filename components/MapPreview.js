import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import getEnvVariables from '../env';

const MapPreview =  props => {
    let imagePreviewUrl;
    const API_KEY = getEnvVariables().googleApiKey;
    if (props.location) {
      imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${API_KEY}`;
    }

   return (
    <TouchableOpacity style={{...styles.mapPreview, ...props.style}} onPress={props.onPress}>
        { imagePreviewUrl ? <Image style={styles.mapImage} source={{uri: imagePreviewUrl}}/> : props.children }
    </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage: {
       width: '100%',
       height: '100%'
    }
});

export default MapPreview;