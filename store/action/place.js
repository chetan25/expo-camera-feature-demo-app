import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../../helpers/db';
import getEnvVariables from '../../env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, imageUri, lat, lng) => {
   return async dispatch => {
        const fileName = imageUri.split('/').pop();
        const API_KEY = getEnvVariables().googleApiKey;
        const locationResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`);

        if(!locationResponse.ok) {
            throw new Error('SOmething went wrong');
        }

        const resData = await locationResponse.json();
        if (!resData.results) {
            throw new Error('SOmething went wrong');
        }
        const address = resData.results[0].formatted_address;

        // moving file to filesystem
        // documentDirectory persist till we uninstall the app
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: imageUri,
                to: newPath
            });
            const dbResult = await insertPlace(title, newPath, address, lat, lng);
    
            dispatch({
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title: title,
                    imageUri: newPath,
                    address: address,
                    coords: {
                        lat: lat,
                        lng: lng
                    }
                }
            });
        } catch(err) {
            console.log(err);
            throw new Error('Error uploading file');
        }
   }
}

export const loadPlaces = () => {
    return async dispatch => {
       try {
        const dbResult = await fetchPlaces();
        dispatch({
            type: SET_PLACES,
            places: dbResult.rows._array
        })
       } catch(err) {
        console.log(err);
        throw new Error('Error fetching data');
      }
    }  
}