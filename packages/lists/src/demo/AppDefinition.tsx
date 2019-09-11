// tslint:disable:no-any
import { IAppDefinition } from '@uifabric/example-app-base';

export const AppDefinition: IAppDefinition = {
  appTitle: 'UI Fabric - Lists',

  testPages: [],
  examplePages: [
    {
      links: [
        {
          component: require<any>('./pages/StaticListPage').StaticListPage,
          name: 'StaticList',
          url: '#/StaticList'
        }
      ]
    }
  ],
  headerLinks: [
    {
      name: 'Getting started',
      url: '#/'
    },
    {
      name: 'Fabric',
      url: 'https://dev.microsoft.com/fabric'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/OfficeDev/office-ui-fabric-react'
    }
  ]
};
