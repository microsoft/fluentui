import { IStyle } from '@uifabric/charting/lib/Styling';
import { ILegendDataItem } from '../../types/ILegendDataItem';

export { ILegendDataItem } from '../../types/ILegendDataItem';

export interface ILegendProps {
  /**
   * Data to render in the legend.
   */
  renderData: ILegendDataItem[];

  maxTextWidth?: number;
}

export interface ILegendStyles {
  root: IStyle;
  /**
   * Style for the legend wrapping container
   */
  legendContainer: IStyle;

  /**
   * Style for legend text section
   */
  legendText: IStyle;
}
