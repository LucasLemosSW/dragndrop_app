import React, {useEffect, useContext} from 'react';
import {View, Text} from 'react-native';
import {Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import { AuthUserContext } from '../../context/AuthUserProvider';

const Preload = ({navigation}) => {
  const {user, setUser, getUserCache} = useContext(AuthUserContext);

  // useEffect(() => {
  //   storeContextUser(); //faz chache do user logado na sessão
  // }, []); //ao montar o componente

  // const storeContextUser = async () => {
  //   if (user) {
  //     //se está logado
  //     const jsonValue = await getUserCache();
  //     const userCache = JSON.parse(jsonValue);
  //     setUser(userCache);
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [{name: 'Alunos'}],
  //       }),
  //     );
  //   } else {
  //     //se está null, refaz o login usando a cache
  //     auth()
  //       .signInWithEmailAndPassword(user.email, user.pass)
  //       .then(() => {
  //         navigation.dispatch(
  //           CommonActions.reset({
  //             index: 0,
  //             routes: [{name: 'Alunos'}],
  //           }),
  //         );
  //       })
  //       .catch((e) => {
  //         console.log('SignIn: erro em entrar: ' + e);
  //         switch (e.code) {
  //           case 'auth/user-not-found':
  //             Alert.alert('Erro', 'Usuário não cadastrado.');
  //             break;
  //           case 'auth/wrong-password':
  //             Alert.alert('Erro', 'Erro na senha.');
  //             break;
  //           case 'auth/invalid-email':
  //             Alert.alert('Erro', 'Email inválido.');
  //             break;
  //           case 'auth/user-disabled':
  //             Alert.alert('Erro', 'Usuário desabilitado.');
  //             break;
  //         }
  //       });
  //   }
  // };


  useEffect(() => {
    entrar();

  });

  const entrar = async () => {
    const sessionUser = await retrieveUserSession();

    console.log("token: ", sessionUser);
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
              routes: [{name: 'Alunos'}],
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


  return (
    <View>
      <Text>Preload</Text>
    </View>
  );
};

export default Preload;
