// tslint:disable:no-any
import { IAppDefinition } from '@uifabric/example-app-base';
import { AppCustomizations } from './customizations';

export const AppDefinition: IAppDefinition = {
  appTitle: 'UI Fabric - Cards',
  customizations: AppCustomizations,
  testPages: [],
  examplePages: [
    {
      links: [
        {
          component: require<any>('../components/Card/CardPage').CardPage,
          key: 'Card',
          name: 'Card',
          url: '#/examples/card'
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
