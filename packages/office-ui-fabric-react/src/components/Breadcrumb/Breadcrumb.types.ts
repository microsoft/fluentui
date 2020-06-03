import * as React from 'react';
import { IIconProps } from '../../Icon';
import { IRefObject, IRenderFunction, IComponentAs, IStyleFunctionOrObject } from '../../Utilities';
import { ITheme, IStyle } from '../../Styling';
import { IFocusZoneProps } from '../../FocusZone';
import { ITooltipHostProps } from '../../Tooltip';
import { IButtonProps } from '../Button/Button.types';

/**
 * {@docCategory Breadcrumb}
 */
export interface IBreadcrumbData {
  props: IBreadcrumbProps;
  renderedItems: IBreadcrumbItem[];
  renderedOverflowItems: IBreadcrumbItem[];
}

/**
 * {@docCategory Breadcrumb}
 */
export interface IBreadcrumb {
  /**
   * Sets focus to the first breadcrumb link.
   */
  focus(): void;
}

/**
 * {@docCategory Breadcrumb}
 */
export interface IBreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IBreadcrumb interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IBreadcrumb>;

  /**
   * Collection of breadcrumbs to render
   */
  items: IBreadcrumbItem[];

  /**
   * Optional class for the root breadcrumb element.
   */
  className?: string;

  /**
   * Render a custom divider in place of the default chevron `>`
   */
  dividerAs?: IComponentAs<IDividerAsProps>;

  /**
   * Render a custom overflow icon in place of the default icon `...`
   */
  onRenderOverflowIcon?: IRenderFunction<IButtonProps>;
  /**
   * The maximum number of breadcrumbs to display before coalescing.
   * If not specified, all breadcrumbs will be rendered.
   */
  maxDisplayedItems?: number;

  /** Custom render function for each breadcrumb item. */
  onRenderItem?: IRenderFunction<IBreadcrumbItem>;

  /**
   * Method that determines how to reduce the length of the breadcrumb.
   * Return undefined to never reduce breadcrumb length.
   */
  onReduceData?: (data: IBreadcrumbData) => IBreadcrumbData | undefined;

  /**
   * Method that determines how to group the length of the breadcrumb.
   * Return undefined to never increase breadcrumb length.
   */
  onGrowData?: (data: IBreadcrumbData) => IBreadcrumbData | undefined;

  /**
   * Aria label for the root element of the breadcrumb (which is a navigation landmark).
   */
  ariaLabel?: string;

  /**
   * Aria label for the overflow button.
   */
  overflowAriaLabel?: string;

  /**
   * Optional index where overflow items will be collapsed. Defaults to 0.
   */
  overflowIndex?: number;

  styles?: IStyleFunctionOrObject<IBreadcrumbStyleProps, IBreadcrumbStyles>;
  theme?: ITheme;

  /**
   * Extra props for the root FocusZone.
   */
  focusZoneProps?: IFocusZoneProps;

  /**
   * Extra props for the TooltipHost which wraps each breadcrumb item.
   */
  tooltipHostProps?: ITooltipHostProps;
}

/**
 * {@docCategory Breadcrumb}
 */
export interface IBreadcrumbItem {
  /**
   * Text to display to the user for the breadcrumb item.
   */
  text: string;

  /**
   * Arbitrary unique string associated with the breadcrumb item.
   */
  key: string;

  /**
   * Callback issued when the breadcrumb item is selected.
   */
  onClick?: (ev?: React.MouseEvent<HTMLElement>, item?: IBreadcrumbItem) => void;

  /**
   * Url to navigate to when this breadcrumb item is clicked.
   */
  href?: string;

  /**
   * Whether this is the breadcrumb item the user is currently navigated to.
   * If true, `aria-current="page"` will be applied to this breadcrumb item.
   */
  isCurrentItem?: boolean;

  /**
   * Optional prop to render the item as a heading of your choice.
   *
   * You can also use this to force items to render as links instead of buttons (by default,
   * any item with a `href` renders as a link, and any item without a `href` renders as a button).
   * This is not generally recommended because it may prevent activating the link using the keyboard.
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'a';
}

/**
 * {@docCategory Breadcrumb}
 */
export interface IDividerAsProps extends IIconProps {
  /**
   * Breadcrumb item to left of the divider to be passed for custom rendering.
   * For overflowed items, it will be last item in the list.
   */
  item?: IBreadcrumbItem;
}

/**
 * {@docCategory Breadcrumb}
 */
export interface IBreadcrumbStyleProps {
  className?: string;
  theme: ITheme;
}

/**
 * {@docCategory Breadcrumb}
 */
export interface IBreadcrumbStyles {
  root: IStyle;
  list: IStyle;
  listItem: IStyle;
  chevron: IStyle;
  overflow: IStyle;
  overflowButton: IStyle;
  itemLink: IStyle;
  item: IStyle;
}
