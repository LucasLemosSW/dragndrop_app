import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MyButtom from '../../components/MyButtom';
import {Text} from './styles';
import auth from '@react-native-firebase/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import {CommonActions} from '@react-navigation/native';

const Users = ({navigation}) => {
  const [cont, setCont] = useState(0);

  //useEffect(() => {}, []);
  //criação do componente
  useEffect(() => {
    console.log('chamou na criação do componente');

    return () => {
      console.log('chamou ao destruir o componente');
    };
  }, []);

  //na atualização do componente
  useEffect(() => {
    console.log('chamou na atualização do componente');
  }, [cont]);

  const incrementar = () => {
    setCont(cont + 1);
  };

  const decrementar = () => {
    setCont(cont - 1);
  };

  async function logout() {
    try {
      await EncryptedStorage.removeItem('user_session');
      // Congrats! You've just removed your first value!
    } catch (error) {
      // There was an error on the native side
    }

    auth()
      .signOut()
      .then(() => console.log('User signed out!'));

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'AuthStack'}],
      }),
    );
    navigation.navigate('SignIn');
  }

  return (
    <View>
      <Text>Contador: {cont}</Text>
      <MyButtom text="Incrementar" onClick={incrementar} />
      <MyButtom text="Decrementar" onClick={decrementar} />
      <MyButtom
        text="Vai para Screen Curso"
        onClick={() => navigation.navigate('Cursos')}
      />
      <MyButtom text="Sair" onClick={logout} />
    </View>
  );
};
export default Users;
