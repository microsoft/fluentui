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
