import * as React from 'react';
import type { IButtonClassNames } from '../../components/Button/BaseButton.classNames';
import type { ITheme } from '../../Styling';

export interface IButtonGridCellProps<T> {
  /**
   * The option that will be made available to the user
   */
  item: T;

  /**
   * Arbitrary unique string associated with this option
   */
  id: string;

  /**
   * If the this option should be disabled
   */
  disabled?: boolean;

  /**
   * If the cell is currently selected
   */
  selected?: boolean;

  onClick?: (item: T, event?: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * The render callback to handle rendering the item
   */
  onRenderItem: (item: T) => JSX.Element;

  onHover?: (item?: T, event?: React.MouseEvent<HTMLButtonElement>) => void;

  onFocus?: (item: T, event?: React.FocusEvent<HTMLButtonElement>) => void;

  /**
   * The accessible role for this option
   */
  role?: string;

  /**
   * className(s) to apply
   */
  className?: string;

  /**
   * CSS classes to apply when the cell is disabled
   */
  cellDisabledStyle?: string[];

  /**
   * CSS classes to apply when the cell is selected
   */
  cellIsSelectedStyle?: string[];

  /**
   * Index for this option
   */
  index?: number;

  /**
   * The label for this item.
   */
  label?: string;

  /**
   * Method to provide the classnames to style a button.
   * The default value for this prop is `getClassnames` defined in `BaseButton.classNames`.
   */
  getClassNames?: (
    theme: ITheme,
    className: string,
    variantClassName: string,
    iconClassName: string | undefined,
    menuIconClassName: string | undefined,
    disabled: boolean,
    checked: boolean,
    expanded: boolean,
    isSplit: boolean | undefined,
  ) => IButtonClassNames;

  onMouseEnter?: (ev: React.MouseEvent<HTMLButtonElement>) => boolean;

  onMouseMove?: (ev: React.MouseEvent<HTMLButtonElement>) => boolean;

  onMouseLeave?: (ev: React.MouseEvent<HTMLButtonElement>) => void;

  onWheel?: (ev: React.MouseEvent<HTMLButtonElement>) => void;

  onKeyDown?: (ev: React.KeyboardEvent<HTMLButtonElement>) => void;
}
