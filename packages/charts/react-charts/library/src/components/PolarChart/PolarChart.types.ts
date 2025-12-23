import {
  CartesianChartProps,
  CartesianChartStyleProps,
  CartesianChartStyles,
} from '../CommonComponents/CartesianChart.types';
import { AreaPolarSeries, LinePolarSeries, ScatterPolarSeries } from '../../types/DataPoint';

/**
 * Polar Chart properties
 * {@docCategory PolarChart}
 */
export interface PolarChartProps extends CartesianChartProps {
  /**
   *
   */
  data: (AreaPolarSeries | LinePolarSeries | ScatterPolarSeries)[];

  /**
   *
   */
  chartTitle?: string;

  /**
   *
   */
  innerRadius?: number;

  /**
   * @default 'circle'
   */
  shape?: 'circle' | 'polygon';
}

/**
 * Polar Chart style properties
 * {@docCategory PolarChart}
 */
export interface PolarChartStyleProps extends CartesianChartStyleProps {}

/**
 * Polar Chart styles
 * {@docCategory PolarChart}
 */
export interface PolarChartStyles extends CartesianChartStyles {
  /**
   *
   */
  gridLineInner?: string;

  /**
   *
   */
  gridLineOuter?: string;

  /**
   *
   */
  tickLabel?: string;
}
