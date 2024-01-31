/**
 * @format
 */

import 'core-js/features/array/flat'; // required by Chakra
import 'core-js/features/array/flat-map'; // required by Chakra
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
