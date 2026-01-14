import * as React from 'react';
import {
  AreaPolarSeries,
  AxisCategoryOrder,
  AxisProps,
  AxisScaleType,
  Chart,
  LinePolarSeries,
  Margins,
  ScatterPolarSeries,
} from '../../types/DataPoint';
import { LegendsProps } from '../Legends/Legends.types';

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
export interface PolarChartProps {
  /**
   * Data series to be rendered in the polar chart.
   */
  data: (AreaPolarSeries | LinePolarSeries | ScatterPolarSeries)[];

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
  margins?: Margins;

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
  legendProps?: Partial<LegendsProps>;

  /**
   * Style properties for the polar chart.
   */
  styles?: PolarChartStyles;

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
  componentRef?: React.Ref<Chart>;

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
}

/**
 * Polar Chart style properties
 * {@docCategory PolarChart}
 */
export interface PolarChartStyleProps {}

/**
 * Polar Chart styles
 * {@docCategory PolarChart}
 */
export interface PolarChartStyles {
  /**
   * Style for the root element.
   */
  root?: string;

  /**
   * Style for the chart wrapper element.
   */
  chartWrapper?: string;

  /**
   * Style for the chart element.
   */
  chart?: string;

  /**
   * Style for the inner grid lines.
   */
  gridLineInner?: string;

  /**
   * Style for the outer grid lines.
   */
  gridLineOuter?: string;

  /**
   * Style for the tick labels.
   */
  tickLabel?: string;

  /**
   * Style for the legend container.
   */
  legendContainer?: string;
}
