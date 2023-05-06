import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Remember from '../screens/Remember';
import {COLORS} from '../assets/colors';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Preload">
      <Stack.Screen name="Preload" component={Preload} options={preloadStyle} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen
        name="ForgotPassWord"
        component={Remember}
        options={forgotPassWordStyle}
      />
    </Stack.Navigator>
  );
}

const signInStyle = {
  headerLeft: false,
  title: 'Bem vindo',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
};

const signUpStyle = {
  title: 'Cadastre-se',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: COLORS.white,
};

const forgotPassWordStyle = {
  title: 'Recuperar Senha',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: COLORS.white,
};

const preloadStyle = {
  headerShown: false,
};
