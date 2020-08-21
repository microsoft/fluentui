import * as React from 'react';
import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { ILineChartProps, ILineChartStyleProps, ILineChartStyles } from './LineChart.types';
import { LineChartBase } from './LineChart.base';
import { AreaChartBase } from '../AreaChart/AreaChart.base';
import { getStyles } from './LineChart.styles';

// Create a LineChart variant which uses these default styles and this styled subcomponent.
export const LineChart: React.FunctionComponent<ILineChartProps> = styled<
  ILineChartProps,
  ILineChartStyleProps,
  ILineChartStyles
>(LineChartBase, getStyles);

// Create a AreaChart variant which uses these default styles and this styled subcomponent.
export const AreaChart: React.FunctionComponent<ILineChartProps> = styled<
  ILineChartProps,
  ILineChartStyleProps,
  ILineChartStyles
>(AreaChartBase, getStyles);
