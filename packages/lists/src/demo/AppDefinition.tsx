/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDefinition } from '@uifabric/example-app-base';

export const AppDefinition: IAppDefinition = {
  appTitle: 'Fluent UI React - Lists',

  testPages: [],
  examplePages: [
    {
      links: [
        {
          component: require<any>('./pages/StaticListPage').StaticListPage,
          name: 'StaticList',
          url: '#/StaticList',
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
