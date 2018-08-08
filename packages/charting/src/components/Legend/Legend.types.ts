import { IStyle } from '@uifabric/charting/lib/Styling';

export interface ILegendDataItem {
  /**
   * Text to be displayed for legend item.
   */
  legendText: string | number;

  /**
   * Color for the specific legend
   */
  legendColor: string;
}

export interface ILegendProps {
  /**
   * Data to render in the legend.
   */
  renderData: ILegendDataItem[];
}

export interface ILegendStyles {
  /**
   * Style for the legend wrapping container
   */
  legendContainer: IStyle;

  /**
   * Style for legend text section
   */
  legendText: IStyle;
}
