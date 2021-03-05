import * as React from 'react';
import { INavPage, LoadingComponent } from '@fluentui/react-docsite-components/lib/index2';

export const controlsPagesIos: INavPage[] = [
  {
    title: 'Controls',
    url: '#/controls/ios',
    isHiddenFromMainNav: true,
    component: () => <LoadingComponent title="Controls" />,
    getComponent: cb =>
      require.ensure([], require =>
        cb(require<any>('../../../pages/Overviews/ControlsPage/ControlsPage').ControlsPage),
      ),
  },
  {
    title: 'Basic Inputs',
    isCategory: true,
    pages: [
      {
        title: 'Button',
        url: '#/controls/ios/button',
        component: () => <LoadingComponent title="Button" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/ButtonPage/ButtonPage').ButtonPage)),
      },
    ],
  },
  {
    title: 'Pickers',
    isCategory: true,
    pages: [
      {
        title: 'Date & Time Picker',
        url: '#/controls/ios/date-time-picker',
        component: () => <LoadingComponent title="Date & Time Picker" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Controls/DatePickerPage/DatePickerPage').DatePickerPage),
          ),
      },
    ],
  },
  {
    title: 'Items & Lists',
    isCategory: true,
    pages: [
      {
        title: 'Avatar',
        url: '#/controls/ios/avatar',
        component: () => <LoadingComponent title="Avatar" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/AvatarPage/AvatarPage').AvatarPage)),
      },
      {
        title: 'Chip',
        url: '#/controls/ios/chip',
        component: () => <LoadingComponent title="Chip" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/ChipPage/ChipPage').ChipPage)),
      },
      {
        title: 'List Cells',
        url: '#/controls/ios/listcells',
        component: () => <LoadingComponent title="List Cells" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Controls/ListCellsPage/ListCellsPage').ListCellsPage),
          ),
      },
      {
        title: 'Persona',
        url: '#/controls/ios/persona',
        component: () => <LoadingComponent title="Persona" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Controls/PersonaPage/PersonaPage').PersonaPage),
          ),
      },
    ],
  },
  {
    title: 'Commands, Menus & Navs',
    isCategory: true,
    pages: [
      {
        title: 'Navigation Bar',
        url: '#/controls/ios/navigationbar',
        component: () => <LoadingComponent title="NavBar" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/NavBarPage/NavBarPage').NavBarPage)),
      },
      {
        title: 'Pill Button Bar',
        url: '#/controls/ios/pillbuttonbar',
        component: () => <LoadingComponent title="Pill Button Bar" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Controls/PillButtonBarPage/PillButtonBarPage').PillButtonBarPage),
          ),
      },
      {
        title: 'Pivot',
        url: '#/controls/ios/pivot',
        component: () => <LoadingComponent title="Pivot" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/PivotPage/PivotPage').PivotPage)),
      },
      {
        title: 'Popup Menu',
        url: '#/controls/ios/popupmenu',
        component: () => <LoadingComponent title="Popup Menu" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Controls/PopupMenuPage/PopupMenuPage').PopupMenuPage),
          ),
      },
      {
        title: 'Tab Bar',
        url: '#/controls/ios/tabbar',
        component: () => <LoadingComponent title="Tab Bar" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Controls/BottomNavigationPage/BottomNavigationPage').BottomNavigationPage),
          ),
      },
    ],
  },
  {
    title: 'Notification & Engagement',
    isCategory: true,
    pages: [
      {
        title: 'Message Bar',
        url: '#/controls/ios/messagebar',
        component: () => <LoadingComponent title="Message Bar" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Controls/MessageBarPage/MessageBarPage').MessageBarPage),
          ),
      },
      {
        title: 'Tooltip',
        url: '#/controls/ios/tooltip',
        component: () => <LoadingComponent title="Tooltip" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Controls/TooltipPage/TooltipPage').TooltipPage),
          ),
      },
    ],
  },
  {
    title: 'Progress',
    isCategory: true,
    pages: [
      {
        title: 'Shimmer',
        url: '#/controls/ios/shimmer',
        component: () => <LoadingComponent title="Shimmer" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Controls/ShimmerPage/ShimmerPage').ShimmerPage),
          ),
      },
      {
        title: 'Spinner',
        url: '#/controls/ios/spinner',
        component: () => <LoadingComponent title="Spinner" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Controls/SpinnerPage/SpinnerPage').SpinnerPage),
          ),
      },
    ],
  },
  {
    title: 'Surfaces',
    isCategory: true,
    pages: [
      {
        title: 'Drawer',
        url: '#/controls/ios/drawer',
        component: () => <LoadingComponent title="Drawer" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/DrawerPage/DrawerPage').DrawerPage)),
      },
    ],
  },
  {
    title: 'Utilities',
    isCategory: true,
    pages: [
      {
        title: 'Separator',
        url: '#/controls/ios/separator',
        component: () => <LoadingComponent title="Separator" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Controls/SeparatorPage/SeparatorPage').SeparatorPage),
          ),
      },
      {
        title: 'Text',
        url: '#/controls/ios/text',
        component: () => <LoadingComponent title="Text" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/TextPage/TextPage').TextPage)),
      },
    ],
  },
];
