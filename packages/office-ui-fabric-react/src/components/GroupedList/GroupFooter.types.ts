import { IStyleFunctionOrObject } from '../../Utilities';
import { IGroupDividerProps } from './GroupedList.types';
import { IStyle } from '../../Styling';

export interface IGroupFooterProps extends IGroupDividerProps {
  /**
   * Style function to be passed in to override the themed or default styles
   */
  styles?: IStyleFunctionOrObject<IGroupFooterStyleProps, IGroupFooterStyles>;
}

export type IGroupFooterStyleProps = Required<Pick<IGroupFooterProps, 'theme'>> &
  Pick<IGroupFooterProps, 'selected' | 'className'> & {
    /** Whether the footer is collapsed */
    isCollapsed?: boolean;
  };

export interface IGroupFooterStyles {
  root: IStyle;
}
