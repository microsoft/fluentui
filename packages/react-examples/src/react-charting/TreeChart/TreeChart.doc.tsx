import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { TreeChartThreeLayerCompactDocSiteExample } from './TreeChart.ThreeLayerCompactDocSite.Example';
import { TreeChartThreeLayerDocSiteExample } from './TreeChart.ThreeLayerDoc.Example';
// import { TreeChartThreeLayerCompactExample } from './TreeChart.ThreeLayerCompact.Example';
// import { TreeChartThreeLayerExample } from './TreeChart.ThreeLayer.Example';

const TreeChartThreeLayerCompactDocExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/TreeChart.ThreeLayerCompactDocSite.Example') as string;
const TreeChartThreeLayerDocExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/TreeChart.ThreeLayerDoc.Example') as string;
// const TreeChartThreeLayerCompactExampleCode =
//   require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/TreeChart.ThreeLayerCompact.Example.tsx') as string;
// const TreeChartThreeLayerExampleCode =
//   require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/TreeChart.ThreeLayer.Example.tsx') as string;

export const TreeChartPageProps: IDocPageProps = {
  title: 'TreeChart',
  componentName: 'TreeChart',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-charting/src/components/TreeChart',
  examples: [
    {
      title: 'TreeChart two layer',
      code: TreeChartThreeLayerCompactDocExampleCode,
      view: <TreeChartThreeLayerCompactDocSiteExample />,
    },
    {
      title: 'TreeChart three layer',
      code: TreeChartThreeLayerDocExampleCode,
      view: <TreeChartThreeLayerDocSiteExample />,
    },
    // {
    //   title: 'TreeChart three layer long variant',
    //   code: TreeChartThreeLayerLongExampleCode,
    //   view: <TreeChartThreeLayerLongExample />,
    // },
    // {
    //   title: 'TreeChart three layer compact variant',
    //   code: TreeChartThreeLayerCompactExampleCode,
    //   view: <TreeChartThreeLayerCompactExample />,
    // },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/docs/TreeChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/docs/TreeChartBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
