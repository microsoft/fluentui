import { IRenderFunction } from '@fluentui/react/lib/Utilities';
import {
  IChartProps,
  ILineChartPoints,
  IMargins,
  IBasestate,
  IRefArrayData,
  ICustomizedCalloutData,
} from '../../types/index';
import {
  ICartesianChartProps,
  ICartesianChartStyleProps,
  ICartesianChartStyles,
  IChildProps,
} from '../CommonComponents/index';
import { IStyle } from '@fluentui/react';

export type { IChildProps, ILineChartPoints, IMargins, IBasestate, IRefArrayData };

/**
 * Line Chart properties
 * {@docCategory LineChart}
 */
export interface IScatterChartProps extends ICartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data: IChartProps;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IScatterChartStyles;

  /**
   * Define a custom callout renderer for a data point
   */
  onRenderCalloutPerDataPoint?: IRenderFunction<ICustomizedCalloutData>;

  /**
   * Define a custom callout renderer for a stack; default is to render per data point
   */
  onRenderCalloutPerStack?: IRenderFunction<ICustomizedCalloutData>;

  /**
   * Callback for getting callout description message
   */
  getCalloutDescriptionMessage?: (calloutDataProps: ICustomizedCalloutData) => string | undefined;

  /**
   * The prop used to define the culture to localized the numbers
   */
  culture?: string;
}

/**
 * Scatter Chart styles
 * {@docCategory ScatterChart}
 */
export interface IScatterChartStyles extends ICartesianChartStyles {
  /**
   * Style for the marker label
   */
  markerLabel?: IStyle;
}

/**
 * Scatter Chart style properties
 * {@docCategory ScatterChart}
 */
export interface IScatterChartStyleProps extends ICartesianChartStyleProps {}
