import * as React from 'react';
import { LoadingComponent } from '../components/LoadingComponent/index';
import { ISiteDefinition } from './SiteDefinition.types';

export const baseDefinition: ISiteDefinition = {
  siteTitle: 'UI Fabric',
  pages: [
    {
      title: 'Home',
      url: '#/',
      isContentFullBleed: true,
      isHomePage: true,
      component: () => <LoadingComponent title="UI Fabric App Base" />
      // tslint:disable-next-line:no-any
      // getComponent: cb => require.ensure([], require => cb(require<any>('../pages/HomePage/HomePage').HomePage))
    }
  ]
};
