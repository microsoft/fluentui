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
   * Data to render in the Pie.
   */
  data: IDataPoint[];
  /**
   * colors to render in the Pie.
   */
  colors?: string[];
  /**
   * shape for pie.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  pie?: any;
}

export interface IPieStyles {
  /**
   * Style set for the card header component root
   */
  root: IStyle;
}
