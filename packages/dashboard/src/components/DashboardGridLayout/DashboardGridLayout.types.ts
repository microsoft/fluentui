import { Breakpoints, Layout, Layouts } from 'react-grid-layout';
import { ISection } from '../Section/Section.types';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { DragApiRefObject, ItemCallback } from 'react-grid-layout';
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
   * # of cols. This is a breakpoint -> cols map, e.g. {lg: 12, md: 10, ...}
   */
  cols?: { [P in Breakpoints]: number };

  /**
   * the px value of break points
   */
  breakpoints?: { [P in Breakpoints]: number };

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
   * Calls when drag starts.
   */
  onDragStart?: ItemCallback;

  /**
   * Calls on each drag movement.
   */
  onDrag?: ItemCallback;

  /**
   * Calls when drag is complete.
   */
  onDragStop?: ItemCallback;

  /**
   * The row height used for React-Grid-Layout, if not provided, the default value is used
   * @default 50
   */
  rowHeight?: number;

  /**
   * The sections
   */
  sections?: ISection[];

  /**
   * The cards definition. Either use cards or cardNodes to pass in the card definitions.
   */
  cards?: ICard[];

  /**
   * Alternative to provide card definition. Either use cards or cardNodes to pass in the card definitions.
   */
  cardNodes?: JSX.Element[];

  /**
   * if the section is collapsible
   * @default false
   */
  isCollapsible?: boolean;

  /**
   * Callback so you can save the layout.
   */
  onLayoutChange?(currentLayout: Layout[], allLayouts: Layouts): void;

  /**
   * Callback with breakpoint and new number of columns
   */
  onBreakPointChange?(newBreakpoint: string, newCols: number): void;

  /**
   * On section change.
   * @param newMapping
   */
  onSectionChange?(currentLayout: Layout[], allLayouts: Layouts, sectionMapping?: DashboardSectionMapping): void;
}
