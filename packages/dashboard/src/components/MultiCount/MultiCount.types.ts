import { IStyle } from 'office-ui-fabric-react/lib/Styling';

export interface IMultiCountProps {
  /**
   * rows of Multicount Dataviz
   */
  multiCountRows: IMultiCountRow[];

  /**
   * Font size for the annotation text
   */
  annotationTextFontSize?: string;

  /**
   * color for the annotation text
   */
  annotationTextColor?: string;

  /**
   * font size for the body text
   */
  bodyTextFontSize?: string;

  /**
   * color for the body text
   */
  bodyTextColor?: string;

  /**
   * custom message for the multicount
   */
  customMessage?: string;

  /**
   *Url to be redirected to upon clicking on the component
   */
  href?: string;

  /**
   * Defines the id for the component
   */
  id?: string;

  /**
   * Defines the function that is executed on clicking this action
   */

  onClicked?: VoidFunction;
}

export enum AnnotationType {
  /**
   * Indicates a positive change, displays a up arrow
   */
  positive = 'positive',

  /**
   * Indicates no change, no icon is displayed
   */
  neutral = 'neutral',

  /**
   * Indicates a negative change, displays a down arrow
   */
  negative = 'negative'
}

export interface IMultiCountStyleProps {
  color?: string;
  annotationTextFontSize?: string;
  annotationTextColor?: string;
  bodyTextFontSize?: string;
  bodyTextColor?: string;
  hoveredText?: string;
  currentText?: string;
  href?: string;
  hideIcon?: boolean;
  onClicked?: VoidFunction;
}

export interface IMultiCountRow {
  /**
   *The numeric data to be displayed
   */
  data: number;

  /**
   *Description text for the row
   */
  bodyText: string;

  /**
   *annotation text for the row
   */
  annotaionText?: string;

  /**
   *Color of the numeric data passed
   */
  color: string;

  /**
   *Indicates the whether the change for data is positive, negative or nuetral
   */
  type: AnnotationType;

  /**
   *prop to hide the change-indicator icon in the row
   */
  hideIcon?: boolean;
}

export interface IMultiCountStyles {
  /**
   * Style for the root element
   */
  root: IStyle;

  /**
   * Style for bodyText
   */
  bodyText: IStyle;

  /**
   * Style for change indicator icon
   */
  changeIcon: IStyle;

  /**
   * Style for annotaion text and the change icon
   */
  annotation: IStyle;

  /**
   * Style for numeric data
   */
  data: IStyle;

  /**
   * Style for annotationText
   */
  annotationText: IStyle;

  /**
   * Style for icon
   */
  icon: IStyle;

  /**
   * Style for the hover card root
   */
  hoverCardRoot: IStyle;

  /**
   * Style for data in hover card
   */
  hoverCardData: IStyle;

  /**
   * Style for the bodytext and annotation text displayed in the hover card
   */
  hoverCardText: IStyle;

  /**
   * Style for body text displayed in the hover card
   */
  hoverCardBodyText: IStyle;

  /**
   * Style for annotation text displayedin the hover card
   */
  hoverCardAnnotationText: IStyle;

  /**
   * Style for icon in the hover card
   */
  hoverCardIcon: IStyle;

  /**
   * Style for the custom message
   */
  customMessage: IStyle;
}
