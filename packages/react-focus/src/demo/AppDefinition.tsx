// tslint:disable:no-any
import { IAppDefinition } from '@uifabric/example-app-base';

export const AppDefinition: IAppDefinition = {
  appTitle: 'Fluent UI - react-focus',

  testPages: [],
  examplePages: [
    {
      links: [
        {
          component: require<any>('../components/FocusZone/FocusZonePage').FocusZonePage,
          key: 'FocusZone',
          name: 'FocusZone',
          url: '#/examples/focuszone'
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
      name: 'Fluent UI',
      url: 'https://microsoft.github.io/fluent-ui-react'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/microsoft/fluent-ui-react'
    }
  ]
};
