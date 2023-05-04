import React, {useState, createContext, useEffect} from 'react';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const StudentContext = createContext({});

export const StudentProvider = ({children}) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // storeContextUser(); //faz chache do user logado na sessão
    const unsubscribeStudents = getStudents(); //faz cache dos estudantes

    return () => {
      unsubscribeStudents;
    };
  }, []); //ao montar o componente

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getStudents = async () => {
    
    const unsubscribe = firestore()
      .collection('estudantes')
      .orderBy('nome')
      .onSnapshot(
        //inscrevendo um listener
        (querySnapshot) => {
          let d = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, ' => ', doc.data());
            const student = {
              uid: doc.id,
              adiantamento: doc.data().adiantamento,
              curso: doc.data().curso,
              latitude: doc.data().latitude,
              longitude: doc.data().longitude,
              nome: doc.data().nome,
            };
            d.push(student);
          });
          // console.log("D=> :", d);
          setStudents(d);
        },
        (e) => {
          console.error('StudentProvider, getUsers: ' + e);
        },
      );

    return unsubscribe;
  };

  const saveStudent = async (student) => {
    await firestore()
      .collection('students')
      .doc(student.uid)
      .set(
        {
          adiantamento: student.adiantamento,
          curso: student.curso,
          latitude: student.latitude,
          longitude: student.longitude,
          nome: student.nome,
        },
        {merge: true},
      )
      .then(() => {
        showToast('Dados salvos.');
      })
      .catch((e) => {
        console.error('StudentProvider, saveStudent: ' + e);
      });
  };

  const deleteStudent = async (uid) => {
    await firestore()
      .collection('students')
      .doc(uid)
      .delete()
      .then(() => {
        showToast('Aluno excluído.');
      })
      .catch((error) => {
        console.error('StudentProvider, deleteStudent: ', error);
      });
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        getStudents,
        saveStudent,
        deleteStudent,
      }}>
      {children}
    </StudentContext.Provider>
  );
};
