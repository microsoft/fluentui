import * as React from 'react';
import { CustomPoints, Points } from '../../utilities/utilities';

/**
 * @public
 * Legends styles
 * {@docCategory Legends}
 */
export interface LegendsStyles {
  /**
   * Style set for the root of the legend component
   */
  root?: string;

  /**
   * Style set for Legend. This is a wrapping class for text of legend and the rectange box that represents a legend
   */
  legend?: string;

  /**
   * Style set for the rectangle that represents a legend
   */
  rect?: string;

  /**
   * styles set for the shape that represents a legend
   */
  shape?: string;

  /**
   * Style set for the triangle that represents a legend
   */
  triangle?: string;

  /**
   * Style for the legend text
   */
  text?: string;

  /**
   * Style for the legend text
   */
  hoverChange?: string;

  /**
   * Style for the area that is resizable
   */
  resizableArea?: string;
}

/**
 * @public
 * ILegend interface
 * {@docCategory Legends}
 */
export interface Legend {
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
   * The opacity of the legend color
   */
  opacity?: number;

  /**
   * The shape for the legend
   */
  shape?: LegendShape;

  /**
   * Indicated whether or not to apply stripe pattern
   */
  stripePattern?: boolean;

  /**
   * Indicates if the legend belongs to a line in the Bar Chart
   */
  isLineLegendInBarChart?: boolean;

  /*
   *  native button props for the legend button
   */
  nativeButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

/**
 * @public
 * Legend style properties
 * {@docCategory Legends}
 */
export interface LegendStyleProps {
  className?: string;
  colorOnSelectedState?: string;
  borderColor?: string;
  opacity?: number;
  overflow?: boolean;
  stripePattern?: boolean;
  isLineLegendInBarChart?: boolean;
}

/**
 * @public
 * Legend properties
 * {@docCategory Legends}
 */
export interface LegendsProps {
  /**
   * Prop that takes list of legends
   */
  legends: Legend[];

  /**
   * Additional CSS class(es) to apply to the legneds component.
   */
  className?: string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: LegendsStyles;

  /**
   * This prop makes the legends component align itself to the center in the container it is sitting in
   */
  centerLegends?: boolean;

  /**
   * Enable the legends to wrap lines if there is not enough space to show all legends on a single line
   */
  enabledWrapLines?: boolean;

  /**
   * style for the overflow component
   */
  overflowStyles?: React.CSSProperties;

  /**
   * text for overflow legends string
   */
  overflowText?: string;

  /**
   * prop that decides if legends are focusable
   * @default true
   */
  allowFocusOnLegends?: boolean;

  /**
   * prop that decide if we can select multiple legends or single legend at a time
   * @default false
   */
  canSelectMultipleLegends?: boolean;

  /**
   * Callback issued when the selected option changes.
   */
  onChange?: (selectedLegends: string[], event: React.MouseEvent<HTMLButtonElement>, currentLegend?: Legend) => void;

  /**
   * Keys (title) that will be initially used to set selected items.
   * This prop is used for multiSelect scenarios.
   * In other cases, defaultSelectedLegend should be used.
   */
  defaultSelectedLegends?: string[];

  /**
   * Key that will be initially used to set selected item.
   * This prop is used for singleSelect scenarios.
   */
  defaultSelectedLegend?: string;

  /**
   * The shape for the legend.
   */
  shape?: LegendShape;
}

/**
 * @public
 * The shape for the legend
 * default: show the rect legend
 * triangle: show the triangle legend
 * {@docCategory Legends}
 */
export type LegendShape = 'default' | 'triangle' | keyof typeof Points | keyof typeof CustomPoints;
