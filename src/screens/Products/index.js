import React, {useContext, useState} from 'react';
import {CommonActions} from '@react-navigation/native';
import {Container, FlatList} from './styles';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import { ProdutoContext } from '../../context/ProductProvider';
import SearchBar from '../../components/SearchBar';

const Products = ({navigation}) => {
  const {produtos} = useContext(ProdutoContext);
  const [produtosTemp, setProdutosTemp] = useState([]);

  const filterByName = text => {
    if (text !== '') {
      let a = [];

      a.push(
        ...produtos.filter(e =>
          e.nome.toLowerCase().includes(text.toLowerCase()),
        ),
      );

      if (a.length > 0) {
        setProdutosTemp(a);
      }
    } else {
      setProdutosTemp([]);
    }
  };

  // const routeProduct = item => {
  //   //console.log(item);
  //   navigation.dispatch(
  //     CommonActions.navigate({
  //       name: 'Produto',
  //       params: {produto: item},
  //     }),
  //   );
  // };

  const routeProduct = value => {
    console.log(value);
    navigation.navigate('Produto', {
      value,
    });
  };

  // const routeAddProduct = () => {
  //   navigation.dispatch(
  //     CommonActions.navigate({
  //       name: 'Produto',
  //       params: {produto: null},
  //     }),
  //   );
  // };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeProduct(item)} />
  );

  return (
    <Container>
      <SearchBar setSearch={filterByName} />
      <FlatList
        data={produtosTemp.length > 0 ? produtosTemp : produtos}
        renderItem={({item}) => (
          <Item item={item} onPress={() => routeProduct(item)} key={item.uid} />
        )}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={() => routeProduct(null)} />
    </Container>
  );
};
export default Products;
