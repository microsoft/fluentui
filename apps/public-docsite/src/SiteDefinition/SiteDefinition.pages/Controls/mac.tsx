import * as React from 'react';
import { INavPage, LoadingComponent } from '@fluentui/react-docsite-components/lib/index2';

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
        title: 'Button',
        url: '#/controls/mac/button',
        component: () => <LoadingComponent title="Button" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/ButtonPage/ButtonPage').ButtonPage)),
      },
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
  {
    title: 'Utilities',
    isCategory: true,
    pages: [
      {
        title: 'Separator',
        url: '#/controls/mac/separator',
        component: () => <LoadingComponent title="Separator" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Controls/SeparatorPage/SeparatorPage').SeparatorPage),
          ),
      },
    ],
  },
];
