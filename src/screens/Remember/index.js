import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import {COLORS} from '../../assets/colors';
import MyButtom from '../../components/MyButtom';
import Loading from '../../components/Loading';
import auth from '@react-native-firebase/auth';

const Remember = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [confirmaEmail, setConfirmaEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function recuperar() {
    setLoading(true);
    // console.log(confirmaEmail,email);
    if(confirmaEmail==email)
    {
      auth()
        .sendPasswordResetEmail(email)
        .then(function () {
          setLoading(false);
          Alert.alert('Email de confirmação enviado');
          navigation.navigate('SignIn');
        })
        .catch(function (error) {
          setLoading(false);
          Alert.alert('Ops!\nEmail não encontrado');
          console.error(error);
        });
    }else{
      setLoading(false);
      Alert.alert('Os emails não são identicos');
      console.error(error);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
        <Text
            style={styles.normal}
            onPress={() => navigation.navigate('Remember')}>
            Digite seu endereço de Email:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Seu email"
            placeholderTextColor="grey"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={t => setEmail(t)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirme seu email"
            placeholderTextColor="grey"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={t => setConfirmaEmail(t)}
          />
          <MyButtom text="Recuperar " onClick={recuperar} />
        </View>
      </ScrollView>
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default Remember;

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    margin: 5,
  },
  normal: {
    width: 300,
    height: 50,
    margin: 5,
    fontSize: 20,
    color: "grey",
    },
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    color: COLORS.black,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
  },
});
