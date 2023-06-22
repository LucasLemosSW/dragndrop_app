import React from 'react';
import {AuthUserProvider} from '../context/AuthUserProvider';
import { StudentProvider } from '../context/StudentProvider';
import Navigator from './Navigator';
import {ApiProvider} from '../context/ApiProvider';
// import {EmpresaProvider} from '../context/EmpresaProvider';
import {UserProvider} from '../context/UserProvider';
import { ProdutoProvider } from '../context/ProductProvider';

export default function Providers() {
  return (
    <AuthUserProvider>
      <ApiProvider>
        <UserProvider>
          <StudentProvider>
              <ProdutoProvider>
                <Navigator/>
              </ProdutoProvider>
          </StudentProvider>
        </UserProvider>
      </ApiProvider>
    </AuthUserProvider>
  );
}
