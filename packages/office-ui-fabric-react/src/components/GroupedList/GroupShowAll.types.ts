import { ITheme, IStyle } from '../../Styling';
import { IGroupDividerProps } from './GroupedList.types';
import { IStyleFunctionOrObject } from '../../Utilities';

export interface IGroupShowAllProps extends IGroupDividerProps {
  /**
   * Theme provided by context
   */
  theme?: ITheme;

  /**
   * Overridable styles
   */
  styles?: IStyleFunctionOrObject<IGroupShowAllStyleProps, IGroupShowAllStyles>;

  /**
   * The Show All link text.
   * @default 'Show All'
   */
  showAllLinkText?: string;
}

export interface IGroupShowAllStyleProps {
  theme: ITheme;
}

export interface IGroupShowAllStyles {
  root: IStyle;
}
