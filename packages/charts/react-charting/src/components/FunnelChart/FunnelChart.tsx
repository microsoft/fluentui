import { styled } from '@fluentui/react';
import * as React from 'react';
import { FunnelChartBase } from './FunnelChart.base';
import { getFunnelChartStyles } from './FunnelChart.styles';
import { IFunnelChartProps, IFunnelChartStyleProps, IFunnelChartStyles } from './FunnelChart.types';

/**
 * Funnelchart component.
 * {@docCategory FunnelChart}
 */
export const FunnelChart: React.FunctionComponent<IFunnelChartProps> = styled<
  IFunnelChartProps,
  IFunnelChartStyleProps,
  IFunnelChartStyles
>(FunnelChartBase, getFunnelChartStyles);
