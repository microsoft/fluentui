import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { DashboardGridBreakpointLayouts } from '../DashboardGridLayout.types';
import { CardSize, IDGLCard, ISection, DraggingAnimationType } from '../../../index';

export interface IDashboardGridLayoutWithAddCardPanelProps extends IBaseProps {
  /**
   * prop to open the add card panel
   */
  isOpen?: boolean;

  /**
   * The cards rendered in the layout
   */
  dashboardCards: IDGLCard[];

  /**
   * The cards rendered in the add card panel
   */
  addCardPanelCards: IDGLCard[];

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

  /**
   * The callback method fired when the add card panel is dismissed
   */
  onPanelDismiss?: () => void;
}

export interface IDashboardGridLayoutWithAddCardPanelState {
  /**
   * The cards that are shown in the layout
   */
  dashboardCards: IDGLCard[];

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

  /**
   * flag to determine whether to render dragging card or not
   */
  renderDraggingCard: boolean;

  /**
   * The selected card's id, used to pass to DraggingCard
   */
  selectedCardId: string;

  /**
   * The selected card's title, used to pass to DraggingCard
   */
  selectedCardTitle: string;

  /**
   * The selected card's size, used to pass to DraggingCard
   */
  selectedCardSize: CardSize;

  /**
   * The selected card's initialX value, used to pass to DraggingCard
   */
  selectedCardInitialX: number;

  /**
   * The dragging animation type of the card selected from the add card panel
   * This value is sent to DraggingCard which then renders the required animaiton in it
   */
  draggingAnimation?: DraggingAnimationType;
}
