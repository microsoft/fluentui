import * as React from 'react';
import { ISiteDefinition, LoadingComponent } from '@uifabric/example-app-base/lib/index2';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { ControlsPages, ResourcesPages, StylesPages, GetStartedPages } from './SiteDefinition.pages/index';
import { Platforms } from '../interfaces/Platforms';
import { platforms } from './SiteDefinition.platforms';
import { SiteGlobals } from '@fluentui/public-docsite-setup';

declare const window: Window & SiteGlobals;

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
      component: () => <LoadingComponent title="Welcome to UI Fabric" />,
      getComponent: cb => require.ensure([], require => cb(require<any>('../pages/HomePage/HomePage').HomePage))
    },
    GetStartedPages,
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
  redirects: [
    { from: '#/customizations/', to: '#/controls/web/customizations/' },
    { from: '#/examples/announced/', to: '#/controls/web/announced/' },
    { from: '#/components/ComboBox', to: '#/controls/web/combobox' },
    { from: '#/components/Calendar', to: '#/controls/web/calendar' },
    { from: '#/components', to: '#/controls/web' },
    { from: '#/styles/animation', to: '#/styles/web/motion' },
    { from: '#/styles/brand-icons', to: '#/styles/web/office-brand-icons' },
    { from: '#/styles/colors', to: '#/styles/web/colors/theme-slots' },
    { from: '#/styles/icons', to: '#/styles/web/icons' },
    { from: '#/styles/layout', to: '#/styles/web/layout' },
    { from: '#/styles/localization', to: '#/styles/web/localization' },
    { from: '#/styles/themegenerator', to: '#/styles/web' },
    { from: '#/styles/typography', to: '#/styles/web/typography' },
    { from: '#/styles/utilities', to: '#/styles/web' },
    { from: '#/controls/web/fluent-theme', to: '#/styles/web/fluent-theme' },
    { from: '#/examples', to: '#/controls/web' }
  ],
  // This is defined by loadSite() from @fluentui/public-docsite-setup
  versionSwitcherDefinition: window.__versionSwitcherDefinition
};
