import * as React from 'react';
import type { TitleStyles } from '../../utilities/Common.styles';
import { Chart } from './index';

/**
 * Chart Table properties
 * {@docCategory ChartTable}
 */
export interface ChartTableProps {
  /**
   * Title styles configuration for the chart title
   */
  titleStyles?: TitleStyles;

  /**
   * 1d or 2d Array of header values.
   */
  headers: { value: string | number | boolean | null; style?: React.CSSProperties }[];

  /**
   * Array of rows. Each row corresponds to one data entry under each column.
   */
  rows: { value: string | number | boolean | null; style?: React.CSSProperties }[][];

  /**
   * Optional width for the table
   * @default '100%'
   */
  width?: string | number;

  /**
   * Optional height for the table
   * @default '650px'
   */
  height?: string | number;

  /**
   * Chart title to display above the table
   */
  chartTitle?: string;

  /**
   * Additional class name(s) to apply to the table chart
   */
  className?: string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: ChartTableStyles;

  /**
   * Optional callback to access the Chart interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: React.Ref<Chart>;
}

/**
 * Table Chart styles
 * {@docCategory ChartTable}
 */
export interface ChartTableStyles {
  root?: string | React.CSSProperties;
  table?: string;
  headerCell?: string;
  bodyCell?: string;
  chart?: string;
  chartTitle?: string;
  svgTooltip?: string;
}
