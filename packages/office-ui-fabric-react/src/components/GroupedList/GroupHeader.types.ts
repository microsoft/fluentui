import { IStyleFunctionOrObject } from '../../Utilities';
import { IGroupDividerProps } from './GroupedList.types';
import { ITheme, IStyle } from '../../Styling';

export interface IGroupHeaderProps extends IGroupDividerProps {
  /**
   * Theme provided by Higher Order Component
   */
  theme?: ITheme;

  /**
   * Style function to be passed in to override the themed or default styles
   */
  styles?: IStyleFunctionOrObject<IGroupHeaderStyleProps, IGroupHeaderStyles>;

  /**
   * Custom classname
   */
  className?: string;

  /**
   * GroupedList id for aria-controls
   */
  groupedListId?: string;
}

export type IGroupHeaderStyleProps = Required<Pick<IGroupHeaderProps, 'theme'>> &
  Pick<IGroupHeaderProps, 'selected' | 'className'> & {
    /** Is Header collapsed */
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
