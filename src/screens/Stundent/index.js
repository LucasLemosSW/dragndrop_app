import React, {useState, useEffect, useContext} from 'react';
import {Container, Text, TextInput} from './styles';
import MyButtom from '../../components/MyButtom';
import {StudentContext} from '../../context/StudentProvider';

const Student = ({route, navigation}) => {

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

  const salvar = async () => {
    // setLoading(true);
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
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Curso"
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
    </Container>
  );
};

export default Student;
