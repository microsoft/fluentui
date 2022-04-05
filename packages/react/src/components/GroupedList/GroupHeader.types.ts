import * as React from 'react';
import type { IStyleFunctionOrObject, IRenderFunction } from '../../Utilities';
import type { IGroupDividerProps } from './GroupedList.types';
import type { IStyle, ITheme } from '../../Styling';

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

  /** Defines the name of a custom icon to be used for group headers. If not set, the default icon will be used */
  expandButtonIcon?: string;

  /** Native props for the GroupHeader select all button */
  selectAllButtonProps?: React.HTMLAttributes<HTMLButtonElement>;

  /**
   * If provided, can be used to render a custom checkbox
   */
  onRenderGroupHeaderCheckbox?: IRenderFunction<IGroupHeaderCheckboxProps>;

  /**
   * Whether to use fast icon and check components. The icons can't be targeted by customization
   * but are still customizable via class names.
   * @defaultvalue true
   */
  useFastIcons?: boolean;
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

/**
 * {@docCategory GroupedList}
 */
export interface IGroupHeaderCheckboxProps {
  checked: boolean;
  theme?: ITheme;
}
