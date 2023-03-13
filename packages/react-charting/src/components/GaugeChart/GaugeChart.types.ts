import { IStyle, ITheme } from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';

export interface IGaugeChartSegment {
  /** */
  size: number;

  /** */
  color?: string;

  /** */
  label?: string;
}

export interface IGaugeChartProps {
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
}

export interface IGaugeChartStyles {
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
}
