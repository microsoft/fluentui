import { IStyle } from '@fluentui/react/lib/Styling';
import { IDataPoint } from '../PieChart.types';

export interface IArcProps {
  /**
   * Data to render in the Arc.
   */
  data?: IArcData;

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
}

export interface IArcData {
  /**
   * Data to render in the chart for individual arc.
   */
  data: IDataPoint;
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
