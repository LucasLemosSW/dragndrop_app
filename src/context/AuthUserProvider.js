import React, {useState, createContext} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  async function storeUserSession(localEmail, pass) {
    try {
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          email: localEmail,
          pass,
        }),
      );
    } catch (e) {
      console.error('AuthUserProvider, storeUserSession: ' + e);
    }
  }

  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      return session !== null ? JSON.parse(session) : null;
    } catch (e) {
      console.error('AuthUserProvider, retrieveUserSession: ' + e);
    }
  }
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

  async function signIn(email, pass) {
    try {
      await auth().signInWithEmailAndPassword(email, pass);
      if (!auth().currentUser.emailVerified) {
        return 'Você deve validar seu email para continuar.';
      }
      // console.log("INFO: ",email,pass);
      await storeUserSession(email, pass);
      return 'ok';
      // if (!(await getUser(pass))) {
      //   userLocal.pass = pass;
      //   setUser(userLocal);
      //   return 'ok';
      // } else {
      //   return 'Problemas ao buscar o seu perfil. Contate o administrador.';
      // }
    } catch (e) {
      return launchServerMessageErro(e);
    }
  }

  async function forgotPass(email) {
    try {
      await auth().sendPasswordResetEmail(email);
      return 'ok';
    } catch (e) {
      return launchServerMessageErro(e);
    }
  }

  async function signOut() {
    try {
      setUser(null);
      await EncryptedStorage.removeItem('user_session');
      if (auth().currentUser) {
        await auth().signOut();
      }
      return true;
    } catch (e) {
      return false;
    }
  }
  /* Fim SignUp, SignIn, e SignOut */

  async function getUser(pass) {
    try {
      let doc = await firestore()
        .collection('estudantes').get();
        console.log("DOC:", doc);
        // .doc(auth().currentUser.uid)
        // .get();
      if (doc.exists) {
        //console.log('Document data:', doc.data());
        doc.data().uid = auth().currentUser.uid;
        doc.data().pass = pass;
        setUser(doc.data());
        return doc.data();
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  function launchServerMessageErro(e) {
    switch (e.code) {
      case 'auth/user-not-found':
        return 'Usuário não cadastrado.';
      case 'auth/wrong-password':
        return 'Erro na senha.';
      case 'auth/invalid-email':
        return 'Email inválido.';
      case 'auth/user-disabled':
        return 'Usuário desabilitado.';
      case 'auth/email-already-in-use':
        return 'Email em uso. Tente outro email.';
      default:
        return 'Erro desconhecido. Contate o administrador';
    }
  }

  return (
    <AuthUserContext.Provider
      value={{
        user,
        signUp,
        signIn,
        retrieveUserSession,
        forgotPass,
        signOut,
        getUser,
      }}>
      {children}
    </AuthUserContext.Provider>
  );
};
