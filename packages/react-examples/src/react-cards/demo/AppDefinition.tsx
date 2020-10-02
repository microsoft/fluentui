import { IAppDefinition } from '@uifabric/example-app-base';
import { AppThemes } from './AppThemes';

export const AppDefinition: IAppDefinition = {
  appTitle: 'Fluent UI React - Cards',
  themes: AppThemes,
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
