
import * as React from 'react';
import { IContextualMenuItem, IContextualMenuProps } from '../../ContextualMenu';
import { IButtonStyles, IButtonProps } from '../../Button';
import { ICommandBarData } from './CommandBar.base';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunction, IComponentAs } from '../../Utilities';

export interface ICommandBar {
  /**
   * Sets focus to the active command in the list.
   */
  focus(): void;

  /**
   * Remeasures the available space.
   */
  remeasure(): void;
}

export interface ICommandBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the ICommandBar interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ICommandBar | null) => void;

  /**
   * Items to render
   */
  items: ICommandBarItemProps[];

  /**
 * Items to render on the right side (or left, in RTL).
 */
  farItems?: ICommandBarItemProps[];

  /**
   * Default items to have in the overflow menu
   */
  overflowItems?: ICommandBarItemProps[];

  /**
   * Props to be passed to overflow button
   */
  overflowButtonProps?: IButtonProps;

  /**
  * Custom button to be used as oveflow button
  */
  overflowButtonAs?: IComponentAs<IButtonProps>;

  /**
  * Menu props to be passed to overflow elipsis
  */
  overflowMenuProps?: Partial<IContextualMenuProps>;

  /**
  * Custom button to be used as near and far items
  */
  buttonAs?: IComponentAs<ICommandBarItemProps>;

  /**
  * When true, items will be 'shifted' off the front of the array when reduced, and unshifted during grow
  */
  shiftOnReduce?: Boolean;

  /**
   * Custom function to reduce data if items do not fit in given space. Return `undefined`
   * if no more steps can be taken to avoid infinate loop.
   */
  onReduceData?: (data: ICommandBarData) => ICommandBarData;

  /**
   * Custom function to grow data if items are too small for the given space.
   * Return `undefined` if no more steps can be taken to avoid infinate loop.
   */
  onGrowData?: (data: ICommandBarData) => ICommandBarData;

  /**
   * Function callback invoked when data has been reduced.
   */
  onDataReduced?: (movedItem: ICommandBarItemProps) => void;

  /**
   * Function callback invoked when data has been grown.
   */
  onDataGrown?: (movedItem: ICommandBarItemProps) => void;

  /**
   * Additional css class to apply to the command bar
   * @defaultvalue undefined
   */
  className?: string;

  /**
  * Call to provide customized styling that will layer on top of the variant rules
  */
  getStyles?: IStyleFunction<ICommandBarStyleProps, ICommandBarStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;
}

export interface ICommandBarItemProps extends IContextualMenuItem {

  /**
   * Remove text when button is not in the overflow
   * @defaultvalue false
   */
  iconOnly?: boolean;

  /**
   * Custom styles for individual button
   */
  buttonStyles?: IButtonStyles;

  /**
   * A custom cache key to be used for this item. If cacheKey is changed, the cache will invalidate. Defaults to key value;
   */
  cacheKey?: string;

  /**
   * Context under which the item is being rendered
   * This value is controlled by the component and useful for adjusting onRender function
   */
  renderedInOverflow?: boolean;

}

export interface ICommandBarStyleProps {
  theme: ITheme;
  className?: string;
  endAligned?: boolean;
}

export interface ICommandBarStyles {
  root?: IStyle;
  primarySet?: IStyle;
  secondarySet?: IStyle;
}