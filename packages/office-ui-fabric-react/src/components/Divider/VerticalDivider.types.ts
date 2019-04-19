import { ITheme, IStyle } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';

export interface IVerticalDividerProps {
  /**
   * Optional function to generate the class names for the divider for custom styling
   */
  getClassNames?: (theme: ITheme) => IVerticalDividerClassNames;
  theme?: ITheme;
  styles?: IStyleFunctionOrObject<IVerticalDividerPropsStyles, IVerticalDividerStyles>;
}
export type IVerticalDividerPropsStyles = Pick<IVerticalDividerProps, 'theme' | 'getClassNames'>;

export interface IVerticalDividerStyles {
  wrapper: IStyle;
  divider: IStyle;
}
export interface IVerticalDividerClassNames {
  wrapper: string;
  divider: string;
}
