import * as React from 'react';
import {
  IAreaPolarSeries,
  AxisCategoryOrder,
  AxisProps,
  AxisScaleType,
  IChart,
  ILinePolarSeries,
  IMargins,
  IScatterPolarSeries,
} from '../../types/IDataPoint';
import { ILegendsProps } from '../Legends/Legends.types';
import { ICalloutProps, IStyle, IStyleFunctionOrObject, ITheme } from '@fluentui/react';

/**
 * Configuration options for a polar axis.
 * {@docCategory PolarChart}
 */
export type PolarAxisProps = AxisProps & {
  /**
   * Values at which ticks should be placed on the axis.
   */
  tickValues?: number[] | Date[] | string[];

  /**
   * Format string for the axis ticks.
   * For numbers, see: https://d3js.org/d3-format.
   * And for dates see: https://d3js.org/d3-time-format.
   */
  tickFormat?: string;

  /**
   * Number of ticks to display on the axis.
   */
  tickCount?: number;

  /**
   * Defines the order of categories on the axis.
   * @default 'default'
   */
  categoryOrder?: AxisCategoryOrder;

  /**
   * Scale type for the axis.
   * @default 'default'
   */
  scaleType?: AxisScaleType;

  /**
   * Start value of the axis range.
   */
  rangeStart?: number | Date;

  /**
   * End value of the axis range.
   */
  rangeEnd?: number | Date;
};

/**
 * Polar Chart properties
 * {@docCategory PolarChart}
 */
export interface IPolarChartProps {
  /**
   * Data series to be rendered in the polar chart.
   */
  data: (IAreaPolarSeries | ILinePolarSeries | IScatterPolarSeries)[];

  /**
   * Width of the polar chart.
   * @default 200
   */
  width?: number;

  /**
   * Height of the polar chart.
   * @default 200
   */
  height?: number;

  /**
   * Margins around the chart area.
   */
  margins?: IMargins;

  /**
   * If true, hides the legend.
   * @default false
   */
  hideLegend?: boolean;

  /**
   * If true, hides the tooltip.
   * @default false
   */
  hideTooltip?: boolean;

  /*
   * Properties for customizing the legend.
   */
  legendProps?: Partial<ILegendsProps>;

  /**
   * Title of the chart.
   */
  chartTitle?: string;

  /**
   * Fraction of the radius to cut out from the center of the chart.
   * Accepts values in the range [0, 1].
   */
  hole?: number;

  /**
   * Shape of the polar chart.
   * @default 'circle'
   */
  shape?: 'circle' | 'polygon';

  /**
   * Direction in which the chart is drawn.
   * @default 'counterclockwise'
   */
  direction?: 'clockwise' | 'counterclockwise';

  /**
   * Configuration options for the radial axis.
   */
  radialAxis?: PolarAxisProps;

  /**
   * Configuration options for the angular axis.
   */
  angularAxis?: PolarAxisProps & {
    /**
     * Format unit for angular values.
     * @default 'degrees'
     */
    unit?: 'radians' | 'degrees';
  };

  /**
   * Optional callback to access the Chart interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: React.Ref<IChart>;

  /**
   * Locale identifier string used to format numbers and dates according to the specified culture.
   * Example: 'en-US', 'fr-FR'.
   */
  culture?: string;

  /**
   * Options for localizing date values.
   */
  dateLocalizeOptions?: Intl.DateTimeFormatOptions;

  /**
   * If true, date values are treated as UTC dates.
   * @default false
   */
  useUTC?: boolean;

  /**
   * Theme (provided through customization)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IPolarChartStyleProps, IPolarChartStyles>;

  /**
   * Props for the callout in the chart
   */
  calloutProps?: Partial<ICalloutProps>;
}

/**
 * Polar Chart style properties
 * {@docCategory PolarChart}
 */
export interface IPolarChartStyleProps {
  /**
   * Theme (provided through customization)
   */
  theme: ITheme;
}

/**
 * Polar Chart styles
 * {@docCategory PolarChart}
 */
export interface IPolarChartStyles {
  /**
   * Style for the root element.
   */
  root?: IStyle;

  /**
   * Style for the chart wrapper element.
   */
  chartWrapper?: IStyle;

  /**
   * Style for the chart element.
   */
  chart?: IStyle;

  /**
   * Style for the inner grid lines.
   */
  gridLineInner?: IStyle;

  /**
   * Style for the outer grid lines.
   */
  gridLineOuter?: IStyle;

  /**
   * Style for the tick labels.
   */
  tickLabel?: IStyle;

  /**
   * Style for the legend container.
   */
  legendContainer?: IStyle;
}
