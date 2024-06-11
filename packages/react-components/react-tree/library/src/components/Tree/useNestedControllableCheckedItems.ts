import * as React from 'react';
import type { TreeCheckedChangeData, TreeProps } from './Tree.types';
import { ImmutableMap } from '../../utils/ImmutableMap';
import { createCheckedItems } from '../../utils/createCheckedItems';
import { TreeItemValue } from '../TreeItem/TreeItem.types';

export function useNestedCheckedItems(props: Pick<TreeProps, 'checkedItems'>) {
  return React.useMemo(() => createCheckedItems(props.checkedItems), [props.checkedItems]);
}

export function createNextNestedCheckedItems(
  data: Pick<TreeCheckedChangeData, 'selectionMode' | 'value' | 'checked'>,
  previousCheckedItems: ImmutableMap<TreeItemValue, 'mixed' | boolean>,
): ImmutableMap<TreeItemValue, 'mixed' | boolean> {
  if (data.selectionMode === 'single') {
    return ImmutableMap.create([[data.value, data.checked]]);
  }
  if (data.selectionMode === 'multiselect') {
    return previousCheckedItems.set(data.value, data.checked);
  }
  return previousCheckedItems;
}
