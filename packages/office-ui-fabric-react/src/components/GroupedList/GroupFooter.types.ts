import { IStyleFunctionOrObject } from '../../Utilities';
import { IGroupDividerProps } from './GroupedList.types';
import { ITheme, IStyle } from '../../Styling';

export interface IGroupFooterProps extends IGroupDividerProps {
  /**
   * Theme provided by context
   */
  theme?: ITheme;

  /**
   * Overridable styles
   */
  styles?: IStyleFunctionOrObject<IGroupFooterStyleProps, IGroupFooterStyles>;

  /**
   * Custom classname
   */
  className?: string;
}

export type IGroupFooterStyleProps = Required<Pick<IGroupFooterProps, 'theme'>> &
  Pick<IGroupFooterProps, 'selected' | 'className'> & {
    isCollapsed?: boolean;
  };

export interface IGroupFooterStyles {
  root: IStyle;
}
