import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import App from '../App';
// import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="App"
      screenOptions={{
        title: 'WA-CHI',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#1E407B',
          height:70,
        },
        tabBarStyle:{
          backgroundColor:'#1E407B',
          height:60,
        },
        tabBarLabelStyle:{
          fontSize:12,
          marginBottom:5
        },
        tabBarIndicatorStyle: 'lightgray',  //비활성화
        tabBarActiveTintColor: 'white',     //활성화
      }}>

      <Tab.Screen name="App" component={App}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          )
        }} />
      <Tab.Screen name="Screen2" component={Screen2}
        options={{
          tabBarLabel: '조회',
          tabBarIcon: ({color, size}) => (
            <Icon name="calendar-today" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="Screen3" component={Screen3} options={{
        tabBarLabel: '알림',
        tabBarIcon: ({color, size}) => (
          <Icon name="notifications" color={color} size={size} />
        ),
      }} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
