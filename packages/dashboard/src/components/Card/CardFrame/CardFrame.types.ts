import { IStyle } from 'office-ui-fabric-react/lib/Styling';

export interface ICardDropDownOption {
  /**
   * Name of the drop down item
   */
  name: string;

  /**
   * Icon for the drop down item
   */
  icon?: string;

  /**
   * Aria Label for the drop down item. Default will be the name
   */
  ariaLabel?: string;

  /**
   * Tool tip for the drop down item. Default will be the name
   */
  title?: string;

  /**
   * Function for click
   */
  onClick: VoidFunction;
}

export interface ICardFrameProps {
  /**
   * Defines the Dashboard card title
   */
  cardTitle: string;

  /**
   * the call back triggered upon clicking card title
   */
  cardTitleCallback?: VoidFunction;

  /**
   * Contains the items that go into the dropdown of the frame
   */
  cardDropDownOptions?: ICardDropDownOption[] | undefined;

  /**
   * Color property for card title
   */
  titleTextColor?: string;

  /**
   * Font size property for card title
   */
  fontSize?: string;

  /**
   * Font family property for card title
   */
  fontFamily?: string;

  /**
   * Color property for the seperator
   */
  seperatorColor?: string;

  /**
   * Hyperlink URL for title
   */
  href?: string;

  /**
   * Target for Hyperlink URL for title
   */
  target?: string;

  /**
   * Whether the card is draggable or not
   * @default false
   */
  disableDrag?: boolean;
}

export interface ICardFrameStyles {
  /**
   * Style set for Card Frame
   */
  root: IStyle;

  /**
   * Style set for card title box
   */
  cardTitleBox: IStyle;

  /**
   * Style set for card title more(Ellipsis) button
   */
  cardTitleEllipsisButton: IStyle;

  /**
   * Style set for card title more(Ellipsis) button
   */
  ellipsisIcon: IStyle;

  /**
   * Style for card title
   */
  cardTitle: IStyle;

  /**
   * Style for card frame layout(children)
   */
  layout: IStyle;

  /**
   * Style for ellipsis button for the overflowmenu
   */
  ellipsisButtonStyle: IStyle;
}
