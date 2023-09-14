import * as React from 'react';
import { INavPage, LoadingComponent } from '@fluentui/react-docsite-components/lib/index2';

export const GetStartedPages: INavPage = {
  title: 'Get started',
  url: '#/get-started',
  isUhfLink: true,
  hasPlatformPicker: true,
  component: () => <LoadingComponent title="Get started" />,
  getComponent: cb =>
    require.ensure([], require =>
      cb(require<any>('../../../pages/Overviews/GetStartedPage/GetStartedPage').GetStartedPage),
    ),
  platforms: {
    web: [
      {
        title: 'Get started',
        url: '#/get-started/web',
        isHiddenFromMainNav: true,
        component: () => <LoadingComponent title="Get started" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Overviews/GetStartedPage/GetStartedPage').GetStartedPage),
          ),
      },
    ],
    webcomponents: [
      {
        title: 'Get started',
        url: '#/get-started/webcomponents',
        isHiddenFromMainNav: true,
        component: () => <LoadingComponent title="Get started" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Overviews/GetStartedPage/GetStartedPage').GetStartedPage),
          ),
      },
    ],
    ios: [
      {
        title: 'Get started',
        url: '#/get-started/ios',
        isHiddenFromMainNav: true,
        component: () => <LoadingComponent title="Get started" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Overviews/GetStartedPage/GetStartedPage').GetStartedPage),
          ),
      },
    ],
    android: [
      {
        title: 'Get started',
        url: '#/get-started/android',
        isHiddenFromMainNav: true,
        component: () => <LoadingComponent title="Get started" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Overviews/GetStartedPage/GetStartedPage').GetStartedPage),
          ),
      },
    ],
    mac: [
      {
        title: 'Get started',
        url: '#/get-started/mac',
        isHiddenFromMainNav: true,
        component: () => <LoadingComponent title="Get started" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Overviews/GetStartedPage/GetStartedPage').GetStartedPage),
          ),
      },
    ],
    windows: [
      {
        title: 'Get started',
        url: '#/get-started/windows',
        isHiddenFromMainNav: true,
        component: () => <LoadingComponent title="Get started" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Overviews/GetStartedPage/GetStartedPage').GetStartedPage),
          ),
      },
    ],
    cross: [
      {
        title: 'Get started',
        url: '#/get-started/cross',
        isHiddenFromMainNav: true,
        component: () => <LoadingComponent title="Get started" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Overviews/GetStartedPage/GetStartedPage').GetStartedPage),
          ),
      },
    ],
  },
};
