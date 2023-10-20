import { IStyle, ITheme } from '@fluentui/react/lib/Styling';
import { IChartDataPoint } from '../index';
export interface IArcProps {
  /**
   * Theme
   */
  theme: ITheme;
  /**
   * Data to render in the Arc.
   */
  data?: IArcData;

  /**
   * Data to render focused Arc
   */
  focusData?: IArcData;

  /**
   * id of the focused arc
   */
  focusedArcId?: string;
  /**
   * shape for  Arc.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  arc?: any;

  /**
   * innerRadius of the Arc.
   */
  innerRadius?: number;

  /**
   * outerRadius of the Arc.
   */
  outerRadius?: number;

  /**
   * Color for the Arc.
   */
  color: string;

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
   * string for callout id
   */
  calloutId?: string;

  /**
   * Active Arc for chart
   */
  activeArc?: string;

  /**
   * internal prop for href
   */
  href?: string;

  /**
   * props for inside donut value
   */
  valueInsideDonut?: string | number;

  /**
   * Prop to show the arc labels in percentage format
   */
  showLabelsInPercent?: boolean;

  /**
   * Prop used to define the sum of all arc values
   */
  totalValue?: number;

  /**
   * Prop to hide the arc labels
   */
  hideLabels?: boolean;
}

export interface IArcData {
  /**
   * Data to render in the chart for individual arc.
   */
  data: IChartDataPoint;
  /**
   * endAngle of the Arc
   */
  endAngle: number;
  /**
   * index of the Arc
   */
  index: number;
  /**
   * padAngle of the Arc
   */
  padAngle: number;
  /**
   * startAngle of the Arc
   */
  startAngle: number;
  /**
   * value of the Arc
   */
  value: number;
}

export interface IArcStyles {
  /**
   * Style set for the card header component root
   */
  root: IStyle;

  /**
   * styles for the focus
   */
  focusRing: IStyle;

  /**
   * Style for the arc labels
   */
  arcLabel: IStyle;
}
