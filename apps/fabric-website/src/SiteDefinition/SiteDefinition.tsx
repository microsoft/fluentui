import * as React from 'react';
import { ISiteDefinition, LoadingComponent } from '@uifabric/example-app-base/lib/index2';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { AboutPages, ControlsPages, ResourcesPages, StylesPages } from './SiteDefinition.pages/index';
import { Platforms } from '../interfaces/Platforms';
import { platforms } from './SiteDefinition.platforms';

export const SiteDefinition: ISiteDefinition<Platforms> = {
  siteTitle: 'Office UI Fabric',
  siteLogoSource: 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/microsoftuifabric-logo-rgb_no-padding.svg',
  customizations: FluentCustomizations,
  platforms,
  pages: [
    {
      title: 'Fabric',
      url: '#/',
      className: 'fabricPage',
      isHomePage: true,
      isUhfLink: true,
      isContentFullBleed: true,
      component: () => <LoadingComponent title="Welcome to Microsoft UI Fabric" />,
      getComponent: cb => require.ensure([], require => cb(require<any>('../pages/HomePage/HomePage').HomePage))
    },
    {
      title: 'Get started',
      url: '#/get-started',
      isUhfLink: true,
      hasPlatformPicker: true,
      component: () => <LoadingComponent title="Get started" />,
      getComponent: cb =>
        require.ensure([], require => cb(require<any>('../pages/Overviews/GetStartedPage/GetStartedPage').GetStartedPage)),
      platforms: {
        web: [
          {
            title: 'Get started',
            url: '#/get-started/web',
            isHiddenFromMainNav: true,
            component: () => <LoadingComponent title="Get started" />,
            getComponent: cb =>
              require.ensure([], require => cb(require<any>('../pages/Overviews/GetStartedPage/GetStartedPage').GetStartedPage))
          }
        ]
      }
    },
    StylesPages,
    ControlsPages,
    ResourcesPages,
    {
      title: 'Demo Loading Page',
      url: '#/ms-loading',
      isHiddenFromMainNav: true,
      component: () => <LoadingComponent title="Demo Loading Page" />
    },
    {
      title: 'Template Page',
      url: '#/ms-page-template',
      isHiddenFromMainNav: true,
      component: () => <LoadingComponent title="Template Page" />,
      getComponent: cb => require.ensure([], require => cb(require<any>('../pages/PageTemplates/TemplatePage/TemplatePage').TemplatePage))
    }
  ],
  redirects: {
    '#/customizations/': '#/controls/web/customizations/',
    '#/examples/announced/': '#/controls/web/announced/',
    '#/components': '#/controls/web',
    '#/components/ComboBox': '#/controls/web/combobox',
    '#/components/Calendar': '#/controls/web/calendar'
  }
};
