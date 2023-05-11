/* eslint-disable react/jsx-no-duplicate-props */
import React, {useContext, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {StudentContext} from '../../context/StudentProvider';
import AddFloatButton from '../../components/AddFloatButton';

import {COLORS} from '../../assets/colors';
import {AuthUserContext} from '../../context/AuthUserProvider';
import {CommonActions} from '@react-navigation/native';
import SearchBar from '../../components/SearchBar';
import Item from './Item';

const Tab = createBottomTabNavigator();

const Students = ({navigation}) => {

  const {signOut} = useContext(AuthUserContext);
  const {students} = useContext(StudentContext);
  const [estudantesTemp, setEstudantesTemp] = useState([]);

  const filterByName = text => {
    if (text !== '') {
      let a = [];
      // estudantes.forEach(e => {
      //   if (e.nome.toLowerCase().includes(text.toLowerCase())) {
      //     a.push(e);
      //   }
      // });
  
      a.push(
        ...students.filter(e =>
          e.nome.toLowerCase().includes(text.toLowerCase()),
        ),
      );
  
      if (a.length > 0) {
        setEstudantesTemp(a);
      }
    } else {
      setEstudantesTemp([]);
    }
  };

  const routeStudent = value => {
    // console.log(value.nome);
    navigation.navigate('Aluno', {
      value,
    });
  };

  const renderItem = ({item}) => (
    // console.log(item);
    <Item item={item} onPress={() => routeStudent(item)} />
  );

  return (

    <View style={styles.container}>
      <SearchBar setSearch={filterByName} />
      
      {/* <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
      /> */}
      <FlatList
        data={estudantesTemp.length > 0 ? estudantesTemp : students}
        renderItem={({item}) => (
          <Item item={item} onPress={() => routeStudent(item)} key={item.uid} />
        )}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={() => routeStudent(null)} />
    </View>
  );
};
export default Students;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});
