/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Student from '../screens/Stundent';
import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Remember from '../screens/Remember';

import Students from '../screens/Students';
import User from '../screens/User';

import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../assets/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen component={Preload} name="Preload" />
    <Stack.Screen component={SignIn} name="SignIn" />
    <Stack.Screen component={SignUp} name="SignUp" />
    <Stack.Screen component={Remember} name="Remember" />
  </Stack.Navigator>
);

const AppStack = () => (
  <Tab.Navigator
    initialRouteName="Estudantes"
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen
      component={Students}
      name="Estudantes"
      options={{
        tabBarLabel: 'Alunos',
        tabBarIcon: () => (
          <Icon name="people" color={COLORS.primary} size={20} />
        ),
      }}
    />
    <Tab.Screen
      component={User}
      name="User"
      options={{
        tabBarIcon: () => (
          <Icon name="person" color={COLORS.primary} size={20} />
      ),
      }}
    />
  </Tab.Navigator>
);

const Navigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="AuthStack"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen component={AuthStack} name="AuthStack" />
      <Stack.Screen component={AppStack} name="AppStack" />
      <Stack.Screen
        component={Student}
        name="Aluno"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
export default Navigator;
