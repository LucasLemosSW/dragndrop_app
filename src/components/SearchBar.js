import React from 'react';
import {View, TextInput} from 'react-native';

export default function ({setSearch}) {
  return (
    <View>
      <TextInput
        placeholder="digite o nome do aluno"
        backgroundColor='#478b5d'
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setSearch(t)}
      />
    </View>
  );
}
