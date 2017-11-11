
import * as React from 'react';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { ICommandBarData } from './CommandBar';

export interface ICommandBar {
  /**
   * Sets focus to the active command in the list.
   */
  focus(): void;
}

export interface ICommandBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the ICommandBar interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ICommandBar) => void;

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
   * Text to be read by screen readers if there are overflow items and focus is on elipsis button
   */
  elipisisAriaLabel?: string;

  /**
  * Text to be read by screen readers if there are overflow items and focus is on elipsis button
  */
  elipisisIconProps?: IIconProps;

  /**
   * Custom styles to be mixed into individual button styles
   */
  buttonStyles?: IButtonStyles;

  /**
   * Custom render function for all non contextual menu buttons.
   */
  onRenderButton?: (item: ICommandBarItemProps) => JSX.Element;

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
   * Additional css class to apply to the command bar
   * @defaultvalue undefined
   */
  className?: string;
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
  styles?: IButtonStyles;

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
