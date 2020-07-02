import * as React from 'react';
import { INavPage, LoadingComponent } from '@uifabric/example-app-base/lib/index2';

export const controlsPagesMac: INavPage[] = [
  {
    title: 'Controls',
    url: '#/controls/mac',
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
        title: 'Link',
        url: '#/controls/mac/link',
        component: () => <LoadingComponent title="Link" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/LinkPage/LinkPage').LinkPage)),
      },
    ],
  },
  {
    title: 'Pickers',
    isCategory: true,
    pages: [
      {
        title: 'Date Picker',
        url: '#/controls/mac/date-picker',
        component: () => <LoadingComponent title="Date Picker" />,
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
        url: '#/controls/mac/avatar',
        component: () => <LoadingComponent title="Avatar" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/AvatarPage/AvatarPage').AvatarPage)),
      },
    ],
  },
];
