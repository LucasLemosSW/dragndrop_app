import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Preload from '../screens/Preload';
import Students from '../screens/Students';
import Student from '../screens/Stundent';
import Courses from '../screens/Courses';
import Course from '../screens/Course';
import Users from '../screens/Users';
import User from '../screens/User';
import {COLORS} from '../assets/colors';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Alunos">
      <Stack.Screen name="Alunos" component={Students} options={alunosStyle} />
      <Stack.Screen name="Aluno" component={Student} options={alunoStyle} />
      <Stack.Screen name="Cursos" component={Courses} options={cursosStyle} />
      <Stack.Screen name="Curso" component={Course} options={cursoStyle} />
      <Stack.Screen name="Usuarios" component={Users} options={usersStyle} />
      <Stack.Screen name="Usuario" component={User} options={userStyle} />
    </Stack.Navigator>
  );
}

const alunosStyle = {
  title: 'Alunos',
};

const alunoStyle = {
  title: 'Aluno',
};

const cursosStyle = {
  title: 'Cursos',
};

const cursoStyle = {
  title: 'Cursos',
};

const usersStyle = {
  title: 'Usuários',
};

const userStyle = {
  title: 'Usuário',
};
