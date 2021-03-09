import React from 'react';
import { StyleSheet } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import ReactThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator';
import PlaceReducer from './store/reducer/place';

const rootReducer = combineReducers({
  places: PlaceReducer
});

const store = createStore(rootReducer, applyMiddleware(ReactThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
});
