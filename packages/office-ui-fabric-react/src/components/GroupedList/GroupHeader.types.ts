import { IStyleFunctionOrObject } from '../../Utilities';
import { IGroupDividerProps } from './GroupedList.types';
import { IStyle } from '../../Styling';

export interface IGroupHeaderProps extends IGroupDividerProps {
  /**
   * Style function to be passed in to override the themed or default styles
   */
  styles?: IStyleFunctionOrObject<IGroupHeaderStyleProps, IGroupHeaderStyles>;

  /**
   * GroupedList id for aria-controls
   */
  groupedListId?: string;

  /** Native props for the GroupHeader expand and collapse button */
  expandButtonProps?: React.HTMLAttributes<HTMLButtonElement>;

  /** Native props for the GroupHeader select all button */
  selectAllButtonProps?: React.HTMLAttributes<HTMLButtonElement>;
}

export type IGroupHeaderStyleProps = Required<Pick<IGroupHeaderProps, 'theme'>> &
  Pick<IGroupHeaderProps, 'selected' | 'className'> & {
    /** Is Header collapsed */
    isCollapsed?: boolean;

    /** Whether the group header is in compact mode or not */
    compact?: boolean;
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
