import React, {useEffect, useContext} from 'react';
import {Container, Image} from './styles';
import {Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import { AuthUserContext } from '../../context/AuthUserProvider';

const Preload = ({navigation}) => {

  const {retrieveUserSession, signIn} = useContext(AuthUserContext);

  const entrar = async () => {
    const userSession = await retrieveUserSession();

    if (
      userSession &&
      (await signIn(userSession.email, userSession.pass)) === 'ok'
    ) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AppStack'}],
        }),
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        }),
      );
    }
  };

  useEffect(() => {
    entrar();
  }, []);

  return (
    <Container>
      <Image
        source={require('../../assets/images/logo.png')}
        accessibilityLabel="logo do app"
      />
    </Container>
  );
};

export default Preload;
