import { IStyle } from 'office-ui-fabric-react/lib/Styling';

export interface IBodyTextStyles {
  /**
   * Style for root container
   */
  root: IStyle;

  /**
   * Style for the subheader text.
   */
  subHeaderText: IStyle;

  /**
   * Style for the body text
   */
  bodyText: IStyle;
}

export interface IBodyTextProps {
  /**
   * Sub header for Body text
   */
  subHeaderText?: string;

  /**
   * Body text
   */
  bodyText?: string;
}
