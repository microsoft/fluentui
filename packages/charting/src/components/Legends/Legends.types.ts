import * as React from 'react';
import { ITheme, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IHoverCardStyleProps, IHoverCardStyles } from 'office-ui-fabric-react/lib/HoverCard';
import { IOverflowSetProps } from 'office-ui-fabric-react/lib/OverflowSet';
import { IFocusZoneProps } from '@fluentui/react-focus';

export interface ILegendOverflowData {
  primary: ILegend[];

  overflow?: ILegend[];
}

export interface ILegendSubComponentStyles {
  hoverCardStyles: IStyleFunctionOrObject<IHoverCardStyleProps, IHoverCardStyles>;
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
   * Style set for the triangle that represents a legend
   */
  triangle: IStyle;

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

  /**
   * sub component styles
   */
  subComponentStyles: ILegendSubComponentStyles;
}

export interface ILegend {
  /**
   * Defines the title of the legend
   */
  title: string;

  /**
   * Defines the function that is executed on clicking this legend
   */
  action?: VoidFunction;

  /**
   * Defines the function that is executed upon hovering over the legend
   */
  hoverAction?: VoidFunction;

  /**
   * Defines the function that is executed upon moving the mouse away from the legend
   */
  onMouseOutAction?: (isLegendFocused?: boolean) => void;

  /**
   * The color for the legend
   */
  color: string;

  /**
   * The shape for the legend
   */
  shape?: LegendShape;

  /**
   *  native button props for the legend button
   */
  nativeButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export interface ILegendStyleProps {
  theme?: ITheme;
  className?: string;
  colorOnSelectedState?: string;
  borderColor?: string;
  overflow?: boolean;
}

export interface ILegendsProps {
  /**
   * Prop that takes list of legends
   */
  legends: ILegend[];

  /**
   * Additional CSS class(es) to apply to the legneds component.
   */
  className?: string;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ILegendStyleProps, ILegendsStyles>;

  /**
   * This prop makes the legends component align itself to the center in the container it is sitting in
   */
  centerLegends?: boolean;

  /**
   * Enable the legends to wrap lines if there is not enough space to show all legends on a single line
   */
  enabledWrapLines?: boolean;

  /**
   * props for the overflow set component
   */
  overflowProps?: Partial<IOverflowSetProps>;

  /**
   * focus zone props in hover card
   */
  focusZonePropsInHoverCard?: IFocusZoneProps;

  /**
   * text for overflow legends string
   */
  overflowText?: string;

  /**
   * Prop that takes the active legend
   */
  selectedLegend?: string;

  /**
   * prop that decides if legends are focusable
   * @default true
   */
  allowFocusOnLegends?: boolean;
}

/**
 * The shape for the legend
 * default: show the rect legend
 * triangle: show the triangle legend
 */
export type LegendShape = 'default' | 'triangle';
