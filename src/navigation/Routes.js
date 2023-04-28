import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import {AuthUserContext} from '../context/AuthUserProvider';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

export default function Routes() {

  const {user, setUser} = useContext(AuthUserContext);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // inscreve um handler para o user state changes
    const unsubscriber = auth().onAuthStateChanged((authUser) => {
      console.log("ROUTES: ",authUser);
      authUser ? setUser(authUser) : setUser(null);
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscriber; //unsubscribe o handler ao desmontar
  }, []);

  if (initializing) {
    //se está inicializando, aguarda o Firebase responder
    return null;
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
      {/* <AuthStack /> */}
    </NavigationContainer>
  );
}
