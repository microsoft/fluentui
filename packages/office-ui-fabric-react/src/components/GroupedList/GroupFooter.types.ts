import { IStyleFunctionOrObject } from '../../Utilities';
import { IGroupDividerProps } from './GroupedList.types';
import { ITheme, IStyle } from '../../Styling';

export interface IGroupFooterProps extends IGroupDividerProps {
  /**
   * Theme provided by the Higher Order Component
   */
  theme?: ITheme;

  /**
   * Style function to be passed in to override the themed or default styles
   */
  styles?: IStyleFunctionOrObject<IGroupFooterStyleProps, IGroupFooterStyles>;

  /**
   * Custom classname
   */
  className?: string;
}

export type IGroupFooterStyleProps = Required<Pick<IGroupFooterProps, 'theme'>> &
  Pick<IGroupFooterProps, 'selected' | 'className'> & {
    /** Whether the footer is collapsed */
    isCollapsed?: boolean;
  };

export interface IGroupFooterStyles {
  root: IStyle;
}
