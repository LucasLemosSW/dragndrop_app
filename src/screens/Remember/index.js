import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
} from 'react-native';
import MyButtom from '../../components/MyButtom';
import auth from '@react-native-firebase/auth';

const Remember = ({navigation}) => {
  const [email, setEmail] = useState('');

  async function recuperar() {
    auth()
      .sendPasswordResetEmail(email)
      .then(function () {
        navigation.navigate('SignIn');
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={t => setEmail(t)}
          />
          <MyButtom text="Recuperar " onClick={recuperar} />
        </View>
      </ScrollView>
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
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
  },
});
