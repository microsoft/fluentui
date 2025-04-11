import { ChartDataPoint } from '../index';

export interface PieProps {
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
  data: ChartDataPoint[];
  /**
   * shape for pie.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  pie?: any;

  pieForFocusRing?: any;

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
  activeArc?: string[];

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

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: PieStyles;

  /**
   * Additional CSS class(es) to apply to the Chart.
   */
  className?: string;
}

export interface PieStyles {
  /**
   * Style set for the card header component root
   */
  root: string;

  /**
   * Style set for the inside donut string
   */
  insideDonutString: string;
}
