import React, {useState, useEffect, useContext} from 'react';
import {Container,Text, TextInput} from './styles';
import MyButtom from '../../components/MyButtom';
import {
  Alert,
  Switch,
} from 'react-native';
import Loading from '../../components/Loading';

import { ProdutoContext } from '../../context/ProductProvider';

const Product = ({route, navigation}) => {

  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [importado, setImportado] = useState('');
  const [uid, setUid] = useState('');
  const [latitude, setLatitude] = useState('0');
  const [longitude, setLongitude] = useState('0');
  const {saveProduct, updateProduct, deleteProduct} = useContext(ProdutoContext);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setImportado(previousState => !previousState);


  useEffect(() => {
    // console.log(route.params);
    if (route.params.value) {
      setUid(route.params.value.uid);
      setNome(route.params.value.nome);
      setPreco(route.params.value.preco);
      setImportado(route.params.value.importado);
      setLatitude(route.params.value.latitude);
      setLongitude(route.params.value.longitude);
    }
  }, [route]);

  const deletar = async () => {
    Alert.alert(
      'Opa! Fique esperto.',
      'Você tem certeza que deseja excluir o Produto?',
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
            await deleteProduct(uid)
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
    if(nome == "" || preco == ""){
      Alert.alert("Os campos devem ser preenchidos!")
      return false;
    }
    let product = {};
    product.uid = uid;
    product.nome = nome;
    product.preco = preco;
    importado==""?product.importado=false:product.importado=true;
    product.latitude = latitude;
    product.longitude = longitude;
    if(uid){
      if (
        await updateProduct(product
        )
      )navigation.goBack();}
    else{
      if (await saveProduct(product
      )) navigation.goBack();
    }
    
  };

  function onGoBack(lat, long) {
    setLatitude(lat.toString());
    setLongitude(long.toString());
  }

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
        placeholder="Preco"
        placeholderTextColor="grey"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setPreco(t)}
        value={preco}
      />
      {/* <TextInput
        placeholder="Importado"
        placeholderTextColor="grey"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setImportado(t)}
        value={importado}
      /> */}
      <TextInput
        placeholder="Latitude"
        editable={false}
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setTeconologias(t)}
        value={latitude}
      />
      <TextInput
        placeholder="Longitude"
        editable={false}
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setTeconologias(t)}
        value={longitude}
      />
      <Text>É Importado?</Text>
       <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={importado ? '#f5dd4b' : '#f4f3f4'}
        // ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={importado}
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
    <MyButtom
      text="Obter Coordenadas no Mapa"
      onClick={() => navigation.navigate('ProductMap', {onGoBack})}
    />
      
    </Container>
  );
};

export default Product;
