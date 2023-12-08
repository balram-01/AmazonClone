/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { decode } from "base-64";
global.atob = decode;

AppRegistry.registerComponent(appName, () => App);
