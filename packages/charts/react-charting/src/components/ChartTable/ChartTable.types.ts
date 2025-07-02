import * as React from 'react';
import { ITheme, IStyle } from '@fluentui/react/lib/Styling';
import { IRefObject, IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { IChart } from '../../types/index';

export interface IChartTableStyleProps {
  theme: ITheme;
  className?: string;
}

/**
 * Chart Table properties
 * {@docCategory ChartTable}
 */
export interface IChartTableProps {
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
   * Theme (provided through customization)
   */
  theme?: ITheme;

  /**
   * Additional class name(s) to apply to the table chart
   */
  className?: string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IChartTableStyleProps, IChartTableStyles>;

  /**
   * Optional callback to access the IChart interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IChart>;
}

/**
 * Table Chart styles
 * {@docCategory ChartTable}
 */
export interface IChartTableStyles {
  root?: IStyle;
  table?: IStyle;
  headerCell?: IStyle;
  bodyCell?: IStyle;
  chart?: IStyle;
}
