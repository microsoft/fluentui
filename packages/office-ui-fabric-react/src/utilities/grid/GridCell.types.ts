import * as React from 'react';
import { IButtonClassNames } from '../../components/Button/BaseButton.classNames';
import { ITheme } from '../../Styling';

export interface IGridCellProps<T> {
  /**
   * The option that will be made available to the user
   */
  item: T;

  /**
   * Arbitrary unique string associated with this option
   */
  id: string;

  /**
   * Optional, if the this option should be diabled
   */
  disabled?: boolean;

  /**
   * Optional, if the cell is currently selected
   */
  selected?: boolean;

  /**
   * The on click handler
   */
  onClick?: (item: T) => void;

  /**
   * The render callback to handle rendering the item
   */
  onRenderItem: (item: T) => JSX.Element;

  /**
   * Optional, the onHover handler
   */
  onHover?: (item?: T) => void;

  /**
   * Optional, the onFocus handler
   */
  onFocus?: (item: T) => void;

  /**
   * The accessible role for this option
   */
  role?: string;

  /**
   * Optional, className(s) to apply
   */
  className?: string;

  /**
   * Optional, the CSS class used for when the cell is disabled
   */
  cellDisabledStyle?: string[];

  /**
   * Optional, the CSS class used for when the cell is selected
   */
  cellIsSelectedStyle?: string[];

  /**
   * Index for this option
   */
  index?: number;

  /**
   * The label for this item.
   * Visible text if this item is a header,
   * tooltip if is this item is normal
   */
  label?: string;

  /**
   * Method to provide the classnames to style a button.
   * The default value for this prop is the getClassnames func
   * defined in BaseButton.classnames.
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
    isSplit: boolean | undefined
  ) => IButtonClassNames;

  /**
   * Optional, mouseEnter handler.
   * @returns true if the event should be processed, false otherwise
   */
  onMouseEnter?: (ev: React.MouseEvent<HTMLButtonElement>) => boolean;

  /**
   * Optional, mouseMove handler
   * @returns true if the event should be processed, false otherwise
   */
  onMouseMove?: (ev: React.MouseEvent<HTMLButtonElement>) => boolean;

  /**
   * Optional, mouseLeave handler
   */
  onMouseLeave?: (ev: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Optional, onWheel handler
   */
  onWheel?: (ev: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Optional, onkeydown handler
   */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLButtonElement>) => void;
}
