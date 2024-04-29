import { styled } from '@fluentui/react/lib/Utilities';
import * as React from 'react';
import { ChartHoverCardBase } from './ChartHoverCard.base';
import { getChartHoverCardStyles } from './ChartHoverCard.styles';
import { IChartHoverCardStyles, IChartHoverCardStyleProps, IChartHoverCardProps } from './ChartHoverCard.types';

//  Create a ChartHoverCard variant which uses these default styles and this styled subcomponent.
export const ChartHoverCard: React.FunctionComponent<IChartHoverCardProps> = styled<
  IChartHoverCardProps,
  IChartHoverCardStyleProps,
  IChartHoverCardStyles
>(ChartHoverCardBase, getChartHoverCardStyles);
