import * as React from 'react';
import { IStyleFunctionOrObject } from '../../Utilities';
import { IGroupDividerProps } from './GroupedList.types';
import { IStyle } from '../../Styling';

/**
 * {@docCategory GroupedList}
 */
export interface IGroupHeaderProps extends IGroupDividerProps {
  /** Style function to be passed in to override the themed or default styles */
  styles?: IStyleFunctionOrObject<IGroupHeaderStyleProps, IGroupHeaderStyles>;

  /** GroupedList id for aria-controls */
  groupedListId?: string;

  /** Native props for the GroupHeader expand and collapse button */
  expandButtonProps?: React.HTMLAttributes<HTMLButtonElement>;

  /** Native props for the GroupHeader select all button */
  selectAllButtonProps?: React.HTMLAttributes<HTMLButtonElement>;

  /** Defines the number of items in the current set of listitems or treeitems */
  ariaSetSize?: number;

  /** Defines an element's number or position in the current set of listitems or treeitems */
  ariaPosInSet?: number;
}

/**
 * {@docCategory GroupedList}
 */
export type IGroupHeaderStyleProps = Required<Pick<IGroupHeaderProps, 'theme'>> &
  Pick<IGroupHeaderProps, 'selected' | 'className'> & {
    /** Is Header collapsed */
    isCollapsed?: boolean;

    /** Whether the group header is in compact mode or not */
    compact?: boolean;
  };

/**
 * {@docCategory GroupedList}
 */
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
