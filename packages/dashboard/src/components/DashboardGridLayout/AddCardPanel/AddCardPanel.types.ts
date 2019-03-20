import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { IBaseProps, IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IDGLCard, CardSize, DraggingAnimationType } from '../../../index';

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
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IAddCardPanelStyleProps, IAddCardPanelStyles>;

  /**
   * Message shown in add card panel empty state
   */
  emptyPanelMessage?: string;

  /**
   * The callback method to switch between add card panel and the dashboard grid layout
   */
  moveCardFromAddCardPanelToDashboard?: (cardId: string) => void;

  /**
   * The callback method called upon add card panel dimiss
   */
  onDismiss?: () => void;

  /**
   * The callback that is called when a card is dragged, with the necessary card information
   */
  draggingCardCallback: (
    cardId: string,
    title: string,
    cardSzie: CardSize,
    initialX: number,
    draggingAnimation?: DraggingAnimationType
  ) => void;

  /**
   * The cards initial x position of add card, used to determine when to open the add card panel back
   * This is helpful when the user wants to put the card in add card panel
   */
  initialX: number;

  /**
   * Panel close button aria label
   */
  closeButtonAriaLabel?: string;
}

export interface IAddCardPanelState {
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

  /**
   * Style set for when no cards available in add card panel
   */
  emptyCardStyles: IStyle;

  /**
   * Style set for when no cards available in add card panel
   */
  emptyPanelMessageStyles: IStyle;
}

export interface IAddCardPanelStyleProps {
  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;
}
