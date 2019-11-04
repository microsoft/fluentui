import * as React from 'react';
import { IContextualMenuItem } from '../../ContextualMenu';
import { IButtonStyles, IButtonProps } from '../../Button';
import { ICommandBarData } from './CommandBar.base';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject, IComponentAs } from '../../Utilities';
import { ITooltipHostProps } from '../../Tooltip';

/**
 * {@docCategory CommandBar}
 */
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

/**
 * {@docCategory CommandBar}
 */
export interface ICommandBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the ICommandBar interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ICommandBar>;

  /**
   * Items to render. ICommandBarItemProps extends IContextualMenuItem.
   */
  items: ICommandBarItemProps[];

  /**
   * Items to render on the right side (or left, in RTL). ICommandBarItemProps extends IContextualMenuItem.
   */
  farItems?: ICommandBarItemProps[];

  /**
   * Default items to have in the overflow menu. ICommandBarItemProps extends IContextualMenuItem.
   */
  overflowItems?: ICommandBarItemProps[];

  /**
   * Props to be passed to overflow button.
   * If `menuProps` are passed through this prop, any items provided will be prepended to any
   * computed overflow items.
   */
  overflowButtonProps?: IButtonProps;

  /**
   * Custom component for the overflow button.
   */
  overflowButtonAs?: IComponentAs<IButtonProps>;

  /**
   * Custom component for the near and far item buttons. Not used for overflow menu items.
   */
  buttonAs?: IComponentAs<IButtonProps>;

  /**
   * When true, items will be 'shifted' off the front of the array when reduced, and unshifted during grow.
   */
  shiftOnReduce?: boolean;

  /**
   * Custom function to reduce data if items do not fit in given space.
   * Return `undefined` if no more steps can be taken to avoid infinate loop.
   */
  onReduceData?: (data: ICommandBarData) => ICommandBarData | undefined;

  /**
   * Custom function to grow data if items are too small for the given space.
   * Return `undefined` if no more steps can be taken to avoid infinate loop.
   */
  onGrowData?: (data: ICommandBarData) => ICommandBarData | undefined;

  /**
   * Callback invoked when data has been reduced.
   */
  onDataReduced?: (movedItem: ICommandBarItemProps) => void;

  /**
   * Callback invoked when data has been grown.
   */
  onDataGrown?: (movedItem: ICommandBarItemProps) => void;

  /**
   * Function to be called every time data is rendered. It provides the data that was actually rendered.
   * A use case would be adding telemetry when a particular control is shown in an overflow or dropped
   * as a result of `onReduceData`, or to count the number of renders that an implementation of
   * `onReduceData` triggers.
   */
  dataDidRender?: (renderedData: any) => void;

  /**
   * Additional css class to apply to the command bar
   */
  className?: string;

  /**
   * Accessibility text to be read by the screen reader when the user's
   * focus enters the command bar. The screen reader will read this text
   * after reading information about the first focusable item in the command bar.
   */
  ariaLabel?: string;

  /**
   * Customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ICommandBarStyleProps, ICommandBarStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;
}

/**
 * ICommandBarItemProps extends IContextualMenuItem and adds a few CommandBar-specific props.
 * {@docCategory CommandBar}
 */
export interface ICommandBarItemProps extends IContextualMenuItem {
  /**
   * Show only an icon for this item, not text.
   * Does not apply if item is in the overflow.
   * @defaultvalue false
   */
  iconOnly?: boolean;

  /**
   * Props for the tooltip when in `iconOnly` mode.
   */
  tooltipHostProps?: ITooltipHostProps;

  /**
   * Custom styles for individual button
   */
  buttonStyles?: IButtonStyles;

  /**
   * A custom cache key to be used for this item. If `cacheKey` is changed, the cache will invalidate.
   * Defaults to `key` value.
   */
  cacheKey?: string;

  /**
   * Context under which the item is being rendered.
   * This value is mutated by the CommandBar and is useful for adjusting the `onRender` function.
   */
  renderedInOverflow?: boolean;

  /**
   * Method to override the render of the individual command bar button.
   * Not used when item is rendered in overflow.
   * @defaultvalue CommandBarButton
   */
  commandBarButtonAs?: IComponentAs<ICommandBarItemProps>;
}

/**
 * {@docCategory CommandBar}
 */
export interface ICommandBarStyleProps {
  theme: ITheme;
  className?: string;
}

/**
 * {@docCategory CommandBar}
 */
export interface ICommandBarStyles {
  root?: IStyle;
  primarySet?: IStyle;
  secondarySet?: IStyle;
}
