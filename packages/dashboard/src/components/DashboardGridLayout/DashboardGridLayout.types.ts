import { Breakpoints, Layout, Layouts } from 'react-grid-layout';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';

/**
 * Size of the card
 */
export enum Size {
  /**
   * Option for selecting small card
   */
  small = 'small',

  /**
   * Option for selecting Medium Tall card
   */
  mediumTall = 'mediumTall',

  /**
   * Option for selecting Medium Wide card
   */
  mediumWide = 'mediumWide',

  /**
   * Option for selecting Large card
   */
  large = 'large',

  /**
   * Option for selecting section title
   */
  section = 'section'
}

export interface IDashboardGridLayoutStyles {
  root: IStyle;
}

export type DashboardGridBreakpointLayouts = {
  /**
   * Layout dictionary for every breakpoint
   */
  [P in Breakpoints]?: IDashboardCardLayout[]
};

export type DashboardSectionMapping = {
  /**
   * Key to key mapping for sections
   * Key: section key
   * Value: List of cards layouts that are under this section
   */
  [id: string]: Layout[];
};

export type LayoutMapping = {
  /**
   * Layout key to its layout mapping with height and width
   * to use while expanding
   */
  [id: string]: Layout;
};

export interface IDashboardCardLayout {
  /**
   * A string corresponding to the component key
   */
  i: string;

  /**
   * x, in grid units, not pixels
   */
  x: number;

  /**
   * y, in grid units, not pixels
   */
  y: number;

  /**
   * Size of card
   */
  size: Size;

  /**
   * Static elements can't be moved or dragged
   * @default false
   */
  static?: boolean;

  /**
   * Whether cards in this grid are allowed to drag
   * @default true
   */
  isDraggable?: boolean;

  /**
   * Whether cards in this grid are allowed to get resized
   * @default false
   */
  isResizable?: boolean;
}

export interface IDashboardGridLayoutProps {
  /**
   * Describes the layout of the cards to display for every breakpoint
   */
  layout: DashboardGridBreakpointLayouts;

  /**
   * Whether items in this grid should be draggable or not
   * @default true
   */
  isDraggable?: boolean;

  /**
   * Whether items in this grid should be allowed to resize or not
   * @default false
   */
  isResizable?: boolean;

  /**
   * Callback so you can save the layout.
   */
  onLayoutChange?(currentLayout: Layout[], allLayouts: Layouts): void;

  /**
   * Calls back with breakpoint and new number of columns
   */
  onBreakPointChange?(newBreakpoint: string, newCols: number): void;
}
