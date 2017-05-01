import * as React from 'react';

import { Pivot } from './Pivot';
import { PivotItem } from './PivotItem';

export interface IPivot {

}

export interface IPivotProps extends React.Props<Pivot> {
  /**
   * Optional callback to access the IPivot interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IPivot) => void;

  /**
   * The index of the pivot item initially selected.
   *
   * It only works when initialSelectedKey is not defined. You must not use them together.
   */
  initialSelectedIndex?: number;

  /**
   * The key of the pivot item initially selected.
   *
   * It will make initialSelectedIndex not work. You must not use them together.
   */
  initialSelectedKey?: string;

  /**
   * The key of the selected pivot item.
   *
   * If set, this will override the Pivot's selected item state.
   */
  selectedKey?: string;

  /**
   * Callback issued when the selected pivot item is changed
   */
  onLinkClick?: (item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) => void;

  /**
   * Specify the PivotLinkSize to use (normal, large)
   */
  linkSize?: PivotLinkSize;

  /**
   * Specify the PivotLinkFormat to use (links, tabs)
   */
  linkFormat?: PivotLinkFormat;

}

export enum PivotLinkFormat {
  /**
   * Display Pivot Links as links
   */
  links = 0,

  /**
   * Display Pivot Links as Tabs
   */
  tabs = 1
}

export enum PivotLinkSize {

  /**
   * Display Link using normal font size
   */
  normal = 0,

  /**
   * Display links using large font size
   */
  large = 1
}
