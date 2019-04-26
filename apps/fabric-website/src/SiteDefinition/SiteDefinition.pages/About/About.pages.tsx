import * as React from 'react';
import { INavPage, LoadingComponent } from '@uifabric/example-app-base/lib/index2';

export const AboutPages: INavPage = {
  title: 'About',
  url: '#/about',
  isUhfLink: true,
  component: () => <LoadingComponent title="About" />,
  getComponent: cb => require.ensure([], require => cb(require<any>('../../../pages/Overviews/AboutPage/AboutPage').AboutPage))
};
