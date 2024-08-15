import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import { IAreaChartProps, IAreaChartStyleProps, IAreaChartStyles } from '../../index';
import { AreaChartBase } from '../AreaChart/AreaChart.base';
import { getStyles } from './AreaChart.styles';

// Create a AreaChart variant which uses these default styles and this styled subcomponent.
/**
 * Areachart component.
 * {@docCategory AreaChart}
 */
export const AreaChart: React.FunctionComponent<IAreaChartProps> = styled<
  IAreaChartProps,
  IAreaChartStyleProps,
  IAreaChartStyles
>(AreaChartBase, getStyles);
