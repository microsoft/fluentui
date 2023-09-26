import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { TreeChartTwoLayerExample } from './TreeChart.TwoLayer.Example';
import { TreeChartThreeLayerLongExample } from './TreeChart.ThreeLayerLong.Example';
import { TreeChartThreeLayerCompactExample } from './TreeChart.ThreeLayerCompact.Example';
import { TreeChartThreeLayerExample } from './TreeChart.ThreeLayer.Example';
import { TreeChartThreeLayerCompactDocSiteExample } from './TreeChart.ThreeLayerCompactDocSite.Example';
import { TreeChartThreeLayerDocSiteExample } from './TreeChart.ThreeLayerDocSite.Example';


const TreeChartTwoLayerExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/TreeChart.TwoLayer.Example.tsx') as string;
const TreeChartThreeLayerLongExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/TreeChart.ThreeLayerLong.Example.tsx') as string;
const TreeChartThreeLayerCompactExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/TreeChart.ThreeLayerCompact.Example.tsx') as string;
const TreeChartThreeLayerExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/TreeChart.ThreeLayer.Example.tsx') as string;
  const TreeChartThreeLayerCompactDocSiteExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/TreeChart.ThreeLayerCompactDocSite.Example') as string;
  const TreeChartThreeLayerDocSiteExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/TreeChart.ThreeLayerDocSite.Example') as string;

export const TreeChartPageProps: IDocPageProps = {
  title: 'TreeChart',
  componentName: 'TreeChart',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-charting/src/components/TreeChart',
  examples: [
    {
      title: 'TreeChart two layer',
      code: TreeChartTwoLayerExampleCode,
      view: <TreeChartTwoLayerExample />,
    },
    {
      title: 'TreeChart three layer',
      code: TreeChartThreeLayerExampleCode,
      view: <TreeChartThreeLayerExample />,
    },
    {
      title: 'TreeChart three layer long variant',
      code: TreeChartThreeLayerLongExampleCode,
      view: <TreeChartThreeLayerLongExample />,
    },
    {
      title: 'TreeChart three layer compact variant',
      code: TreeChartThreeLayerCompactExampleCode,
      view: <TreeChartThreeLayerCompactExample />,
    },
    {
      title: 'TreeChart three layer doc site variant',
      code: TreeChartThreeLayerDocSiteExampleCode,
      view: <TreeChartThreeLayerDocSiteExample />,
    },
    {
      title: 'TreeChart three layer  compact doc site variant',
      code: TreeChartThreeLayerCompactDocSiteExampleCode,
      view: <TreeChartThreeLayerCompactDocSiteExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/docs/TreeChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/TreeChart/docs/TreeChartBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
