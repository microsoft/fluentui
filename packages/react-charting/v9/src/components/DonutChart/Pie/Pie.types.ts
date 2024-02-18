import { IStyle, ITheme } from '@fluentui/react/lib/Styling';
import { IChartDataPoint } from '../index';

export interface IPieProps {
  /**
   * Theme
   */
  theme: ITheme;
  /**
   * Width of the Pie.
   */
  width: number;
  /**
   * Height of the Pie.
   */
  height: number;
  /**
   * outerRadius of the Pie.
   */
  outerRadius: number;
  /**
   * innerRadius of the Pie.
   */
  innerRadius: number;
  /**
   * Data to render in the Pie.
   */
  data: IChartDataPoint[];
  /**
   * shape for pie.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  pie?: any;
  /**
   * Defines the function that is executed upon hovering over the legend
   */
  hoverOnCallback?: Function;
  /**
   * Defines the function that is executed upon hovering over the legend
   */
  onFocusCallback?: Function;
  /**
   * Defines the function that is executed upon hovering Leave the legend
   */
  onBlurCallback?: Function;
  /**
   * Defines the function that is executed upon hovering Leave the legend
   */
  hoverLeaveCallback?: Function;
  /**
   * Uniq string for chart
   */
  uniqText?: string;
  /**
   * Active Arc for chart
   */
  activeArc?: string;

  /**
   * string for callout id
   */
  calloutId?: string;

  /**
   * internal prop for href
   */
  href?: string;

  /**
   * props for inside donut value
   */
  valueInsideDonut?: string | number;

  /**
   * id of the focused arc
   */
  focusedArcId?: string;

  /**
   * Prop to show the arc labels in percentage format
   */
  showLabelsInPercent?: boolean;

  /**
   * Prop to hide the arc labels
   */
  hideLabels?: boolean;
}

export interface IPieStyles {
  /**
   * Style set for the card header component root
   */
  root: IStyle;

  /**
   * Style set for the inside donut string
   */
  insideDonutString: IStyle;
}

export interface IPieStyleProps {
  /**
   * Theme (provided through customization.)
   */
  theme: ITheme;
}
