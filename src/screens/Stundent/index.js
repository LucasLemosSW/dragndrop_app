import React, {useState, useEffect, useContext} from 'react';
import {Container,Text, TextInput} from './styles';
import MyButtom from '../../components/MyButtom';
import {
  Alert,
} from 'react-native';
import Loading from '../../components/Loading';
import {StudentContext} from '../../context/StudentProvider';

const Student = ({route, navigation}) => {

  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState('');
  const [uid, setUid] = useState('');
  const {save, del} = useContext(StudentContext);


  useEffect(() => {
    if (route.params.value) {
      setNome(route.params.value.nome);
      setCurso(route.params.value.curso);
      setUid(route.params.value.uid);
    }
  }, [route]);

  const deletar = async () => {
    Alert.alert(
      'Opa! Fique esperto.',
      'Você tem certeza que deseja excluir o aluno?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            setLoading(true);
            await del(uid)
            setLoading(false);
            navigation.goBack();
          },
        },
      ],
    );
  };

  const salvar = async () => {
    // setLoading(true);
    // console.log("DEBUG: ",nome, curso);
    if(nome == "" || curso == ""){
      Alert.alert("Os campos devem ser preenchidos!")
      return false;
    }
    if (
      await save({
        uid,
        nome,
        curso,
      })
    ) {
      // ToastAndroid.show('Show! Você salvou com sucesso.', ToastAndroid.LONG);
      navigation.goBack();
    } else {
      // ToastAndroid.show('Ops!Deu problema ao salvar.', ToastAndroid.LONG);
    }
    // setLoading(false);
  };

  return (
    <Container>
      <TextInput
        placeholder="Nome"
        placeholderTextColor="grey"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Curso"
        placeholderTextColor="grey"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setCurso(t)}
        value={curso}
      />
      <MyButtom
        text="Salvar"
        onClick={() => {
          salvar();
        }}
      />
      {uid != ""? 
      <MyButtom
        text="Deletar"
        onClick={() => {
          deletar();
        }}
      /> : ""
    }
      
    </Container>
  );
};

export default Student;
