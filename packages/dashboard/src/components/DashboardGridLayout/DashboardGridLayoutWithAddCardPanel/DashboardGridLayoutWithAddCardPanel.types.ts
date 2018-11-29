import { DashboardGridBreakpointLayouts } from '../DashboardGridLayout.types';
import { IDGLCard, ISection } from '../../../index';

export interface IDashboardGridLayoutWithAddCardPanelProps {
  /**
   * prop to open the add card panel
   */
  isOpen?: boolean;

  /**
   * The cards rendered in the layout
   */
  cardsVisibleInLayout: IDGLCard[];

  /**
   * The cards rendered in the add card panel
   */
  cardsVisibleInAddCardPanel: IDGLCard[];

  /**
   * The section title
   */
  sectionTitle: string;

  /**
   * Whether items in this grid should be draggable or not
   * @default true
   */
  isDraggable?: boolean;

  /**
   * The header for the add card panel
   */
  panelHeader?: string;

  /**
   * The callback being called each time after a layout change
   */
  onLayoutChange?: (newLayout: DashboardGridBreakpointLayouts) => void;
}

export interface IDashboardGridLayoutWithAddCardPanelState {
  /**
   * The cards that are shown in the layout
   */
  cardsForLayout: IDGLCard[];

  /**
   * The cards that are shown in the add card panel
   */
  cardsForAddCardPanel: IDGLCard[];

  /**
   * The sections information
   */
  sections: ISection[];

  /**
   * The breakpoints details along with each layout's card position and size info
   */
  layout: DashboardGridBreakpointLayouts;
}
