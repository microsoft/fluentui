import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import { IScatterChartProps, IScatterChartStyleProps, IScatterChartStyles } from './ScatterChart.types';
import { ScatterChartBase } from './ScatterChart.base';
import { getStyles } from './ScatterChart.styles';

// Create a ScatterChart variant which uses these default styles and this styled subcomponent.
/**
 * Scatterchart component
 * {@docCategory ScatterChart}
 */
export const ScatterChart: React.FunctionComponent<IScatterChartProps> = styled<
  IScatterChartProps,
  IScatterChartStyleProps,
  IScatterChartStyles
>(ScatterChartBase, getStyles);
