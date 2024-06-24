import * as React from 'react';
import { styled } from '../../Utilities';
import { IDonutChartProps, IDonutChartStyleProps, IDonutChartStyles } from './DonutChart.types';
import { DonutChartV9Base } from './DonutChartV9.base';
import { getStyles } from './DonutChart.styles';

// Create a DonutChart variant which uses these default styles and this styled subcomponent.
/**
 * Donutchart component.
 * {@docCategory DonutChart}
 */
export const DonutChartV9: React.FunctionComponent<IDonutChartProps> = styled<
  IDonutChartProps,
  IDonutChartStyleProps,
  IDonutChartStyles
>(DonutChartV9Base, getStyles);
