import * as React from 'react';
import { INavPage, LoadingComponent } from '@fluentui/react-docsite-components/lib/index2';

export const stylesPagesWeb: INavPage[] = [
  {
    title: 'Styles',
    url: '#/styles/web',
    isHiddenFromMainNav: true,
    component: () => <LoadingComponent title="Styles" />,
    getComponent: cb =>
      require.ensure([], require => cb(require<any>('../../../pages/Overviews/StylesPage/StylesPage').StylesPage)),
  },
  {
    title: 'Colors',
    isCategory: true,
    pages: [
      {
        // workaround to show the Products page if someone goes directly to #/styles/web/colors
        title: 'Colors',
        url: '#/styles/web/colors',
        isHiddenFromMainNav: true,
        component: () => <LoadingComponent title="Products" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Styles/ThemeSlotsPage/ThemeSlotsPage').ThemeSlotsPage),
          ),
      },
      {
        title: 'Products',
        url: '#/styles/web/colors/products',
        component: () => <LoadingComponent title="Products" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Styles/Colors/ProductsPage').ColorsProductsPage),
          ),
      },
      {
        title: 'Neutrals',
        url: '#/styles/web/colors/neutrals',
        component: () => <LoadingComponent title="Neutrals" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Styles/Colors/NeutralsPage').ColorsNeutralsPage),
          ),
      },
      {
        title: 'Shared',
        url: '#/styles/web/colors/shared',
        component: () => <LoadingComponent title="Shared" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Styles/Colors/SharedPage').ColorsSharedPage)),
      },
      {
        title: 'Personas & Groups',
        url: '#/styles/web/colors/personas',
        component: () => <LoadingComponent title="Personas & Groups" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Styles/Colors/PersonasPage').ColorsPersonasPage),
          ),
      },
      {
        title: 'Presence',
        url: '#/styles/web/colors/presence',
        component: () => <LoadingComponent title="Presence" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Styles/Colors/PresencePage').ColorsPresencePage),
          ),
      },
      {
        title: 'Messaging',
        url: '#/styles/web/colors/messaging',
        component: () => <LoadingComponent title="Messaging" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Styles/Colors/MessagingPage').ColorsMessagingPage),
          ),
      },
      {
        title: 'Theme Slots',
        url: '#/styles/web/colors/theme-slots',
        component: () => <LoadingComponent title="Theme Slots" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Styles/ThemeSlotsPage/ThemeSlotsPage').ThemeSlotsPage),
          ),
      },
    ],
  },
  {
    title: 'Elevation',
    url: '#/styles/web/elevation',
    component: () => <LoadingComponent title="Elevation" />,
    getComponent: cb =>
      require.ensure([], require =>
        cb(require<any>('../../../pages/Styles/ElevationPage/ElevationPage').ElevationPage),
      ),
  },
  {
    title: 'Iconography',
    isCategory: true,
    // @TODO: Like with GetStarted page, IconsPage makes a require call
    // with a relative path to its office-ui-fabric-core node_modules
    // dependency. Because of the different folder structure in this project,
    // the path fails to resolve. That page will need to be updated wi
    // Alternatively, we may wish to maintain a local copy of this page anyway.
    pages: [
      {
        title: 'Fluent UI Icons',
        url: '#/styles/web/icons',
        component: () => <LoadingComponent title="Fluent UI Icons" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Styles/FabricIconsPage/FabricIconsPage').FabricIconsPage),
          ),
      },
      // {
      //   title: 'Office Icons',
      //   url: '#/styles/web/office-icons',
      //   component: () => <LoadingComponent title="Office Icons" />
      //   getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Styles/IconsPage/IconsPage').IconsPage))
      // },
      {
        title: 'M365 Product Icons',
        url: '#/styles/web/m365-product-icons',
        component: () => <LoadingComponent title="M365 Product Icons" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Styles/M365ProductIconsPage/M365ProductIconsPage').M365ProductIconsPage),
          ),
      },
      {
        title: 'File Type Icons',
        url: '#/styles/web/file-type-icons',
        component: () => <LoadingComponent title="File Type Icons" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Styles/FileTypeIconsPage/FileTypeIconsPage').FileTypeIconsPage),
          ),
      },
    ],
  },
  {
    title: 'Layout',
    url: '#/styles/web/layout',
    component: () => <LoadingComponent title="Layout" />,
    getComponent: cb =>
      require.ensure([], require => cb(require<any>('../../../pages/Styles/LayoutPage/LayoutPage').LayoutPage)),
  },
  {
    title: 'Motion',
    url: '#/styles/web/motion',
    component: () => <LoadingComponent title="Motion" />,
    getComponent: cb =>
      require.ensure([], require => cb(require<any>('../../../pages/Styles/MotionPage/MotionPage').MotionPage)),
  },
  {
    title: 'Typography',
    url: '#/styles/web/typography',
    component: () => <LoadingComponent title="Typography" />,
    getComponent: cb =>
      require.ensure([], require =>
        cb(require<any>('../../../pages/Styles/TypographyPage/TypographyPage').TypographyPage),
      ),
  },
  {
    title: 'Localization',
    url: '#/styles/web/localization',
    component: () => <LoadingComponent title="Localization" />,
    getComponent: cb =>
      require.ensure([], require =>
        cb(require<any>('../../../pages/Styles/LocalizationPage/LocalizationPage').LocalizationPage),
      ),
  },
  {
    title: 'Theme Designer',
    url: 'https://aka.ms/themedesigner',
    isExternal: true,
  },
];
