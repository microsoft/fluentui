import { IStyle } from 'office-ui-fabric-react/lib/Styling';

export enum FontSize {
  large,
  medium
}

export interface ICardHeaderProps {
  /**
   * The font size for the header text
   */
  fontSize?: FontSize;

  /**
   * The font color for the card header
   */
  fontColor?: string;

  /**
   * The header text
   */
  headerText?: string;

  /**
   * Annotation Text for the card header
   */
  annotationText?: string;
}

export interface ICardHeaderStyles {
  /**
   * Style set for the card header component root
   */
  root: IStyle;

  /**
   * Style set for header text
   */
  headerText: IStyle;

  /**
   * Style set for annotation text
   */
  annotationText: IStyle;
}
