import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import { IPieChartProps, IPieChartStyleProps, IPieChartStyles } from './PieChart.types';
import { PieChartBase } from './PieChart.base';
import { getStyles } from './PieChart.styles';

// Create a PieChart variant which uses these default styles and this styled subcomponent.
/**
 * Piechart component
 * {@docCategory PieChart}
 */
export const PieChart: React.FunctionComponent<IPieChartProps> = styled<
  IPieChartProps,
  IPieChartStyleProps,
  IPieChartStyles
>(PieChartBase, getStyles);
