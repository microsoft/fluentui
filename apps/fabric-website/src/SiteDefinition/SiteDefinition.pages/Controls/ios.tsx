import * as React from 'react';
import { INavPage, LoadingComponent } from '@uifabric/example-app-base/lib/index2';

export const controlsPagesIos: INavPage[] = [
  {
    title: 'Controls',
    url: '#/controls/ios',
    isHiddenFromMainNav: true,
    component: () => <LoadingComponent title="Controls" />,
    getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Overviews/ControlsPage/ControlsPage').ControlsPage))
  },
  {
    title: 'Basic Inputs',
    url: '#/controls/ios/button',
    isCategory: true,
    pages: [
      {
        title: 'Button',
        url: '#/controls/ios/button',
        component: () => <LoadingComponent title="Button" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/ButtonPage/ButtonPage').ButtonPage))
      }
    ]
  },
  {
    title: 'Pickers',
    url: '#/controls/ios/date-time-picker',
    isCategory: true,
    pages: [
      {
        title: 'Date & Time Picker',
        url: '#/controls/ios/date-time-picker',
        component: () => <LoadingComponent title="Date & Time Picker" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/DatePickerPage/DatePickerPage').DatePickerPage))
      }
    ]
  },
  {
    title: 'Items & Lists',
    url: '#/controls/ios/chip',
    isCategory: true,
    pages: [
      {
        title: 'Chip',
        url: '#/controls/ios/chip',
        component: () => <LoadingComponent title="Chip" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/ChipPage/ChipPage').ChipPage))
      },
      {
        title: 'ListCells',
        url: '#/controls/ios/listcells',
        component: () => <LoadingComponent title="ListCells" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/ListCellsPage/ListCellsPage').ListCellsPage))
      },
      {
        title: 'Persona',
        url: '#/controls/ios/persona',
        component: () => <LoadingComponent title="Persona" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/PersonaPage/PersonaPage').PersonaPage))
      }
    ]
  },
  {
    title: 'Commands, Menus & Navs',
    url: '#/controls/ios/pivot',
    isCategory: true,
    pages: [
      {
        title: 'Pivot',
        url: '#/controls/ios/Pivot',
        component: () => <LoadingComponent title="Pivot" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/PivotPage/PivotPage').PivotPage))
      }
    ]
  },
  {
    title: 'Progress',
    url: '#/controls/ios/progressindicator',
    isCategory: true,
    pages: [
      {
        title: 'Progress Indicator',
        url: '#/controls/ios/progressindicator',
        component: () => <LoadingComponent title="Progress Indicator" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Controls/ProgressIndicatorPage/ProgressIndicatorPage').ProgressIndicatorPage)
          )
      }
    ]
  },
  {
    title: 'Surfaces',
    url: '#/controls/ios/drawer',
    isCategory: true,
    pages: [
      {
        title: 'Drawer',
        url: '#/controls/ios/drawer',
        component: () => <LoadingComponent title="Drawer" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/DrawerPage/DrawerPage').DrawerPage))
      }
    ]
  }
];
