import { IStyleFunctionOrObject } from '../../Utilities';
import { IGroupDividerProps } from './GroupedList.types';
import { ITheme, IStyle } from '../../Styling';

export interface IGroupHeaderProps extends IGroupDividerProps {
  /**
   * Theme provided by context
   */
  theme?: ITheme;

  /**
   * Overridable styles
   */
  styles?: IStyleFunctionOrObject<IGroupHeaderStyleProps, IGroupHeaderStyles>;

  /**
   * Custom classname
   */
  className?: string;
}

export type IGroupHeaderStyleProps = Required<Pick<IGroupHeaderProps, 'theme'>> &
  Pick<IGroupHeaderProps, 'selected' | 'className'> & {
    isCollapsed?: boolean;
  };

export interface IGroupHeaderStyles {
  root: IStyle;
  groupHeaderContainer: IStyle;
  headerCount: IStyle;
  check: IStyle;
  dropIcon: IStyle;
  expand: IStyle;
  expandIsCollapsed: IStyle;
  title: IStyle;
}
