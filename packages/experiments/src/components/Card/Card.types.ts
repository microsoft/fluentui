import { ICardHeaderProps } from './CardHeader/CardHeader.types';
import { ICardContentDetails } from './Layout/Layout.types';
import { IAction } from './ActionBar/ActionBar.types';
import { ICardDropDownOption } from './CardFrame/CardFrame.types';

/**
 * Card size that we want to build.
 */
export enum CardSize {
  /**
   * Option for selecting small card
   */
  small,

  /**
   * Option for selecting Medium Tall card
   */
  mediumTall,

  /**
   * Option for selecting Medium Wide card
   */
  mediumWide,

  /**
   * Option for selecting Large card
   */
  large
}

/**
 * Card content type that we want to display in the card content area
 */
export enum CardContentType {
  /**
   * Selects BodyText component
   */
  BodyText,

  /**
   * Selects Thumbnail List component
   */
  ThumbnailList,

  /**
   * Selects the compound button stack
   */
  CompoundButtonStack
}

/**
 * Priority on the card.
 */
export enum Priority {
  /**
   * Renders content in the content area 1. For small card always choose this priority
   */
  Priority1 = 0,

  /**
   * Renders content in the content area 2.
   */
  Priority2
}

export interface ICardFrameContent {
  /**
   * Card title
   */
  cardTitle: string;

  /**
   * Array of options that go into the dropdown of card frame
   */
  cardDropDownOptions: ICardDropDownOption[];
}

export interface ICardProps {
  /**
   * Card frame content, that contains the card title and array of card frame drop down options
   */
  cardFrameContent: ICardFrameContent;

  /**
   * The header props that consist of Header text and annotation Text
   */
  header?: ICardHeaderProps;

  /**
   * The footer action bar props
   */
  actions?: IAction[];

  /**
   * The content area content details array.
   */
  cardContentList?: ICardContentDetails[];

  /**
   * The card size (small | medium tall | medium wide | large)
   */
  cardSize: CardSize;
}

export interface ICardState {
  /**
   * The card size state
   */
  cardSize: CardSize;
}
