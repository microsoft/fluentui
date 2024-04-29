import * as React from 'react';
import { ITheme, IStyle } from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { IHoverCardStyleProps, IHoverCardStyles } from '@fluentui/react/lib/HoverCard';
import { IOverflowSetProps } from '@fluentui/react/lib/OverflowSet';
import { IFocusZoneProps } from '@fluentui/react-focus';
import { CustomPoints, Points } from '../../utilities/utilities';

export interface ILegendOverflowData {
  primary: ILegend[];

  overflow?: ILegend[];
}

/**
 * @public
 * {@docCategory Legends}
 */
export interface ILegendSubComponentStyles {
  hoverCardStyles: IStyleFunctionOrObject<IHoverCardStyleProps, IHoverCardStyles>;
}

/**
 * @public
 * Legends styles
 * {@docCategory Legends}
 */
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
   * styles set for the shape that represents a legend
   */
  shape: IStyle;

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
   * Style for the overflow container
   */
  hoverCardRoot: IStyle;

  /**
   * sub component styles
   */
  subComponentStyles: ILegendSubComponentStyles;
}

/**
 * @public
 * ILegend interface
 * {@docCategory Legends}
 */
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
export interface ILegendStyleProps {
  theme?: ITheme;
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
   * Defines the function that is executed upon hiding of hover card
   * make sure to send prop  when  the prop  is canSelectMultipleLegends is set to true
   * and empty the selected state legends
   */
  onLegendHoverCardLeave?: VoidFunction;

  /**
   * Callback issued when the selected option changes.
   */
  onChange?: (selectedLegends: string[], event: React.MouseEvent<HTMLButtonElement>, currentLegend?: ILegend) => void;

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
