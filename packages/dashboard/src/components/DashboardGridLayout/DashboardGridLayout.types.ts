import { Breakpoints, Layout, Layouts } from 'react-grid-layout';
import { ISection } from '../Section/Section.types';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { DragApiRefObject } from 'react-grid-layout';
import { ICard, CardSize } from '../Card/Card.types';

export interface IDashboardGridLayoutStyles {
  root: IStyle;
  section: IStyle;
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
   * Value: List of cards keys that are under this section
   */
  [id: string]: string[];
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
  size: CardSize;

  /**
   * Static elements can't be moved or dragged
   * @default false
   */
  static?: boolean;

  /**
   * Whether cards in this grid are allowed to drag
   * @default false
   */
  disableDrag?: boolean;

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
  layout?: DashboardGridBreakpointLayouts;

  /**
   * Drag api to allow custom drag drops
   */
  dragApi?: DragApiRefObject;

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
   * The row height used for React-Grid-Layout, if not provided, the default value is used
   * @default 50
   */
  rowHeight?: number;

  /**
   * Callback so you can save the layout.
   */
  onLayoutChange?(currentLayout: Layout[], allLayouts: Layouts): void;

  /**
   * Calls back with breakpoint and new number of columns
   */
  onBreakPointChange?(newBreakpoint: string, newCols: number): void;
}

export interface IDashboardGridSectionLayoutProps extends IDashboardGridLayoutProps {
  /**
   * The sections
   */
  sections: ISection[];

  /**
   * THe cards
   */
  cards: ICard[];

  /**
   * if the section is collapsible
   * @default false
   */
  isCollapsible?: boolean;

  /**
   * On section change.
   * @param newMapping
   */
  onSectionChange?(currentLayout: Layout[], allLayouts: Layouts, sectionMapping?: DashboardSectionMapping): void;
}
