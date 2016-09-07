import * as React from 'react';

import { Pivot } from './Pivot';

export interface IPivot {
  /**
   * Gets the selected item.
   */
  selected: IPivotItem;

  /**
   * Sets the selected item. Item should be an item within the array provided by the items prop.
   */
  setSelected: (item: IPivotItem) => void;
}

export interface IPivotProps extends React.Props<Pivot> {
  /**
   * Pivot items, each containing details about the pivot title and content to render.
   */
  items: IPivotItem[];

  /**
   * Optional class name to mix into the root node.
   */
  className?: string;

  /**
   * Variation of the pivot to use.
   */
  linkFormat?: PivotLinkFormat;

  /**
   * Size of the pivot tabs.
   */
  linkSize?: PivotLinkSize;

  /**
   * Default selected pivot to select on intial render.
   * @default 0
   */
  defaultSelectedIndex?: number;

  /**
   * Allows the caller to override the default render for pivot titles.
   * @param props The props for the item
   * @param defaultRender The function to call to render the default content. This allows you to render your own title,
   * and then inject the default rendered content within your custom title.
   */
  onRenderPivotTitle?: (props: IPivotTitleProps, defaultRender: (props?: IPivotTitleProps) => JSX.Element) => JSX.Element;

  /**
   * Change event which is called when the selection changes.
   * @param item The item that was selected
   * @param the index of the item
   */
  onChange?: (item: IPivotItem, index: number) => void;
}

export interface IPivotTitleProps {
  /**
   * The item from the pivot 'items' prop to render.
   */
  item: IPivotItem;

  /**
   * The index of the item.
   */
  index: number;

  /**
   * If the item is currently selected.
   */
  isSelected: boolean;
}

export interface IPivotItem {
  /**
   * A required key value to uniquely identify the pivot item.
   */
  key: string;

  /**
   * The display name to render in the item tab.
   */
  name?: string;

  /**
   * The aria-label attribute value to render for the tab button.
   */
  ariaLabel?: string;

  /**
   * If the tab button is disabled.
   */
  disabled?: boolean;

  /**
   * Optional additional button props that will be mixed into the item's button.
   */
  buttonProps?: React.HTMLProps<HTMLButtonElement>;
}

export enum PivotLinkFormat {
  /**
   * Display Pivot Links as links
   */
  links,

  /**
   * Display Pivot Links as Tabs
   */
  tabs
}

export enum PivotLinkSize {

  /**
   * Display Link using normal font size
   */
  normal,

  /**
   * Display links using large font size
   */
  large
}