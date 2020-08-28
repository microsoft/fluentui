import * as React from 'react';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IChildProps, ICommonChartStyleProps, ICommonChartStyles, ICommonChartProps } from '../../types/ICommonTypes';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';

export interface IChartHelperStyleProps extends ICommonChartStyleProps {
  /**
   * prop to check if the Page is in Rtl
   */
  isRtl?: boolean;
}

export interface IChartHelperStyles extends ICommonChartStyles {}

export interface IYValueHover {
  legend?: string;
  y?: number;
  color?: string;
}

export interface IChartHelperProps extends ICommonChartProps {
  /**
   * Data to render in the chart.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  points?: any;

  /**
   * Maximum and minuimum values for y axis domain
   */
  yMinMaxValues: {
    yMin: number;
    yMax: number;
  };

  /**
   * Maximum and minimum values for x axis domain
   */
  xMinMaxValues: {
    xMin: number | Date;
    xMax: number | Date;
  };

  /**
   * Legend data to render as child to wrap component
   */
  legendBars: JSX.Element;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IChartHelperStyleProps, IChartHelperStyles>;

  /**
   * Maximum value of X-axis Domain value.
   * Used for axis building.
   * If not given, will take minimun of given data.
   */
  domainXMin?: number;

  /**
   * Maximum value of Y-axis Domain value.
   * Used for axis building.
   * If not given, will take maximum of given data.
   */
  domainXMax?: number;

  /**
   * Type of x axis
   * @default false that means if prop not provided, it x axis will be considered as numberic axis.
   */
  isXAxisDateType: boolean;

  /**
   * A method to call back after wrapper base called.
   * It will pass data - xAxis, yAxis, Height and Width
   * If not given, these callback details may not be available
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getGraphData?: any;

  /**
   * This object used to give x axis tick format.
   * If not given default values will consider from given data.
   */
  tickParams?: {
    tickValues?: number[] | Date[];
    tickFormat?: string;
  };

  /**
   * Callout props used to call callout in wrapper base.
   */
  calloutProps: {
    isCalloutVisible: boolean;
    directionalHint: DirectionalHint;
    id: string;
    gapSpace: number;
    target: SVGAElement;
    YValueHover?: IYValueHover[];
    hoverXValue?: string | number | null;
    isBeakVisible?: boolean;
  };

  /**
   * Using renderProps to get data after data change in parent component
   */
  children(props: IChildProps): React.ReactNode;
}
