import { ChartType } from './Chart/Chart.types';
import { ICardHeaderProps } from './CardHeader/CardHeader.types';
import { ICardContentDetails } from './Layout/Layout.types';
import { IAction } from './ActionBar/ActionBar.types';
import { ICardDropDownOption } from './CardFrame/CardFrame.types';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';

/**
 * Card size that we want to build.
 */
export enum CardSize {
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
  CompoundButtonStack,

  /**
   * Selects the grid list
   */
  GridList,

  /**
   * Selects the chart type
   */
  Chart,

  /**
   * Selects the Multicount component
   */
  MultiCount
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

  /**
   * Hyperlink URL for title
   */
  href?: string;

  /**
   * Target for Hyperlink URL for title
   */
  target?: string;

  /**
   * callback triggered upon clicking on the card title. Card title is clickable only when href is passed to it.
   */
  cardTitleCallback?: VoidFunction;

  /**
   * Defines the title for the benefit of tooltip
   */
  cardFrameMenuTitle?: string;

  /**
   * The aria label of the button for the benefit of screen readers.
   */
  cardFrameMenuAriaLabel?: string;
}

export interface ICardProps {
  /**
   * Optional Card Id props
   */
  cardId?: string;

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
   * Defines the title for the benefit of tooltip
   */
  actionBarOverflowButtonTitle?: string;

  /**
   * The aria label of the button for the benefit of screen readers.
   */
  actionBarOverflowButtonAriaLabel?: string;

  /**
   * Detailed description of the button for the benefit of screen readers.
   *
   * Besides the compound button, other button types will need more information provided to screen reader.
   */
  actionBarOverflowButtonAriaDescription?: string;

  /**
   * role of the  card for the benefit of screen readers
   */
  role?: string;

  /**
   * The content area content details array.
   */
  cardContentList?: ICardContentDetails[];

  /**
   * The card size (small | medium tall | medium wide | large)
   */
  cardSize: CardSize;

  /**
   * This props takes in a function that needs to be called upon componentDidMount.
   * One of its use could be to fetch server data here
   */
  callOnDidMount?: VoidFunction;

  /**
   * Whether the card is draggable or not
   * @default false
   */
  disableDrag?: boolean;

  /**
   * load animations for loading  dashboard card
   */
  loading?: boolean;
}

export enum DraggingAnimationType {
  BarGraph = 'BarGraph',
  DonutChart = 'DonutChart',
  HorizontalBarGraph = 'HorizontalBarGraph',
  LineChart = 'LineChart',
  Shimmer = 'Shimmer'
}

export interface IAddCardInfo {
  /**
   * The body text that goes with add card representation of card
   * This body text appears when the card is in add card panel and has not been yet added to layout
   */
  addCardPanelBodyText?: string;

  /**
   * The header text that goes with add card representation of card
   */
  addCardPanelHeader?: string;

  /**
   * The image to be shown beside card details in add card panel
   */
  addCardPanelImageUrl?: string;

  /**
   * The dragging animation type for the add card. Used for rendering animation in the dragging card
   */
  draggingAnimation?: DraggingAnimationType;

  /**
   * The aria label for the add card '+' icon
   */
  addCardIconAriaLabel?: string;

  /**
   * The alt text for the image in the add card representation
   */
  addCardImageAltText?: string;
}

export interface ICard extends ICardProps {
  /**
   * The card id, which must be unique within the dashboard
   */
  id: string;
}

export interface IDGLCard {
  /**
   * The card id, which must be unique within the dashboard
   */
  id: string;

  /**
   * The add card info for each card
   */
  addCardInfo?: IAddCardInfo;

  /**
   * The JSX element to be rendered
   */
  renderElement: JSX.Element;

  /**
   * The size of the DGL card
   */
  cardSize: CardSize;
}

export interface ICardState {
  /**
   * The card size state
   */
  cardSize: CardSize;

  chartType?: ChartType;
}

export interface ICardStyles {
  /**
   * Styles for root element of the card
   */
  root: IStyle;
}
