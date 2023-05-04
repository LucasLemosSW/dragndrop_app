import React from 'react';

import {AuthUserProvider} from '../context/AuthUserProvider';
// import {UserProvider} from '../context/UserProvider';
// import {CourseProvider} from '../context/CourseProvider';
// import {StudentProvider} from '../context/StudentProvider';
// import {CompanyProvider} from '../context/CompanyProvider';
// import {ApiProvider} from '../context/ApiProvider';
import Routes from './Routes';
import { StudentProvider } from '../context/StudentProvider';

/**
 * Wrap all providers here
 */

export default function Providers() {
  return (
    <AuthUserProvider>
      <StudentProvider> 
        <Routes />
      </StudentProvider>
    </AuthUserProvider>
  );
}
