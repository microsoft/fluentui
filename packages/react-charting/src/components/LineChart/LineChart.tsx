import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import { ILineChartProps, ILineChartStyleProps, ILineChartStyles } from './LineChart.types';
import { LineChartBase } from './LineChart.base';
import { getStyles } from './LineChart.styles';

// Create a LineChart variant which uses these default styles and this styled subcomponent.
/**
 * Linechart component
 * {@docCategory LineChart}
 */
export const LineChart: React.FunctionComponent<ILineChartProps> = styled<
  ILineChartProps,
  ILineChartStyleProps,
  ILineChartStyles
>(LineChartBase, getStyles);
