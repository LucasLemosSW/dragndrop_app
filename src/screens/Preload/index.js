import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';

const Preload = ({navigation}) => {
  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');

      if (session !== {} || session !== undefined) {
        return JSON.parse(session);
      }
      return null;
    } catch (error) {
      console.error('Preload, retrieveUserSession' + error);
      return null;
    }
  }

  const entrar = async () => {
    const sessionUser = await retrieveUserSession();

    // console.log("token: ", sessionUser);
    navigation.navigate('SignIn');
    if (sessionUser) {
      console.log('chegouuuu');
      if (sessionUser.emailLocal !== '' && sessionUser.pass !== '') {
        try {
          await auth().signInWithEmailAndPassword(
            sessionUser.emailLocal,
            sessionUser.pass,
          );
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'AppStack'}],
            }),
          );
        } catch (error) {
          // setLoading(false);
          console.error('SignIn, entrar: ' + error);
          switch (error.code) {
            case 'auth/user-not-found':
              Alert.alert('Erro', 'Usuário não cadastrado.');
              break;
            case 'auth/wrong-password':
              Alert.alert('Erro', 'Erro na senha.');
              break;
            case 'auth/invalid-email':
              Alert.alert('Erro', 'Email inválido.');
              break;
            case 'auth/user-disabled':
              Alert.alert('Erro', 'Usuário desabilitado.');
              break;
          }
        }
      }
    } else {
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{name: 'AuthStack'}],
      //   }),
      // );
      navigation.navigate('SignIn');
      console.log('caiu no else');
    }
  };

  useEffect(() => {
    entrar();
    // const userSession = retrieveUserSession();
    // console.log(userSession);
    // console.log('Chegou');
  });

  return (
    <View>
      <Text>Preload</Text>
    </View>
  );
};

export default Preload;
