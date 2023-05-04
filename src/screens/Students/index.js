/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import StudentsTab from './StudensTab';
// import MapStudentsTab from './MapStudentsTab';
import {COLORS} from '../../assets/colors';

const Tab = createBottomTabNavigator();

const Students = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        initialRouteName: 'EstudantesTab',
        activeTintColor: COLORS.primary,
        labelStyle: {
          height: 18,
          fontSize: 12,
          margin: 0,
          fontWeight: 'bold',
        },
        style: {backgroundColor: COLORS.white},
        showIcon: true,
      }}>
      <Tab.Screen
        name="EstudantesTab"
        component={StudentsTab}
        options={{
          tabBarLabel: 'Alunos',
          tabBarIcon: () => (
            <Icon name="people" color={COLORS.primary} size={20} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="EstudantesMapTab"
        component={MapStudentsTab}
        options={{
          tabBarLabel: 'Localização',
          tabBarIcon: () => (
            <Icon name="map" color={COLORS.primary} size={20} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};
export default Students;
