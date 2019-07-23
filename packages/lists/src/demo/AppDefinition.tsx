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
      url: 'http://dev.office.com/fabric'
    },
    {
      name: 'Github',
      url: 'http://www.github.com/officedev'
    }
  ]
};
