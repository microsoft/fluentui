/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BreadcrumbBase, IBreadCrumbData } from './Breadcrumb.base';
import { IBaseProps, IRenderFunction } from '../../Utilities';
import { ITheme, IStyle, IStyleFunction } from '../../Styling';

export interface IBreadcrumb {
  /**
   * Focuses the active breadcrumb.
   */
  focus(): void;
}

export interface IBreadcrumbProps extends React.HTMLAttributes<HTMLDivElement>, IBaseProps {
  /**
   * Optional callback to access the IBreadcrumb interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IBreadcrumb) => void;

  /**
   * Theme (provided through customization.)
   */
  theme?: ITheme;

  /**
   * Collection of breadcrumbs to render
   */
  items: IBreadcrumbItem[];

  /**
   * Optional root classname for the root breadcrumb element.
   */
  className?: string;

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
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<IBreadcrumbStyleProps, IBreadcrumbStyles>;

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
   * If this breadcrumb item is the item the user is currently on, if set to true, aria-current="page" will be applied to this breadcrumb link
   */
  isCurrentItem?: boolean;
}

// Given these props:
export interface IBreadcrumbStyleProps {
  theme: ITheme;
  className?: string;
}

// We produce these styles.
export interface IBreadcrumbStyles {
  root: IStyle;
}
