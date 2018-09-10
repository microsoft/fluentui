import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IChartDataPoint } from '../index';
export interface IArcProps {
  /**
   * Data to render in the Arc.
   */
  data?: IArcData;

  /**
   * shape for  Arc.
   */
  // tslint:disable:no-any
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
}
