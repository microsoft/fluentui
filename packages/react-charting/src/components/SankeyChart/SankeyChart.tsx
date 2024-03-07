import { styled } from '@fluentui/react/lib/Utilities';
import * as React from 'react';
import { SankeyChartBase } from './SankeyChart.base';
import { getStyles } from './SankeyChart.styles';
import { ISankeyChartProps, ISankeyChartStyleProps, ISankeyChartStyles } from './SankeyChart.types';

// Create a SankeyChart variant which uses these default styles and this styled subcomponent.
/**
 * Sankeychart component.
 * {@docCategory SankeyChart}
 */
export const SankeyChart: React.FunctionComponent<ISankeyChartProps> = styled<
  ISankeyChartProps,
  ISankeyChartStyleProps,
  ISankeyChartStyles
>(SankeyChartBase, getStyles);
