/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Breadcrumb, IBreadCrumbData } from './Breadcrumb';
import { IRenderFunction } from '../../Utilities';
import { ITheme } from '../../Styling';

export interface IBreadcrumb {

}

export interface IBreadcrumbClassNames {
  /**
   * The root element class name.
   */
  root: string;

  /**
   * The chevron in between crumbs.
   */
  chevron: string;

  /**
   * The crumb container.
   */
  crumb: string;

  /**
   * The button inside of a crumb with an onClick or href.
   */
  crumbButton: string;

  /**
   * The span inside of the crumb for read-only crumbs.
   */
  crumbLabel: string;

  /**
   * The textual content rendered in either the crumbButton or crumbLabel.
   */
  crumbTextContent: string;
}

export interface IBreadcrumbProps extends React.Props<Breadcrumb> {
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
   * Overridable function to derive the classNames.
   */
  getClassNames?: (theme?: ITheme, className?: string) => IBreadcrumbClassNames;

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