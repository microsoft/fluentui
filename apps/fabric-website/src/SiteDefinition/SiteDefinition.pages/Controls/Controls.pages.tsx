import * as React from 'react';
import { INavPage, LoadingComponent } from '@uifabric/example-app-base/lib/index2';
import { controlsPagesWeb, controlsPagesIos, controlsPagesAndroid } from './index';

export const ControlsPages: INavPage = {
  title: 'Controls',
  url: '#/controls',
  className: 'controlsPage',
  isUhfLink: true,
  hasPlatformPicker: true,
  isSearchable: true,
  component: () => <LoadingComponent title="Controls" />,
  getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Overviews/ControlsPage/ControlsPage').ControlsPage)),
  platforms: {
    web: controlsPagesWeb,
    ios: controlsPagesIos,
    android: controlsPagesAndroid
  }
};
