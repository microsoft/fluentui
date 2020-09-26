import { IAppDefinition } from '@uifabric/example-app-base';
import { AppCustomizations } from './customizations';

export const AppDefinition: IAppDefinition = {
  appTitle: 'Fluent UI React - Cards',
  customizations: AppCustomizations,
  testPages: [],
  examplePages: [
    {
      links: [
        {
          component: require<any>('../Card/CardPage').CardPage,
          key: 'Card',
          name: 'Card',
          url: '#/examples/card',
        },
      ],
    },
  ],
  headerLinks: [
    {
      name: 'Getting started',
      url: '#/',
    },
    {
      name: 'Fabric',
      url: 'https://developer.microsoft.com/en-us/fluentui',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/microsoft/fluentui',
    },
  ],
};
