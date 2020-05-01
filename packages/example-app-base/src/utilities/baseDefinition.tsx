import * as React from 'react';
import { LoadingComponent } from '../components/LoadingComponent/index';
import { ISiteDefinition } from './SiteDefinition.types';

export const baseDefinition: ISiteDefinition = {
  siteTitle: 'Fluent UI React',
  pages: [
    {
      title: 'Home',
      url: '#/',
      isContentFullBleed: true,
      isHomePage: true,
      component: () => <LoadingComponent title="Fluent UI React Example App Base" />,
      // tslint:disable-next-line:no-any
      // getComponent: cb => require.ensure([], require => cb(require<any>('../pages/HomePage/HomePage').HomePage))
    },
  ],
};
