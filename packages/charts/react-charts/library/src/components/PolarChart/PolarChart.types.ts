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

export type PolarAxisProps = AxisProps & {
  /**
   *
   */
  tickValues?: number[] | Date[] | string[];

  /**
   *
   */
  tickFormat?: string;

  /**
   *
   */
  tickCount?: number;

  /**
   *
   */
  title?: string;

  /**
   * @default 'default'
   */
  categoryOrder?: AxisCategoryOrder;

  /**
   * @default 'default'
   */
  scaleType?: AxisScaleType;

  /**
   *
   */
  rangeStart?: number | Date;

  /**
   *
   */
  rangeEnd?: number | Date;
};

/**
 * Polar Chart properties
 * {@docCategory PolarChart}
 */
export interface PolarChartProps {
  /**
   *
   */
  data: (AreaPolarSeries | LinePolarSeries | ScatterPolarSeries)[];

  /**
   *
   */
  width?: number;

  /**
   *
   */
  height?: number;

  /**
   *
   */
  margins?: Margins;

  /**
   * @default false
   */
  hideLegend?: boolean;

  /**
   * @default false
   */
  hideTooltip?: boolean;

  /*
   *
   */
  legendProps?: Partial<LegendsProps>;

  /**
   *
   */
  styles?: PolarChartStyles;

  /**
   *
   */
  chartTitle?: string;

  /**
   *
   */
  hole?: number;

  /**
   * @default 'circle'
   */
  shape?: 'circle' | 'polygon';

  /**
   * @default 'counterclockwise'
   */
  direction?: 'clockwise' | 'counterclockwise';

  /**
   *
   */
  radialAxis?: PolarAxisProps;

  /**
   *
   */
  angularAxis?: PolarAxisProps & {
    /**
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
   *
   */
  culture?: string;

  /**
   *
   */
  dateLocalizeOptions?: Intl.DateTimeFormatOptions;

  /**
   * @default true
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
   *
   */
  root?: string;

  /**
   *
   */
  chartWrapper?: string;

  /**
   *
   */
  chart?: string;

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
