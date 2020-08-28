import * as React from 'react';
import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { IChartHelperProps, IChartHelperStyleProps, IChartHelperStyles } from './ChartHelper.types';
import { ChartHelperBaseComponent } from './ChartHelper.base';
import { getStyles } from './ChartHelper.styles';

export const ChartHelper: React.FunctionComponent<IChartHelperProps> = styled<
  IChartHelperProps,
  IChartHelperStyleProps,
  IChartHelperStyles
>(ChartHelperBaseComponent, getStyles);
