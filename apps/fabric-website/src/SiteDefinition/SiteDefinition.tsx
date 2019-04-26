import * as React from 'react';
import { ISiteDefinition, LoadingComponent } from '@uifabric/example-app-base/lib/index2';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { AboutPages, ControlsPages, ResourcesPages, StylesPages } from './SiteDefinition.pages/index';
import { Platforms } from '../interfaces/Platforms';

export const SiteDefinition: ISiteDefinition<Platforms> = {
  siteTitle: 'Office UI Fabric',
  siteLogoSource:
    'data:image/png;base64,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',
  customizations: FluentCustomizations,
  platforms: {
    web: {
      name: 'Web',
      icon: 'TVMonitor'
    },
    ios: {
      name: 'iOS',
      icon: 'AppleLogo-platformPicker'
    },
    android: {
      name: 'Android',
      icon: 'AndroidLogo-platformPicker'
    }
  },
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
    StylesPages,
    ControlsPages,
    ResourcesPages,
    AboutPages,
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
