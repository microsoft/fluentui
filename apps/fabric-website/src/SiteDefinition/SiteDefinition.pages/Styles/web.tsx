import * as React from 'react';
import { INavPage, LoadingComponent } from '@uifabric/example-app-base/lib/index2';

export const stylesPagesWeb: INavPage[] = [
  {
    title: 'Styles',
    url: '#/styles/web',
    isHiddenFromMainNav: true,
    component: () => <LoadingComponent title="Styles" />,
    getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Overviews/StylesPage/StylesPage').StylesPage))
  },
  {
    title: 'Colors',
    url: '#/styles/web/colors',
    isCategory: true,
    pages: [
      {
        title: 'Products',
        url: '#/styles/web/colors/products',
        component: () => <LoadingComponent title="Products" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Styles/Colors/ProductsPage').ColorsProductsPage))
      },
      {
        title: 'Neutrals',
        url: '#/styles/web/colors/neutrals',
        component: () => <LoadingComponent title="Neutrals" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Styles/Colors/NeutralsPage').ColorsNeutralsPage))
      },
      {
        title: 'Shared',
        url: '#/styles/web/colors/shared',
        component: () => <LoadingComponent title="Shared" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Styles/Colors/SharedPage').ColorsSharedPage))
      },
      {
        title: 'Personas & Groups',
        url: '#/styles/web/colors/personas',
        component: () => <LoadingComponent title="Personas & Groups" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Styles/Colors/PersonasPage').ColorsPersonasPage))
      },
      {
        title: 'Presence',
        url: '#/styles/web/colors/presence',
        component: () => <LoadingComponent title="Presence" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Styles/Colors/PresencePage').ColorsPresencePage))
      },
      {
        title: 'Messaging',
        url: '#/styles/web/colors/messaging',
        component: () => <LoadingComponent title="Messaging" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Styles/Colors/MessagingPage').ColorsMessagingPage))
      }
    ]
  },
  {
    title: 'Elevation',
    url: '#/styles/web/elevation',
    component: () => <LoadingComponent title="Elevation" />,
    getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Styles/ElevationPage/ElevationPage').ElevationPage))
  },
  {
    title: 'Iconography',
    url: '#/styles/web/icons',
    isCategory: true,
    // @TODO: Like with GetStarted page, IconsPage makes a require call
    // with a relative path to its office-ui-fabric-core node_modules
    // dependency. Because of the different folder structure in this project,
    // the path fails to resolve. That page will need to be updated wi
    // Alternatively, we may wish to maintain a local copy of this page anyway.
    pages: [
      {
        title: 'Fabric Icons',
        url: '#/styles/web/icons',
        component: () => <LoadingComponent title="Fabric Icons" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Styles/FabricIconsPage/FabricIconsPage').FabricIconsPage))
      },
      // {
      //   title: 'Office Icons',
      //   url: '#/styles/web/office-icons',
      //   component: () => <LoadingComponent title="Office Icons" />
      //   getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Styles/IconsPage/IconsPage').IconsPage))
      // },
      {
        title: 'Office Brand Icons',
        url: '#/styles/web/office-brand-icons',
        component: () => <LoadingComponent title="Office Brand Icons" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Styles/OfficeBrandIconsPage/OfficeBrandIconsPage').OfficeBrandIconsPage)
          )
      }
    ]
  },
  {
    title: 'Layout',
    url: '#/styles/web/layout',
    component: () => <LoadingComponent title="Layout" />,
    getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Styles/LayoutPage/LayoutPage').LayoutPage))
  },
  {
    title: 'Motion',
    url: '#/styles/web/motion',
    component: () => <LoadingComponent title="Motion" />,
    getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Styles/MotionPage/MotionPage').MotionPage))
  },
  {
    title: 'Typography',
    url: '#/styles/web/typography',
    component: () => <LoadingComponent title="Typography" />,
    getComponent: cb =>
      require.ensure([], require => cb(require<any>('../../../pages/Styles/TypographyPage/TypographyPage').TypographyPage))
  },
  {
    title: 'Localization',
    url: '#/styles/web/localization',
    component: () => <LoadingComponent title="Localization" />,
    getComponent: cb =>
      require.ensure([], require => cb(require<any>('../../../pages/Styles/LocalizationPage/LocalizationPage').LocalizationPage))
  }
];
