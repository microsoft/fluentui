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
}

export interface IGaugeChartStyleProps {
  /**
   * Theme (provided through customization.)
   */
  theme: ITheme;

  /** */
  fontSize: number;

  /** */
  width: number;

  /** */
  height: number;

  /** */
  className?: string;
}

export interface IGaugeChartStyles {
  /** */
  root: IStyle;

  /** */
  chart: IStyle;

  /**
   * Style for the min and max values
   */
  limits: IStyle;

  /**
   * Style for the chart value
   */
  chartValue: IStyle;

  /**
   * Style for the sublabel
   */
  sublabel: IStyle;

  /**
   * Style for the needle
   */
  needle: IStyle;

  /** */
  chartTitle: IStyle;

  /** */
  legendContainer: IStyle;
}
