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

  /*
   * Style for the container that holds the legend and any optional JSX annotation from client is used
   */
  legendContainer?: string;

  /**
   * Style for the annotation that is used in the legend
   */
  annotation?: string;
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

  /**
   * The annotation for the legend, function returning a React node
   */
  legendAnnotation?: () => React.ReactNode;
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
   * Keys (title) that will be initially used to set selected items. This prop is used for multi-select scenarios when
   * canSelectMultipleLegends is true; for single-select, use defaultSelectedLegend.
   *
   * Updating this prop does not change the selection after the component has been initialized. For controlled
   * selections, use selectedLegends instead.
   *
   * @see selectedLegends for setting the selected legends in controlled mode.
   * @see defaultSelectedLegend for setting the initially selected legend when canSelectMultipleLegends is false.
   */
  defaultSelectedLegends?: string[];

  /**
   * Key that will be initially used to set selected item. This prop is used for single-select scenarios when
   * canSelectMultipleLegends is false or unspecified; for multi-select, use defaultSelectedLegends.
   *
   * Updating this prop does not change the selection after the component has been initialized. For controlled
   * selections, use selectedLegend instead.
   *
   * @see selectedLegend for setting the selected legend in controlled mode.
   * @see defaultSelectedLegends for setting the initially selected legends when canSelectMultipleLegends is true.
   */
  defaultSelectedLegend?: string;

  /**
   * Keys (title) that will be used to set selected items in multi-select scenarios when canSelectMultipleLegends is
   * true. For single-select, use selectedLegend.
   *
   * When this prop is provided, the component is controlled and does not automatically update the selection based on
   * user interactions; the parent component must update the value passed to this property by handling the onChange
   * event.
   *
   * @see defaultSelectedLegends for setting the initially-selected legends in uncontrolled mode.
   * @see selectedLegends for setting the selected legends when `canSelectMultipleLegends` is `true`.
   */
  selectedLegends?: string[];

  /**
   * Key (title) that will be used to set the selected item in single-select scenarios when canSelectMultipleLegends is
   * false or unspecified. For multi-select, use selectedLegends.
   *
   * When this prop is provided, the component is controlled and does not automatically update the selection based on
   * user interactions; the parent component must update the value passed to this property by handling the onChange
   * event.
   *
   * @see defaultSelectedLegend for setting the initially-selected legend in uncontrolled mode.
   * @see selectedLegend for setting the selected legend when `canSelectMultipleLegends` is `false`.
   */
  selectedLegend?: string;

  /**
   * The shape for the legend.
   */
  shape?: LegendShape;

  /**
   * Callback to access the public methods and properties of the component.
   */
  legendRef?: React.RefObject<LegendContainer>;
}

/**
 * @public
 * The shape for the legend
 * default: show the rect legend
 * triangle: show the triangle legend
 * {@docCategory Legends}
 */
export type LegendShape = 'default' | 'triangle' | keyof typeof Points | keyof typeof CustomPoints;

/**
 * {@docCategory Legends}
 */
export interface LegendContainer {
  toSVG: (
    svgWidth: number,
    isRTL?: boolean,
  ) => {
    node: SVGGElement | null;
    width: number;
    height: number;
  };
}
