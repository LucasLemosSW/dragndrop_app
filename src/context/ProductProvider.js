/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useState, useContext, useEffect} from 'react';

import {ApiContext} from './ApiProvider';

export const ProdutoContext = createContext({});

export const ProdutoProvider = ({children}) => {
  const [produtos, setProdutos] = useState([]);
  const {api} = useContext(ApiContext);

  //console.log(api);

  useEffect(() => {
    if (api) {
      getProducts();
    }
  }, [api]);

  const getProducts = async () => {
    try {
      const response = await api.get('/produtos/');
      //console.log('Dados buscados via API');
      //console.log(response.data);
      //console.log(response.data.documents);
      let data = [];
      response.data.documents.map(d => {
        let k = d.name.split(
          'projects/pdm-aula-273d6/databases/(default)/documents/produtos/',
        );
        //console.log(k[1]);
        console.log("campos: ",d.fields);
        //console.log(d.fields.tecnologias.stringValue);
        data.push({
          nome: d.fields.nome.stringValue,
          preco:d.fields.preco.integerValue,
          importado:d.fields.importado.booleanValue,
          latitude: d.fields.latitude.stringValue,
          longitude: d.fields.longitude.stringValue,
          importado:d.fields.importado.booleanValue,
          uid: k[1],
        });
      });
      console.log("DATA=> ",data);
      data.sort((a, b) => {
        if (a.nome.toUpperCase() < b.nome.toUpperCase()) {
          return -1;
        }
        if (a.nome.toUpperCase() > b.nome.toUpperCase()) {
          return 1;
        }
        // nomes iguais
        return 0;
      });
      setProdutos(data);
    } catch (response) {
      console.error('Erro em getCompanies via API:');
      console.error(response);
    }
  };
  
  const saveProduct = async val => {
    console.log(val);
    try {
      await api.post('/produtos/', {
        fields: {
          nome: {stringValue: val.nome},
          preco: {integerValue: val.preco},
          importado: {booleanValue: val.importado},
          latitude: {stringValue: val.latitude},
          longitude: {stringValue: val.longitude}
        },
      });
      getProducts();
      return true;
    } catch (response) {
      console.error('Erro em saveProduct via API: ' + response);
      return false;
    }
  };

  const updateProduct = async val => {
    //console.log(val);
    try {
      await api.patch('/produtos/' + val.uid, {
        fields: {
          nome: {stringValue: val.nome},
          preco: {integerValue: val.preco},
          importado: {booleanValue: val.importado},
          latitude: {stringValue: val.latitude},
          longitude: {stringValue: val.longitude}
        },
      });
      getProducts();
      return true;
    } catch (response) {
      console.error('Erro em updateProduct via API: ' + response);
      return false;
    }
  };

  const deleteProduct = async val => {
    try {
      await api.delete('/produtos/' + val);
      getProducts();
      return true;
    } catch (response) {
      console.error('Erro em deleteProduct via API: ' + response);
      return false;
    }
  };

  return (
    <ProdutoContext.Provider
      value={{
        produtos,
        saveProduct,
        updateProduct,
        deleteProduct,
      }}>
      {children}
    </ProdutoContext.Provider>
  );
};
