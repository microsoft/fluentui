import type { IBaseCardProps, IBaseCardStyles, IBaseCardStyleProps } from './BaseCard.types';
import type { IRenderFunction } from '../../Utilities';
import type { IStyle } from '../../Styling';

/**
 * {@docCategory HoverCard}
 */
export interface IExpandingCard {}

/**
 * ExpandingCard component props.
 * {@docCategory HoverCard}
 */
export interface IExpandingCardProps
  extends IBaseCardProps<IExpandingCard, IExpandingCardStyles, IExpandingCardStyleProps> {
  /**
   * Height of compact card
   * @defaultvalue 156
   */
  compactCardHeight?: number;

  /**
   * Height of expanded card
   * @defaultvalue 384
   */
  expandedCardHeight?: number;

  /**
   * Use to open the card in expanded format and not wait for the delay
   * @defaultvalue ExpandingCardMode.compact
   */
  mode?: ExpandingCardMode;

  /**
   *  Render function to populate compact content area
   */
  onRenderCompactCard?: IRenderFunction<any>;

  /**
   *  Render function to populate expanded content area
   */
  onRenderExpandedCard?: IRenderFunction<any>;
}

/**
 * {@docCategory HoverCard}
 */
export enum ExpandingCardMode {
  /**
   * To have top compact card only
   */
  compact = 0,

  /**
   * To have both top compact and bottom expanded card
   */
  expanded = 1,
}

/**
 * {@docCategory HoverCard}
 */
export interface IExpandingCardStyleProps extends IBaseCardStyleProps {
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

/**
 * {@docCategory HoverCard}
 */
export interface IExpandingCardStyles extends IBaseCardStyles {
  /**
   * Style for the main card element.
   */
  compactCard?: IStyle;

  /**
   * Base Style for the expanded card content.
   */
  expandedCard?: IStyle;

  /**
   * Style for the expanded card scroll content.
   */
  expandedCardScroll?: IStyle;
}
