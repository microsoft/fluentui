import * as React from 'react';
import { App as AppBase, IAppDefinition, IAppProps } from '@uifabric/example-app-base';

export const AppDefinition: IAppDefinition = {
  appTitle: 'Fabric - React',

  testPages: [
  ],
  examplePages: [
    {
      links: [
        {
          component: require<any>('../components/Link/LinkPage').LinkPage,
          key: 'Link',
          name: 'Link',
          url: '#/examples/link'
        },
        {
          component: require<any>('../components/Tile/TilePage').TilePage,
          key: 'Tile',
          name: 'Tile',
          url: '#/examples/tile'
        },
        {
          component: require<any>('../components/TilesList/TilesListPage').TilesListPage,
          key: 'TilesList',
          name: 'TilesList',
          url: '#/examples/tileslist'
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

export const App = (props: IAppProps) => <AppBase appDefinition={ AppDefinition } { ...props } />;
