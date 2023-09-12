import { IStyle, ITheme } from '@fluentui/react/lib/Styling';
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
   * Title to apply to the whole chart.
   */
  chartTitle?: string;
  /**
   * shape for pie.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  pie?: any;

  /**
   * The prop used to define the culture to localized the numbers
   */
  culture?: string;

  theme?: ITheme;
}

export interface IPieStyles {
  /**
   * Style set for the card header component root
   */
  root: IStyle;
}
