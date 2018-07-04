import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IDataPoint } from '../DonutChart.types';

export interface IPieProps {
  /**
   * Width of the chart.
   */
  width: number;
  /**
   * Height of the chart.
   */
  height: number;
  /**
   * outerRadius of the chart.
   */
  outerRadius: number;
  /**
   * innerRadius of the chart.
   */
  innerRadius: number;
  /**
   * Data to render in the chart.
   */
  data: IDataPoint[];
  /**
   * colors to render in the chart.
   */
  colors?: string[];
}

export interface IPieStyles {
  /**
   * Style set for the card header component root
   */
  root: IStyle;
}
