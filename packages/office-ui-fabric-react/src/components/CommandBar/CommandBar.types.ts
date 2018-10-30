import * as React from 'react';
import { IContextualMenuItem } from '../../ContextualMenu';
import { IButtonStyles, IButtonProps } from '../../Button';
import { ICommandBarData } from './CommandBar.base';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject, IComponentAs } from '../../Utilities';
import { ITooltipHostProps } from '../../Tooltip';

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
  componentRef?: IRefObject<ICommandBar>;

  /**
   * Items to render. ICommandBarItemProps extend IContextualMenuItem
   */
  items: ICommandBarItemProps[];

  /**
   * Items to render on the right side (or left, in RTL). ICommandBarItemProps extend IContextualMenuItem
   */
  farItems?: ICommandBarItemProps[];

  /**
   * Default items to have in the overflow menu. ICommandBarItemProps extend IContextualMenuItem
   */
  overflowItems?: ICommandBarItemProps[];

  /**
   * Props to be passed to overflow button.
   * If menuProps are passed through this prop, any items provided will be prepended to the top of the existing menu.
   */
  overflowButtonProps?: IButtonProps;

  /**
   * Custom button to be used as oveflow button
   */
  overflowButtonAs?: IComponentAs<IButtonProps>;

  /**
   * Custom button to be used as near and far items
   */
  buttonAs?: IComponentAs<IButtonProps>;

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
   * Accessibility text to be read by the screen reader when the user's
   * focus enters the command bar. The screen reader will read this text
   * after reading information about the first focusable item in the command
   * bar.
   */
  ariaLabel?: string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<ICommandBarStyleProps, ICommandBarStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;
}

// ICommandBarItemProps extends IContextualMenuItem and adds a few CommandBar specific props
export interface ICommandBarItemProps extends IContextualMenuItem {
  /**
   * Remove text when button is not in the overflow
   * @defaultvalue false
   */
  iconOnly?: boolean;

  /**
   * Props to pass into tooltip during iconOnly
   */
  tooltipHostProps?: ITooltipHostProps;

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

  /**
   * Method to override the render of the individual command bar button. Note, is not used when rendered in overflow
   * @defaultvalue CommandBarButton
   */
  commandBarButtonAs?: IComponentAs<ICommandBarItemProps>;
}

export interface ICommandBarStyleProps {
  theme: ITheme;
  className?: string;
}

export interface ICommandBarStyles {
  root?: IStyle;
  primarySet?: IStyle;
  secondarySet?: IStyle;
}
