import * as React from 'react';
import { List } from './List';

export interface IListProps extends React.Props<List> {
  /** Optional classname to append to root list. */
  className?: string;

  /** Items to render. */
  items?: any[];

  /** Method to call when trying to render an item. */
  onRenderCell?: (item?: any, index?: number) => React.ReactNode;

  /** Optional callback for monitoring when a page is added. */
  onPageAdded?: (page: IPage) => void;

  /** Optional callback for monitoring when a page is removed. */
  onPageRemoved?: (page: IPage) => void;

  /** Method called by the list to get how many items to render per page from specified index. */
  getItemCountForPage?: (itemIndex?: number, visibleRect?: ClientRect) => number;

  /**
   * Method called by the list to get the pixel height for a given page. By default, we measure the first
   * page's height and default all other pages to that height when calculating the surface space. It is
   * ideal to be able to adequately predict page heights in order to keep the surface space from jumping
   * in pixels, which has been seen to cause browser perforamnce issues.
   */
  getPageHeight?: (itemIndex?: number, visibleRect?: ClientRect) => number;

  /**
   * Method called by the list to derive the page style object. For spacer pages, the list will derive
   * the height and passed in heights will be ignored.
   */
  getPageStyle?: (page: IPage) => any;

  /**
   * In addition to the visible window, how many windowHeights should we render ahead.
   * @default 2
   */
  renderedWindowsAhead?: number;

  /**
   * In addition to the visible window, how many windowHeights should we render behind.
   * @default 2
   */
  renderedWindowsBehind?: number;

  /** Index in items array to start rendering from. Defaults to 0. */
  startIndex?: number;

  /** Number of items to render. Defaults to items.length. */
  renderCount?: number;
}

export interface IPage {
  key: string;
  items: any[];
  startIndex: number;
  itemCount: number;
  style: any;
  top: number;
  height: number;
}
