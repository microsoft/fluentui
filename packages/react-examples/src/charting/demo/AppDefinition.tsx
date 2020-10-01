import { IAppDefinition } from '@uifabric/example-app-base';

export const AppDefinition: IAppDefinition = {
  appTitle: 'Fluent UI React - Charting',

  testPages: [],
  examplePages: [
    {
      links: [
        {
          component: require<any>('../AreaChart/AreaChartPage').AreaChart,
          key: 'AreaChart',
          name: 'AreaChart',
          url: '#/examples/areachart',
        },
        {
          component: require<any>('../LineChart/LineChartPage').LineChartPage,
          key: 'LineChart',
          name: 'LineChart',
          url: '#/examples/linechart',
        },
        {
          component: require<any>('../VerticalBarChart/VerticalBarChartPage').VerticalBarChartPage,
          key: 'VerticalBarChart',
          name: 'VerticalBarChart',
          url: '#/examples/verticalbarchart',
        },
        {
          component: require<any>('../VerticalStackedBarChart/VerticalStackedBarChartPage').VerticalBarChartPage,
          key: 'VerticalStackedBarChart',
          name: 'VerticalStackedBarChart',
          url: '#/examples/VerticalStackedBarChart',
        },
        {
          component: require<any>('../HorizontalBarChart/HorizontalBarChartPage').HorizontalBarChartPage,
          key: 'HorizontalBarChart',
          name: 'HorizontalBarChart',
          url: '#/examples/horizontalbarchart',
        },
        {
          component: require<any>('../PieChart/PieChartPage').PieChartPage,
          key: 'PieChart',
          name: 'PieChart',
          url: '#/examples/piechart',
        },
        {
          component: require<any>('../DonutChart/DonutChartPage').DonutChartPage,
          key: 'DonutChart',
          name: 'DonutChart',
          url: '#/examples/Donutchart',
        },
        {
          component: require<any>('../Legends/LegendsPage').LegendsPage,
          key: 'Legends',
          name: 'Legends',
          url: '#/examples/Legends',
        },
        {
          component: require<any>('../StackedBarChart/StackedBarChartPage').StackedBarChartPage,
          key: 'StackedBarChart',
          name: 'StackedBarChart',
          url: '#/examples/stackedbarchart',
        },
        {
          component: require<any>('../GroupedVerticalBarChart/GroupedVerticalBarChartPage').GroupedVerticalBarChart,
          key: 'GroupedVerticalBarChart',
          name: 'GroupedVerticalBarChart',
          url: '#/examples/GroupedVerticalBarChart',
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
      url: 'https://github.com/microsoft/fluentui',
    },
  ],
};
