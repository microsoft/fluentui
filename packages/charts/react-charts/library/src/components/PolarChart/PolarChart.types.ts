import {
  CartesianChartProps,
  CartesianChartStyleProps,
  CartesianChartStyles,
} from '../CommonComponents/CartesianChart.types';
import { AreaSeries, LineSeries, ScatterSeries } from '../../types/DataPoint';

/**
 * Polar Chart properties
 * {@docCategory PolarChart}
 */
export interface PolarChartProps extends CartesianChartProps {
  /**
   *
   */
  data:
    | AreaSeries<string | number | Date, string | number | Date>[]
    | LineSeries<string | number | Date, string | number | Date>[]
    | ScatterSeries<string | number | Date, string | number | Date>[];

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
export interface PolarChartStyles extends CartesianChartStyles {}
