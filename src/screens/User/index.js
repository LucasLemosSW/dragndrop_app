import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import MyButtom from '../../components/MyButtom';
import {Text} from './styles';
import auth from '@react-native-firebase/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import {CommonActions} from '@react-navigation/native';
import {AuthUserContext} from '../../context/AuthUserProvider';

const User = ({navigation}) => {
  const [cont, setCont] = useState(0);
  const {signOut} = useContext(AuthUserContext);

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

  function sair() {
    console.log("AQUi");
    if (signOut()) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AuthStack'}],
        }),
      );
    } else {
      Alert.alert(
        'Ops!',
        'Estamos com problemas para realizar essa operação.\nPor favor, contate o administrador.',
      );
    }
  }

  return (
    <View>
      {/* <MyButtom
        text="Vai para Screen Curso"
        onClick={() => navigation.navigate('Cursos')}
      /> */}
      <MyButtom text="Sair" onClick={sair} />
    </View>
  );
};
export default User;
