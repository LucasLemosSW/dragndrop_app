import React, {useState, useEffect, useContext} from 'react';
import {CommonActions} from '@react-navigation/native';

import {Container, FlatList} from './styles';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import Loading from '../../components/Loading';
import {StudentContext} from '../../context/StudentProvider';

const StudentsTab = ({navigation}) => {
  
  // const [loading, setLoading] = useState(true);
  const {students} = useContext(StudentContext);

  const routeStudent = (item) => {
    //console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Aluno',
        params: {student: item},
      }),
    );
  };

  const routeAddStudent = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Aluno',
        params: {student: null},
      }),
    );
  };

  const renderItem = ({item}) => (
    // console.log(item);
    <Item item={item} onPress={() => routeStudent(item)} />
  );

  return (
    <Container >
      {/* {console.log("STUDENTS: ",students)} */}
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
      />
      <AddFloatButton onClick={routeAddStudent} />
      {/* {loading && <Loading />} */}
    </Container>
  );
};
export default StudentsTab;
