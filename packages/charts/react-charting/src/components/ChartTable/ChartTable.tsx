import * as React from 'react';
import { styled } from '@fluentui/react/lib/Utilities';
import { IChartTableProps, IChartTableStyleProps, IChartTableStyles } from '../../index';
import { ChartTableBase } from './ChartTable.base';
import { getStyles } from './ChartTable.styles';

/**
 * ChartTable component
 * {@docCategory ChartTable}
 */
export const ChartTable: React.FunctionComponent<IChartTableProps> = styled<
  IChartTableProps,
  IChartTableStyleProps,
  IChartTableStyles
>(ChartTableBase, getStyles);
