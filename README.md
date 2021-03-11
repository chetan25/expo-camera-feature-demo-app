- Few commands we need to run to install packages using expo 
    > expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

- If we have issues with react-fonts loaded twice we need to remove it from inside expo 
    > rm -rf ./node_modules/expo/node_modules/expo-font

- For env we are using 'react-native-dotenv' package and a babel plugin 'metro-react-native-babel-preset' and have configured it in babel config