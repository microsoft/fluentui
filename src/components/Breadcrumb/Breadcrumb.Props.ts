/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import Breadcrumb from './Breadcrumb';

export interface IBreadcrumbProps extends React.Props<Breadcrumb> {
  /**
   * Collection of breadcrumbs to render
   */
  breadcrumbs: IBreadcrumb[];

  /**
   * The maximum number of breadcrumbs to display before coalescing.
   * If not specified, all breadcrumbs will be rendered.
   */
  maxDisplayedBreadcrumbs?: number;
}

export interface IBreadcrumb {
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
  onClick?: (key?: any) => void;
}