import { IAppDefinition } from '@fluentui/react-docsite-components';
import { AppThemes } from './AppThemes';

export const AppDefinition: IAppDefinition = {
  appTitle: 'Fluent UI React - Charting Performance',
  themes: AppThemes,
  testPages: [],
  examplePages: [
    {
      links: [
        {
          component: require<any>('../PerformanceDataSet1/LineChartPage').LineChartPage,
          key: 'LineChartperf',
          name: 'LineChartperf',
          url: '#/examples/linechartperf',
        },
      ],
    },
  ],
  headerLinks: [
    {
      name: 'Getting started',
      url: '#/',
    },
    {
      name: 'Fabric',
      url: 'https://developer.microsoft.com/en-us/fluentui',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/microsoft/fluentui/tree/master/packages/react-charting',
    },
  ],
};
