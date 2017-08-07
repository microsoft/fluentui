import * as React from 'react';
import { App as AppBase, IAppDefinition, IAppProps } from '@uifabric/example-app-base';

export const AppDefinition: IAppDefinition = {
  appTitle: 'Fabric - React',

  testPages: [
  ],
  examplePages: [
  ],
  headerLinks: [
    {
      name: 'Getting started',
      url: '#/'
    },
    {
      name: 'Fabric',
      url: 'http://dev.office.com/fabric'
    },
    {
      name: 'Github',
      url: 'http://www.github.com/officedev'
    }
  ]

};

export const App = (props: IAppProps) => <AppBase appDefinition={ AppDefinition } { ...props } />;