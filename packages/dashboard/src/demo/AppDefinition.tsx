// tslint:disable:no-any
import * as React from 'react';
import { App as AppBase, IAppDefinition, IAppProps } from '@uifabric/example-app-base';

export const AppDefinition: IAppDefinition = {
  appTitle: 'Fabric - React',

  testPages: [],
  examplePages: [
    {
      links: [
        {
          component: require<any>('../components/Card/CardPage').CardPage,
          key: 'DashboardCard',
          name: 'DashboardCard',
          url: '#/examples/Card'
        },
        {
          component: require<any>('../components/DashboardGridLayout/DashboardGridLayoutPage').DashboardGridLayoutPage,
          key: 'DashboardGridLayout',
          name: 'DashboardGridLayout',
          url: '#/examples/DashboardGridLayout'
        },
        {
          component: require<any>('../components/Nav/NavPage').NavPage,
          key: 'Nav',
          name: 'Nav',
          url: '#/examples/nav'
        },
        {
          component: require<any>('../components/Recommendation/RecommendationPage').RecommendationPage,
          key: 'Recommendation',
          name: 'Recommendation',
          url: '#/examples/recommendation'
        },
        {
          component: require<any>('../components/Section/SectionPage').SectionPage,
          key: 'EditSection',
          name: 'EditSection',
          url: '#/examples/section'
        },
        {
          component: require<any>('../components/MultiCount/MultiCountPage').MultiCountPage,
          key: 'MultiCount',
          name: 'MultiCount',
          url: '#/examples/multiCount'
        },
        {
          component: require<any>('../components/SetupBanner/SetupBannerPage').SetupBannerPage,
          key: 'SetupBanner',
          name: 'SetupBanner',
          url: '#/examples/setupbanner'
        },
        {
          component: require<any>('../components/DetailPanel/DetailPanelPage').DetailPanelPage,
          key: 'DetailPanel',
          name: 'DetailPanel',
          url: '#/examples/detailpanel'
        },
        {
          component: require<any>('../components/CompositeList/CompositeListPage').CompositeListPage,
          key: 'CompositeList',
          name: 'CompositeList',
          url: '#/examples/compositelist'
        },
        {
          component: require<any>('../components/SubwayNav/SubwayNavPage').SubwayNavPage,
          key: 'SubwayNav',
          name: 'SubwayNav',
          url: '#/examples/subwaynav'
        },
        {
          component: require<any>('../components/Wizard/WizardPage').WizardPage,
          key: 'Wizard',
          name: 'Wizard',
          url: '#/examples/wizard'
        }
      ]
    }
  ],
  headerLinks: [
    {
      name: 'Getting started',
      url: '#/'
    },
    {
      name: 'Fabric',
      url: 'http://dev.office.com/fabric'
    },
    {
      name: 'Github',
      url: 'http://www.github.com/officedev'
    }
  ]
};

export const App = (props: IAppProps) => <AppBase appDefinition={AppDefinition} {...props} />;
