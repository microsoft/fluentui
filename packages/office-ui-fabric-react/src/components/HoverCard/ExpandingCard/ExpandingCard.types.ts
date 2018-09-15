import { ICardProps, ICardStyles, ICardStyleProps } from '../Card.types';
import { IRenderFunction } from '../../../Utilities';
import { IStyle } from '../../../Styling';

export interface IExpandingCard {}

/**
 * ExpandingCard component props.
 */
export interface IExpandingCardProps extends ICardProps<IExpandingCard, IExpandingCardStyles, IExpandingCardStyleProps> {
  /**
   * Height of compact card
   * @default 156
   */
  compactCardHeight?: number;

  /**
   * Height of expanded card
   * @default 384
   */
  expandedCardHeight?: number;

  /**
   * Use to open the card in expanded format and not wait for the delay
   * @default ExpandingCardMode.compact
   */
  mode?: ExpandingCardMode;

  /**
   *  Render function to populate compact content area
   */
  onRenderCompactCard?: IRenderFunction<IExpandingCardProps>;

  /**
   *  Render function to populate expanded content area
   */
  onRenderExpandedCard?: IRenderFunction<IExpandingCardProps>;
}

export enum ExpandingCardMode {
  /**
   * To have top compact card only
   */
  compact = 0,

  /**
   * To have both top compact and bottom expanded card
   */
  expanded = 1
}

export enum OpenCardMode {
  /**
   * Open card by hover
   */
  hover = 0,

  /**
   * Open card by hot key
   */
  hotKey = 1
}

export interface IExpandingCardStyleProps extends ICardStyleProps {
  /**
   * Height of the compact section of the card.
   */
  compactCardHeight?: number;

  /**
   * Boolean flag that expanded card is in Expanded.mode === expanded && first frame was rendered.
   */
  expandedCardFirstFrameRendered?: boolean;

  /**
   * Height of the expanded section of the card.
   */
  expandedCardHeight?: number;

  /**
   * Whether the content of the expanded card overflows vertically.
   */
  needsScroll?: boolean;
}

export interface IExpandingCardStyles extends ICardStyles {
  /**
   * Style for the main card element.
   */
  compactCard?: IStyle;

  /**
   * Base Style for the expanded card content
   */
  expandedCard?: IStyle;

  /**
   * Style for the expanded card scroll content
   */
  expandedCardScroll?: IStyle;
}
