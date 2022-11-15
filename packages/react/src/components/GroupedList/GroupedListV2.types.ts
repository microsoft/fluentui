import * as React from 'react';
import type { IGroupedListProps } from './GroupedList.types';
import { List } from '../../List';
import type { IGroup } from './GroupedList.types';

export interface IGroupedListV2Props extends IGroupedListProps {
  /** Ref to the underlying List control */
  listRef?: React.Ref<List>;

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
