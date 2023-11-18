import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import { ISankeyChartProps, ISankeyChartStyleProps, ISankeyChartStyles } from './SankeyChart.types';
import { SankeyChartBase } from './SankeyChart.base';
import { getStyles } from './SankeyChart.styles';

// Create a SankeyChart variant which uses these default styles and this styled subcomponent.
/**
 * Sankeychart component
 * {@docCategory SankeyChart}
 */
export const SankeyChart: React.FunctionComponent<ISankeyChartProps> = styled<
  ISankeyChartProps,
  ISankeyChartStyleProps,
  ISankeyChartStyles
>(SankeyChartBase, getStyles);
