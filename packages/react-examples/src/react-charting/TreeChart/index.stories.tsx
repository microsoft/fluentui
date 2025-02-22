import * as React from 'react';

import { TreeChartThreeLayerExample } from './TreeChart.ThreeLayer.Example';
import { TreeChartThreeLayerCompactExample } from './TreeChart.ThreeLayerCompact.Example';
import { TreeChartThreeLayerCompactDocSiteExample } from './TreeChart.ThreeLayerCompactDocSite.Example';
import { TreeChartThreeLayerDocSiteExample } from './TreeChart.ThreeLayerDocSite.Example';
import { TreeChartThreeLayerLongExample } from './TreeChart.ThreeLayerLong.Example';
import { TreeChartTwoLayerExample } from './TreeChart.TwoLayer.Example';

export const ThreeLayer = () => <TreeChartThreeLayerExample />;

export const ThreeLayerCompact = () => <TreeChartThreeLayerCompactExample />;

export const ThreeLayerCompactDocSite = () => <TreeChartThreeLayerCompactDocSiteExample />;

export const ThreeLayerDocSite = () => <TreeChartThreeLayerDocSiteExample />;

export const ThreeLayerLong = () => <TreeChartThreeLayerLongExample />;

export const TwoLayer = () => <TreeChartTwoLayerExample />;

export default {
  title: 'Components/TreeChart',
};
