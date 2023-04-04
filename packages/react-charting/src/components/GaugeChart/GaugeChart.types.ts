import { IStyle, ITheme } from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { ILegendsProps } from '../Legends/index';

export interface IGaugeChartSegment {
  /** */
  legend: string;

  /** */
  size: number;

  /** */
  color?: string;
}

export interface IGaugeChartProps {
  /**
   * Width of the chart
   */
  width?: number;

  /**
   * Height of the chart
   */
  height?: number;

  /** */
  chartTitle?: string;

  /** */
  currentValue: number;

  /** */
  segments?: IGaugeChartSegment[];

  /** */
  minValue?: number;

  /** */
  maxValue?: number;

  /** */
  sublabel?: string;

  /** */
  hideLimits?: boolean;

  /**
   * Decides wether to show/hide legends
   * @defaultvalue false
   */
  hideLegend?: boolean;

  /*
   * Props for the legends in the chart
   */
  legendProps?: Partial<ILegendsProps>;

  /**
   * Do not show tooltips in chart
   * @default false
   */
  hideTooltip?: boolean;

  /**
   * Additional CSS class(es) to apply to the Chart.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IGaugeChartStyleProps, IGaugeChartStyles>;

  /**
   * The prop used to define the culture to localize the numbers and date
   */
  culture?: string;
}

export interface IGaugeChartStyleProps {
  /**
   * Theme (provided through customization.)
   */
  theme: ITheme;

  /** */
  fontSize?: number;

  /** */
  width?: number;

  /** */
  height?: number;

  /** */
  className?: string;

  /**
   * color of the line
   */
  lineColor?: string;

  /**
   * boolean flag which determines if shape is drawn in callout
   */
  toDrawShape?: boolean;
}

export interface IGaugeChartStyles {
  /** */
  root?: IStyle;

  /** */
  chart?: IStyle;

  /**
   * Style for the min and max values
   */
  limits?: IStyle;

  /**
   * Style for the chart value
   */
  chartValue?: IStyle;

  /**
   * Style for the sublabel
   */
  sublabel?: IStyle;

  /**
   * Style for the needle
   */
  needle?: IStyle;

  /** */
  chartTitle?: IStyle;

  /** */
  legendContainer?: IStyle;

  /** */
  segment?: IStyle;

  /**
   * styles for callout root-content
   */
  calloutContentRoot?: IStyle;

  /**
   * styles for callout x-content
   */
  calloutContentX?: IStyle;

  /**
   * styles for callout y-content
   */
  calloutContentY?: IStyle;

  /**
   * styles for description message
   */
  descriptionMessage?: IStyle;

  /**
   * styles for callout Date time container
   */
  calloutDateTimeContainer?: IStyle;

  /**
   * styles for callout info container
   */
  calloutInfoContainer?: IStyle;

  /**
   * styles for callout block container
   */
  calloutBlockContainer?: IStyle;

  /**
   * styles for callout legend text
   */
  calloutlegendText?: IStyle;

  /**
   * styles for the shape object in the callout
   */
  shapeStyles?: IStyle;
}
