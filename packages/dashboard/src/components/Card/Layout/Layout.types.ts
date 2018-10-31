import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { ICardHeaderProps } from '../CardHeader/CardHeader.types';
import { IBodyTextProps } from '../BodyText/BodyText.types';
import { IThumbnailListProps } from '../ThumbnailList/ThumbnailList.types';
import { CardSize, CardContentType, Priority } from '../Card.types';
import { ICompoundButtonStackProps } from '../CompoundButtonStack/CompoundButtonStack.types';
import { IAction } from '../ActionBar/ActionBar.types';
import { IGridListProps } from '../GridList/GridList.types';
import { IChartProps } from '../Chart/Chart.types';
import { IMultiCountProps } from '@uifabric/dashboard';

export interface ICardContentDetails {
  /**
   * priority that defines what order we want the component to be rendered in the content area
   * Any update here in priority update the enum Priority
   */
  priority: Priority;

  /**
   * Defines the content type we want to render in the content area
   */
  cardContentType: CardContentType;

  /**
   * Content for component we want to render
   */
  content: IBodyTextProps | IThumbnailListProps | ICompoundButtonStackProps | IGridListProps | IChartProps | IMultiCountProps;
}

export interface ILayoutProps {
  /**
   * Header props to render header component
   */
  header?: ICardHeaderProps;

  /**
   * A list of card contents to be rendered in the layout content area 1 and 2
   */
  contentArea?: ICardContentDetails[];

  /**
   * Defines if we want to show the footer or not
   */
  actions?: IAction[];

  /**
   * Defines the current card size
   */
  cardSize: CardSize;
}

export interface ILayoutStyles {
  /**
   * Style set for the layout of the card
   */
  root: IStyle;

  /**
   * Style set for card header
   */
  contentLayout: IStyle;

  /**
   * Style set for card Layout
   */
  contentAreaLayout: IStyle;

  /**
   * Style set for card content1(Area1)
   */
  contentArea1: IStyle;

  /**
   * Style for dataviz last updated on
   */
  dataVizLastUpdatedOn: IStyle;

  /**
   * Style set for card content2(Area2)
   */
  contentArea2: IStyle;

  /**
   * Style set for card footer
   */
  footer: IStyle;
}
