import { IStyle } from 'office-ui-fabric-react/lib/Styling';

export interface ILegendOverflowData {
  primary: ILegend[];

  overflow?: ILegend[];
}

export interface ILegendsStyles {
  /**
   * Style set for the root of the legend component
   */
  root: IStyle;

  /**
   * Style set for Legend. This is a wrapping class for text of legend and the rectange box that represents a legend
   */
  legend: IStyle;

  /**
   * Style set for the rectangle that represents a legend
   */
  rect: IStyle;

  /**
   * Style for the legend text
   */
  text: IStyle;

  /**
   * Style for the legend text
   */
  hoverChange: IStyle;

  /**
   * Style for the text that indicates the no.of legends that are in hovercard due to lack of space
   */
  overflowIndicationTextStyle: IStyle;
}

export interface ILegend {
  /**
   * Defines the title of the legend
   */
  title: string;

  /**
   * Defines the function that is executed on clicking this legend
   */
  action: VoidFunction;

  /**
   * The color for the legend
   */
  color: string;
}

// This is an internal interface used for rendering the legends with unique key
export interface ILegendItem {
  name?: string;
  title: string;
  action: VoidFunction;
  color: string;
  key: number;
}

export interface ILegendStyleProps {
  colorOnSelectedState?: string;
  borderColor?: string;
  overflow?: boolean;
}

export interface ILegendsProps {
  /**
   * Prop that takes list of legends
   */
  legends: ILegend[];
}
