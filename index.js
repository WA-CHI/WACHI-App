/**
 * @format
 */

import {AppRegistry} from 'react-native';
//  import App from './src/main';                   //부가기능 페이지
// import App from './src/App';                   //RTC 페이지
import App from './src/navigation/navi';                   //네비 페이지
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);