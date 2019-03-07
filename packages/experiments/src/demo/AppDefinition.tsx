// tslint:disable:no-any
import * as React from 'react';
import { App as AppBase, IAppDefinition, IAppProps } from '@uifabric/example-app-base';
import { AppCustomizations } from './customizations';

export const AppDefinition: IAppDefinition = {
  appTitle: 'Fabric - React',
  customizations: AppCustomizations,
  testPages: [],
  examplePages: [
    {
      links: [
        {
          component: require<any>('../components/Button/ButtonPage').ButtonPage,
          key: 'Button',
          name: 'Button',
          url: '#/examples/button'
        },
        {
          component: require<any>('../components/CollapsibleSection/CollapsibleSectionPage').CollapsibleSectionPage,
          key: 'CollapsibleSection',
          name: 'CollapsibleSection',
          url: '#/examples/collapsiblesection'
        },
        {
          component: require<any>('../components/Chiclet/ChicletPage').ChicletPage,
          key: 'Chiclet',
          name: 'Chiclet',
          url: '#/examples/chiclet'
        },
        {
          component: require<any>('../components/FolderCover/FolderCoverPage').FolderCoverPage,
          key: 'FolderCover',
          name: 'FolderCover',
          url: '#/examples/foldercover'
        },
        {
          component: require<any>('../components/FileTypeIcon/FileTypeIconPage').FileTypeIconPage,
          key: 'FileTypeIcon',
          name: 'FileTypeIcon',
          url: '#/examples/filetypeicon'
        },
        {
          component: require<any>('../components/LayoutGroup/LayoutGroupPage').LayoutGroupPage,
          key: 'LayoutGroup',
          name: 'LayoutGroup',
          url: '#/examples/layoutgroup'
        },
        {
          component: require<any>('../components/Pagination/PaginationPage').PaginationPage,
          key: 'Pagination',
          name: 'Pagination',
          url: '#/examples/pagination'
        },
        {
          component: require<any>('../components/PersonaCoin/PersonaCoinPage').PersonaCoinPage,
          key: 'PersonaCoin',
          name: 'PersonaCoin',
          url: '#/examples/personacoin'
        },
        {
          component: require<any>('../components/Persona/PersonaPage').PersonaPage,
          key: 'Persona',
          name: 'Persona',
          url: '#/examples/persona'
        },
        {
          component: require<any>('../components/Separator/SeparatorPage').SeparatorPage,
          key: 'Separator',
          name: 'Separator',
          url: '#/examples/separator'
        },
        {
          component: require<any>('../components/signals/SignalsPage').SignalsPage,
          key: 'Signals',
          name: 'Signals',
          url: '#/examples/signals'
        },
        {
          component: require<any>('../components/Sidebar/SidebarPage').SidebarPage,
          key: 'Sidebar',
          name: 'Sidebar',
          url: '#/examples/sidebar'
        },
        {
          component: require<any>('../slots/SlotsPage').SlotsPage,
          key: 'Slots',
          name: 'Slots',
          url: '#/examples/slots'
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
        },
        {
          component: require<any>('../components/Toggle/TogglePage').TogglePage,
          key: 'Toggle',
          name: 'Toggle',
          url: '#/examples/toggle'
        },
        {
          component: require<any>('../components/Shimmer/ShimmerPage').ShimmerPage,
          key: 'Shimmer',
          name: 'Shimmer',
          url: '#/examples/shimmer'
        },
        {
          component: require<any>('../components/VirtualizedList/VirtualizedListPage').VirtualizedListPage,
          key: 'VirtualizedList',
          name: 'VirtualizedList',
          url: '#/examples/virtualizedlist'
        },
        {
          component: require<any>('../components/StaticList/StaticListPage').StaticListPage,
          key: 'StaticList',
          name: 'StaticList',
          url: '#/examples/staticlist'
        },
        {
          component: require<any>('../components/fluent/examplePages/FluentThemePage').FluentThemePage,
          key: 'FluentColorTheme',
          name: 'Fluent Color Theme',
          url: '#/examples/fluent-color-theme'
        },
        {
          component: require<any>('../theming/ThemingPage').ThemingPage,
          key: 'ThemingPage',
          name: 'Theming',
          url: '#/examples/theming'
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

export const App = (props: IAppProps) => <AppBase appDefinition={AppDefinition} {...props} />;
