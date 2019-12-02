import { IStyle } from '../../../Styling';
import { IPanelProps, IPanelStyleProps, IPanelHeaderRenderer } from '../Panel.types';

/**
 * {@docCategory NewHeader}
 */
export interface INewHeaderProps extends IPanelProps {
  /**
   * Function that returns the header title component
   */
  header?: (
    props?: IPanelProps | undefined,
    defaultRender?: IPanelHeaderRenderer | undefined,
    headerTextId?: string | undefined
  ) => JSX.Element;

  /**
   * Function that dismisses the panel
   */
  onPanelClick?: (ev?: any) => void;

  /**
   * The ID of an element containing the panel's title
   */
  headerTextId?: string;
}

/**
 * {@docCategory NewHeader}
 */
export interface INewHeaderStyleProps extends IPanelStyleProps {}

/**
 * {@docCategory NewHeader}
 */
export interface INewHeaderStyles {
  /**
   * Style for the navigation container element.
   */
  commands: IStyle;

  /**
   * Style for the close button container element.
   */
  navigation: IStyle;

  /**
   * Style for the close button IconButton element.
   */
  closeButton: IStyle;

  /**
   * Style for the header container div element.
   */
  header: IStyle;

  /**
   * Style for the header inner p element.
   */
  headerText: IStyle;
}
