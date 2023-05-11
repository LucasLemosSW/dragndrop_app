import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {COLORS} from '../../assets/colors';
import auth from '@react-native-firebase/auth';
import MyButtom from '../../components/MyButtom';
import Loading from '../../components/Loading';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [loading, setLoading] = useState(false);

  const criar = async () => {
    // Alert.alert('Email: ' + email + ' Senha: ' + password);

    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        await auth().currentUser.sendEmailVerification();
        Alert.alert("Conta Criada !\nConfirme seu email !!!");
        navigation.navigate('SignIn');
        // console.log('User account created & signed in!', email);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          setLoading(false);
          Alert.alert("Email já cadastrado");
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setLoading(false);
          Alert.alert("Formato de email invalido!");
        }

        // console.error("AQUI: ",error);
        // setLoading(false);
        // Alert.alert("AQUI: ");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.divSuperior}>
          <Image
            style={styles.image}
            source={require('../../assets/images/logo.png')}
            accessibilityLabel="logo do app"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="grey"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={t => setEmail(t)}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={showPass}
            placeholder="Senha"
            placeholderTextColor="grey"
            keyboardType="default"
            returnKeyType="go"
            onChangeText={t => setPassword(t)}
          />
          {/* <Text
            style={styles.textEsqueceuSenha}
            onPress={() => navigation.navigate('RecuperarSenha')}>
            Esqueceu sua senha?
          </Text> */}
          <MyButtom text="Criar Conta " onClick={criar} />
        </View>
        <View style={styles.divInferior}>
          <View style={styles.divOuHr}>
            <View style={styles.divHr} />
            <Text style={styles.textOu}>OU</Text>
            <View style={styles.divHr} />
          </View>
          <View style={styles.divCadastrarSe}>
            <Text style={styles.textNormal}>Já tem conta?</Text>
            <Text
              style={styles.textCadastrarSe}
              onPress={() => navigation.navigate('SignIn')}>
              Logar
            </Text>
          </View>
          {/* {loading && <Loading />} */}
        </View>
      </ScrollView>
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  divSuperior: {
    flex: 5,
    alignItems: 'center',
  },
  divInferior: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
  },
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: 'grey',
    color: COLORS.darkGrey,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
  },
  textEsqueceuSenha: {
    fontSize: 15,
    color: 'blue',
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  divOuHr: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divHr: {
    width: '30%',
    height: 1,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },
  textOu: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
    color: 'grey',
  },
  divCadastrarSe: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textNormal: {
    fontSize: 18,
    color: COLORS.darkGrey,
  },
  textCadastrarSe: {
    fontSize: 16,
    color: 'blue',
    marginLeft: 5,
  },
});
