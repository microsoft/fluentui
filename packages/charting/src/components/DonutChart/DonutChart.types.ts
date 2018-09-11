import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';

export interface IDonutChart {}
import { IChartProps } from './index';

export interface IDonutChartProps {
  /**
   * Data to render in the chart.
   */
  data?: IChartProps;

  /**
   * Width of the donut.
   */
  width?: number;

  /**
   * Height of the donut.
   */
  height?: number;

  /**
   * Additional CSS class(es) to apply to the DonutChart.
   */
  className?: string;

  /**
   * inner radius for donut size
   */
  innerRadius?: number;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IDonutChartStyleProps, IDonutChartStyles>;

  /**
   * Width of line stroke
   */
  strokeWidth?: number;
}

export interface IDonutChartStyleProps {
  /**
   * Theme (provided through customization.)
   */
  theme: ITheme;

  /**
   * Additional CSS class(es) to apply to the Donut chart.
   */
  className?: string;

  /**
   * Height of the donut.
   */
  height?: number;

  /**
   * Width of the donut.
   */
  width: number;

  /**
   * color for hover font color
   */
  color?: string;
}

export interface IDonutChartStyles {
  /**
   *  Style for the root element.
   */
  root?: IStyle;

  /**
   * Style for the chart.
   */
  chart?: IStyle;
  /**
   * Style for the legend container.
   */
  legendContainer: IStyle;

  /**
   * Style for the legend card title displayed in the hover card
   */
  hoverCardTextStyles: IStyle;

  /**
   * Style for the data displayed in the hover card
   */
  hoverCardDataStyles: IStyle;

  /**
   * Style for the root of the hover card
   */
  hoverCardRoot: IStyle;
}
