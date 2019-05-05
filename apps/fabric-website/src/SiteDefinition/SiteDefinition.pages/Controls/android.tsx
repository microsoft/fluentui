import * as React from 'react';
import { INavPage, LoadingComponent } from '@uifabric/example-app-base/lib/index2';

export const controlsPagesAndroid: INavPage[] = [
  {
    title: 'Controls',
    url: '#/controls/android',
    isHiddenFromMainNav: true,
    component: () => <LoadingComponent title="Controls" />,
    getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Overviews/ControlsPage/ControlsPage').ControlsPage))
  },
  {
    title: 'Pickers',
    url: '#/controls/android/date-time-picker',
    isCategory: true,
    pages: [
      {
        title: 'Date & Time Picker',
        url: '#/controls/android/date-time-picker',
        component: () => <LoadingComponent title="Date & Time Picker" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/DatePickerPage/DatePickerPage').DatePickerPage))
      }
    ]
  },
  {
    title: 'Items & Lists',
    url: '#/controls/android/chip',
    isCategory: true,
    pages: [
      {
        title: 'Chip',
        url: '#/controls/android/chip',
        component: () => <LoadingComponent title="Chip" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/ChipPage/ChipPage').ChipPage))
      },
      {
        title: 'Persona',
        url: '#/controls/android/persona',
        component: () => <LoadingComponent title="Persona" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/PersonaPage/PersonaPage').PersonaPage))
      }
    ]
  },
  {
    title: 'Commands, Menus & Navs',
    url: '#/controls/android/pivot',
    isCategory: true,
    pages: [
      {
        title: 'Pivot',
        url: '#/controls/android/Pivot',
        component: () => <LoadingComponent title="Pivot" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/PivotPage/PivotPage').PivotPage))
      }
    ]
  },
  {
    title: 'Surfaces',
    url: '#/controls/android/drawer',
    isCategory: true,
    pages: [
      {
        title: 'Drawer',
        url: '#/controls/android/drawer',
        component: () => <LoadingComponent title="Drawer" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/DrawerPage/DrawerPage').DrawerPage))
      },
      {
        title: 'Tooltip',
        url: '#/controls/android/tooltip',
        component: () => <LoadingComponent title="Tooltip" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/TooltipPage/TooltipPage').TooltipPage))
      }
    ]
  }
];
