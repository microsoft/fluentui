import * as React from 'react';
import { IBreadCrumbData } from './Breadcrumb.base';
import { IIconProps } from '../../Icon';
import { IRefObject, IRenderFunction, IComponentAs, IStyleFunctionOrObject } from '../../Utilities';
import { ITheme, IStyle } from '../../Styling';

export interface IBreadcrumb {
  /**
   * Sets focus to the first breadcrumb link.
   */
  focus(): void;
}

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
   * Optional root classname for the root breadcrumb element.
   */
  className?: string;

  /**
   * Render a custom divider in place of the default chevron `>`
   */
  dividerAs?: IComponentAs<IDividerAsProps>;

  /**
   * The maximum number of breadcrumbs to display before coalescing.
   * If not specified, all breadcrumbs will be rendered.
   */
  maxDisplayedItems?: number;

  /** Method to call when trying to render an item. */

  onRenderItem?: IRenderFunction<IBreadcrumbItem>;

  /**
   * Method to call when reducing the length of the breadcrumb.
   * Return undefined to never reduce breadcrumb length
   */
  onReduceData?: (data: IBreadCrumbData) => IBreadCrumbData | undefined;

  /**
   * Aria label to place on the navigation landmark for breadcrumb
   */
  ariaLabel?: string;

  /**
   * Optional name to use for aria label on overflow button.
   */
  overflowAriaLabel?: string;

  /**
   * Optional index where overflow items will be collapsed. Defaults to 0.
   */
  overflowIndex?: number;

  styles?: IStyleFunctionOrObject<IBreadcrumbStyleProps, IBreadcrumbStyles>;
  theme?: ITheme;
}

export interface IBreadcrumbItem {
  /**
   * Text to display to the user for the breadcrumb
   */
  text: string;

  /**
   * Arbitrary unique string associated with the breadcrumb
   */
  key: string;

  /**
   * Callback issued when the breadcrumb is selected.
   */
  onClick?: (ev?: React.MouseEvent<HTMLElement>, item?: IBreadcrumbItem) => void;

  /**
   * Url to navigate to when this breadcrumb is clicked.
   */
  href?: string;

  /**
   * If this breadcrumb item is the item the user is currently on, if set to true, aria-current="page" will be applied to this
   * breadcrumb link
   */
  isCurrentItem?: boolean;
}

export interface IDividerAsProps extends IIconProps {
  /**
   * Optional breadcrumb item corresponds to left of the divider to be passed for custom rendering.
   * For overflowed items, it will be last item in the list
   */
  item?: IBreadcrumbItem;
}

export interface IBreadcrumbStyleProps {
  className?: string;
  theme: ITheme;
}
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
