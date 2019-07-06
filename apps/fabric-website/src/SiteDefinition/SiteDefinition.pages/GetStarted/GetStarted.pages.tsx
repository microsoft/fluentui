import * as React from 'react';
import { INavPage, LoadingComponent } from '@uifabric/example-app-base/lib/index2';

export const GetStartedPages: INavPage = {
  title: 'Get started',
  url: '#/get-started',
  isUhfLink: true,
  hasPlatformPicker: true,
  component: () => <LoadingComponent title="Get started" />,
  getComponent: cb =>
    require.ensure([], require => cb(require<any>('../../../pages/Overviews/GetStartedPage/GetStartedPage').GetStartedPage)),
  platforms: {
    web: [
      {
        title: 'Get started',
        url: '#/get-started/web',
        isHiddenFromMainNav: true,
        component: () => <LoadingComponent title="Get started" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Overviews/GetStartedPage/GetStartedPage').GetStartedPage))
      }
    ],
    ios: [
      {
        title: 'Get started',
        url: '#/get-started/ios',
        isHiddenFromMainNav: true,
        component: () => <LoadingComponent title="Get started" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Overviews/GetStartedPage/GetStartedPage').GetStartedPage))
      }
    ],
    android: [
      {
        title: 'Get started',
        url: '#/get-started/android',
        isHiddenFromMainNav: true,
        component: () => <LoadingComponent title="Get started" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Overviews/GetStartedPage/GetStartedPage').GetStartedPage))
      }
    ]
  }
};
