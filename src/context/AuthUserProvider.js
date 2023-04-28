// import React, {useState} from 'react';
// import {createContext} from 'react';

// export const AuthUserContext = createContext({});

// export const AuthUserProvider = ({children}) => {
//   const [user, setUser] = useState(null);

//   return (
//     <AuthUserContext.Provider value={(user, setUser)}>
//       {children}
//     </AuthUserContext.Provider>
//   );
// };

import React, {useState, createContext} from 'react';
import {Alert} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  /* Asyncstorage */
  const storeUserCache = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
      console.error('AuthUserProvider: erro ao salvar o user no cache: ' + e);
    }
  };

  const getUserCache = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue !== null ? jsonValue : null;
    } catch (e) {
      console.error('AuthUserProvider: erro ao ler o user no cache: ' + e);
    }
  };
  /* Fim Asyncstorage */

  /* SignUp, SignIn, e SignOut */
  const signUp = async (usuario, pass) => {
    await auth()
      .createUserWithEmailAndPassword(usuario.email, pass)
      .then(async () => {
        let userF = auth().currentUser;
        await firestore()
          .collection('users')
          .doc(userF.uid)
          .set(user)
          .then(() => {
            console.error('AuthUserProvider, signUp: usuário cadastrado.');
            userF
              .sendEmailVerification()
              .then(() => {
                Alert.alert(
                  'Informação',
                  'Foi enviado um email para: ' +
                    user.email +
                    ' para verificação.',
                );
              })
              .catch((e) => {
                console.error('AuthUserProvider, signUp: ' + e);
              });
          })
          .catch((e) => {
            console.error('AuthUserProvider, signUp: ' + e);
          });
      })
      .catch((e) => {
        console.error('AuthUserProvider, signUp: ' + e);
        switch (e.code) {
          case 'auth/email-already-in-use':
            Alert.alert('Erro', 'Email já está em uso.');
            break;
          case 'auth/operation-not-allowed':
            Alert.alert('Erro', 'Problemas ao cadastrar o usuário.');
            break;
          case 'auth/invalid-email':
            Alert.alert('Erro', 'Email inválido.');
            break;
          case 'auth/weak-password':
            Alert.alert(
              'Erro',
              'Senha é fraca, por favor, digite uma senha forte.',
            );
            break;
        }
      });
  };

  const signIn = async (email, pass) => {
    console.log("EMAIL: ",email)
    console.log("PASS: ",pass)
    await auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        if (auth().currentUser.emailVerified) {
          getUser(pass);
        } else {
          Alert.alert(
            'Erro',
            'Você deve verificar o seu email para prosseguir.',
          );
          auth()
            .signOut()
            .then(() => {})
            .catch((e) => {
              console.error('AuthUserProvider, signIn: ' + e);
            });
        }
        return 'foi';
      })
      .catch((e) => {
        console.error('AuthUserProvider: erro em signIn: ' + e);
        switch (e.code) {
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
      });
  };

  const sigOut = () => {
    setUser(null);
    AsyncStorage.removeItem('user')
      .then(() => {
        auth()
          .signOut()
          .then(() => {})
          .catch((e) => {
            console.error('AuthUserProvider, sigOut: ' + e);
          });
      })
      .catch((e) => {
        console.error('AuthUserProvider, sigOut chache: ' + e);
      });
  };
  /* Fim SignUp, SignIn, e SignOut */

  //busca os detalhes do user no nó users e faz cache
  const getUser = async (pass) => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          //console.log('Document data:', doc.data());
          doc.data().pass = pass;
          storeUserCache(doc.data());
          return doc.data();
        } else {
          console.log('AuthUserProvider, getUser: documento não localizado');
        }
      })
      .catch((e) => {
        console.error('AuthUserProvider: getUser: ' + e);
      });
  };

  return (
    <AuthUserContext.Provider
      value={{
        signUp,
        signIn,
        sigOut,
        user,
        setUser,
        getUser,
        getUserCache,
      }}>
      {children}
    </AuthUserContext.Provider>
  );
};
