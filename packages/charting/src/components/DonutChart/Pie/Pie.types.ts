import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IChartDataPoint } from '../index';

export interface IPieProps {
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
  // tslint:disable:no-any
  pie?: any;

  hoverOnCallback?: Function;
  hoverLeaveCallback?: Function;
}

export interface IPieStyles {
  /**
   * Style set for the card header component root
   */
  root: IStyle;
}
