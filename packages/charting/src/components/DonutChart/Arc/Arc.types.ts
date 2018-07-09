import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IDataPoint } from '../DonutChart.types';

export interface IArcProps {
  /**
   * Data to render in the chart.
   */
  data?: IArc;

  /**
   * innerRadius of the chart.
   */
  innerRadius?: number;
  /**
   * outerRadius of the chart.
   */
  outerRadius?: number;
  /**
   * Color for all the lines in the chart.
   */
  // tslint:disable:no-any
  color?: any;
}

export interface IArc {
  /**
   * Data to render in the chart.
   */
  data?: IDataPoint;
  /**
   * endAngle of the Arc
   */
  endAngle?: number;
  /**
   * index of the Arc
   */
  index?: number;
  /**
   * padAngle of the Arc
   */
  padAngle?: number;
  /**
   * startAngle of the Arc
   */
  startAngle?: number;
  /**
   * value of the Arc
   */
  value?: number;
}

export interface IArcStyles {
  /**
   * Style set for the card header component root
   */
  root: IStyle;
}
