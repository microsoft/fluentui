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
    title: 'Items and Lists',
    url: '#/controls/ios/persona',
    isCategory: true,
    pages: [
      {
        title: 'Persona',
        url: '#/controls/ios/persona',
        component: () => <LoadingComponent title="Persona" />,
        getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Controls/PersonaPage/PersonaPage').PersonaPage))
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
  }
];
