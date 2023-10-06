import * as React from 'react';
import type { IGroupedListProps } from './GroupedList.types';
import type { List, ScrollToMode } from '../../List';
import type { IGroup } from './GroupedList.types';

export interface IGroupedListV2Props extends IGroupedListProps {
  /** Ref to the underlying List control */
  listRef?: React.Ref<List>;

  /** Ref to the underlying List control */
  groupedListRef?: React.Ref<IGroupedListV2>;

  /**
   * For perf reasons, GroupedList avoids re-rendering unless certain props have changed.
   * Use this prop if you need to force it to re-render in other cases. You can pass any type of
   * value as long as it only changes (`===` comparison) when a re-render should happen.
   */
  version?: {};

  /**
   * For perf reasons, GroupedList avoids re-rendering unless certain props have changed.
   * Use this prop if you need to force it to re-render when a group has expanded or collapsed.
   * You can pass any type of value as long as it only changes (`===` comparison)
   * when a re-render should happen.
   */
  groupExpandedVersion?: {};

  /** Rendering callback to render the group items. */
  onRenderCell: (nestingDepth?: number, item?: any, index?: number, group?: IGroup) => React.ReactNode;
}

export interface IGroupedListV2 {
  scrollToIndex(index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode): void;
  getStartItemIndexInView(): number;
}

/**
 * An item rendered in a GroupedList.
 */
export type IItemGroupedItem = {
  type: 'item';
  group: IGroup;
  item: any;
  itemIndex: number;
};

/**
 * Item used for "show all" in a GroupedList.
 */
export type IShowAllGroupedItem = {
  type: 'showAll';
  group: IGroup;
};

/**
 * A footer in a GroupedList.
 */
export type IFooterGroupedItem = {
  type: 'footer';
  group: IGroup;
};

/**
 * A header in a GroupedList.
 */
export type IHeaderGroupedItem = {
  type: 'header';
  group: IGroup;
  groupId: string;
  groupIndex: number;
};

/**
 * Union of GroupedList item types.
 */
export type IGroupedItem = IItemGroupedItem | IShowAllGroupedItem | IFooterGroupedItem | IHeaderGroupedItem;
