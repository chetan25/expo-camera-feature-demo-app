import { API_KEY_DEV, API_KEY_PROD } from '@env';

const variables = {
    development: {
        googleApiKey: API_KEY_DEV
    },
    production: {
        googleApiKey: API_KEY_PROD
    }
};
 
const getEnvVariables = () => {
    if (__DEV__) {
        return variables.development; // return this if in development mode
    }
    return variables.production; // otherwise, return this
};
 
export default getEnvVariables; // export a reference to the function