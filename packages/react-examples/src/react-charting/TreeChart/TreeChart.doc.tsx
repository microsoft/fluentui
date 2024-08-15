import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { TreeChartThreeLayerDocSiteExample } from './TreeChart.ThreeLayerDocSite.Example';
import { TreeChartThreeLayerCompactDocSiteExample } from './TreeChart.ThreeLayerCompactDocSite.Example';

const TreeChartThreeLayerDocSiteExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/TreeChart.ThreeLayerDocSite.Example.tsx') as string;
const TreeChartThreeLayerCompactDocSiteExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/TreeChart.ThreeLayerCompactDocSite.Example.tsx') as string;

export const TreeChartPageProps: IDocPageProps = {
  title: 'TreeChart',
  componentName: 'TreeChart',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-charting/src/components/TreeChart',
  examples: [
    {
      title: 'TreeChart three layer',
      code: TreeChartThreeLayerDocSiteExampleCode,
      view: <TreeChartThreeLayerDocSiteExample />,
    },
    {
      title: 'TreeChart three layer compact',
      code: TreeChartThreeLayerCompactDocSiteExampleCode,
      view: <TreeChartThreeLayerCompactDocSiteExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/docs/TreeChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/docs/TreeChartBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/docs/TreeChartDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/docs/TreeChartDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
