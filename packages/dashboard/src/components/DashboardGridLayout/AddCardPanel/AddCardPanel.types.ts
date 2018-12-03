import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { IDGLCard } from '../../../index';

export interface IAddCardPanelProps extends IBaseProps {
  /**
   * The title for the add card panel
   */
  header?: string;

  /**
   * Prop to open the add card panel
   */
  isOpen?: boolean;

  /**
   * The list of cards to render in the add card panel
   */
  cards?: IDGLCard[];

  /**
   * The callback method to switch between add card panel and the dashboard grid layout
   */
  moveCardFromAddCardPanelToDashboard?: (cardId: string) => void;
}

export interface IAddCardPanelState {
  /**
   * The callback method to switch between add card panel and the dashboard grid layout
   */
  isOpen: boolean;

  /**
   * The styles(half closing of panel) applied to the flyout after successfully adding a card
   */
  flyoutStyle: React.CSSProperties;
}

export interface IAddCardPanelStyles {
  /**
   * Style for the header of add card panel
   */
  header: IStyle;

  /**
   * Style for the content wrapper of add card panel
   */
  contentRoot: IStyle;
}
