import * as React from 'react';
import { ISiteDefinition, LoadingComponent } from '@uifabric/example-app-base/lib/index2';
import { ControlsPages, ResourcesPages, StylesPages, GetStartedPages } from './SiteDefinition.pages/index';
import { Platforms } from '../interfaces/Platforms';
import { platforms } from './SiteDefinition.platforms';

export const SiteDefinition: ISiteDefinition<Platforms> = {
  siteTitle: 'Fluent UI',
  siteLogoSource:
    'https://static2.sharepointonline.com/files/fabric/fabric-website/images/microsoftfluentui-logo-rgb_no-padding.svg',
  platforms,
  pages: [
    {
      title: 'Fluent UI',
      url: '#/',
      className: 'fabricPage',
      isHomePage: true,
      isUhfLink: true,
      isContentFullBleed: true,
      component: () => <LoadingComponent title="Welcome to Fluent UI" />,
      getComponent: cb => require.ensure([], require => cb(require<any>('../pages/HomePage/HomePage').HomePage)),
    },
    GetStartedPages,
    StylesPages,
    ControlsPages,
    ResourcesPages,
    {
      title: 'Demo Loading Page',
      url: '#/ms-loading',
      isHiddenFromMainNav: true,
      component: () => <LoadingComponent title="Demo Loading Page" />,
    },
    {
      title: 'Template Page',
      url: '#/ms-page-template',
      isHiddenFromMainNav: true,
      component: () => <LoadingComponent title="Template Page" />,
      getComponent: cb =>
        require.ensure([], require =>
          cb(require<any>('../pages/PageTemplates/TemplatePage/TemplatePage').TemplatePage),
        ),
    },
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
    { from: '#/controls/web/fluent-theme', to: '#/styles/web/fabric-7' },
    { from: '#/styles/web/fluent-theme', to: '#/styles/web/fabric-7' },
    { from: '#/examples', to: '#/controls/web' },
  ],
  messageBars: [
    {
      path: '#',
      text: <span>UI Fabric is evolving into Fluent UI.</span>,
      linkText: 'Learn more',
      linkUrl: 'https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/',
      sessionStoragePrefix: 'FluentUI',
    },
  ],
};
