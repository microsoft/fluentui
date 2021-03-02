import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { ITheme, IStyle } from '@fluentui/react/lib/Styling';

export interface IEditSectionProps {
  /** Optional className for the root element. */
  className?: string;

  /**
   * The name of the component
   */
  title?: string;

  /**
   * The section name this button is used to edit.
   */
  section: string;

  /**
   * Link to edit the markdown page on GitHub.
   */
  url: string;

  /** Theme provided by higher-order component. */
  theme?: ITheme;

  /** Optional override styles */
  styles?: IStyleFunctionOrObject<IEditSectionStyleProps, IEditSectionStyles>;
}

export type IEditSectionStyleProps = Pick<IEditSectionProps, 'theme'>;

export interface IEditSectionStyles {
  root: IStyle;
  subComponentStyles: IEditSectionSubComponentStyles;
}

export interface IEditSectionSubComponentStyles {
  // TODO: remove anys after TS 3 upgrade and full button styling support
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  button: IStyleFunctionOrObject<any, any>;
}
