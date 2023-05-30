import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from './navitab';

const App = () => {
  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
};
export default App;
