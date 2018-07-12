import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IDataPoint } from '../PieChart.types';

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
   * Data to render in the Chart.
   */
  data: IDataPoint[];
  /**
   * colors to render in the Chart.
   */
  colors?: string[];
}

export interface IPieStyles {
  /**
   * Style set for the card header component root
   */
  root: IStyle;
}
