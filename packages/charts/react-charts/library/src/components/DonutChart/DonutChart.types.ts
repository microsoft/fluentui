import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { CartesianChartProps, CartesianChartStyleProps } from '../CommonComponents/index';
import { ChartProps, ChartDataPoint, Chart } from './index';
import { ChartPopoverProps } from '../CommonComponents/ChartPopover.types';
import { LegendsProps } from '../Legends/index';

/**
 * Donut Chart properties.
 * {@docCategory DonutChart}
 */
export interface DonutChartProps extends CartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data?: ChartProps;

  /**
   * inner radius for donut size
   */
  innerRadius?: number;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: DonutChartStyles;

  /**
   * props for inside donut value
   */
  valueInsideDonut?: string | number;

  /**
   * Define a custom callout renderer for a data point
   */
  onRenderCalloutPerDataPoint?: (dataPointCalloutProps: ChartDataPoint) => JSXElement | undefined;

  /**
   * Define a custom callout props override
   */
  calloutPropsPerDataPoint?: (dataPointCalloutProps: ChartDataPoint) => ChartPopoverProps;

  /**
   * props for the callout in the chart
   */
  calloutProps?: ChartPopoverProps;

  /**
   * The prop used to define the culture to localized the numbers
   */
  culture?: string;

  /**
   * Prop to show the arc labels in percentage format
   * @default false
   */
  showLabelsInPercent?: boolean;

  /**
   * Prop to hide the arc labels
   * @default true
   */
  hideLabels?: boolean;

  /**
   * Below height used for resizing of the chart
   * Wrap chart in your container and send the updated height and width to these props.
   * These values decide wheather chart re render or not. Please check examples for reference
   */
  height?: number;

  /**
   * Below width used for resizing of the chart
   * Wrap chart in your container and send the updated height and width to these props.
   * These values decide wheather chart re render or not. Please check examples for reference
   */
  width?: number;

  /**
   * this prop takes its parent as a HTML element to define the width and height of the chart
   */
  parentRef?: HTMLElement | null;

  /**
   * Additional CSS class(es) to apply to the Chart.
   */
  className?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legendsOverflowText?: any;

  /*
   * props for the legends in the chart
   */
  legendProps?: Partial<LegendsProps>;

  /** decides wether to show/hide legends
   * @defaultvalue false
   */
  hideLegend?: boolean;

  /**
   * Url that the data-viz needs to redirect to upon clicking on it
   */
  href?: string;

  /**
   * Do not show tooltips in chart
   * @default false
   */
  hideTooltip?: boolean;

  /**
   * Optional callback to access the Chart interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: React.RefObject<Chart>;

  /**
   * Prop to enable the round corners in the chart
   * @default false
   */
  roundCorners?: boolean;
}

/**
 * Donut Chart style properties
 * {@docCategory DonutChart}
 */
export interface DonutChartStyleProps extends CartesianChartStyleProps {}

/**
 * Donut Chart styles
 * {@docCategory DonutChart}
 */
export interface DonutChartStyles {
  /**
   *  Style for the root element.
   */
  root?: string;

  /**
   * Style for the chart.
   */
  chart?: string;
  /**
   * Style for the legend container.
   */
  legendContainer: string;

  /**
   * styles for axis annotation
   */
  axisAnnotation?: string;

  /**
   * Styles for the chart wrapper div
   */
  chartWrapper?: string;
}
