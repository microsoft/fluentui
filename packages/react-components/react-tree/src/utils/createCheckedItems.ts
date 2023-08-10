import { ImmutableMap } from './ImmutableMap';
import type { TreeSelectionValue } from '../Tree';
import type { TreeItemValue } from '../TreeItem';

export function createCheckedItems(iterable?: Iterable<TreeItemValue | [TreeItemValue, TreeSelectionValue]>) {
  if (iterable === undefined) {
    return ImmutableMap.empty;
  }
  if (ImmutableMap.isImmutableMap<TreeItemValue, TreeSelectionValue>(iterable)) {
    return iterable;
  }
  const internalMap = new Map<TreeItemValue, 'mixed' | boolean>();
  for (const item of iterable) {
    if (Array.isArray(item)) {
      internalMap.set(item[0], item[1]);
    } else {
      internalMap.set(item, true);
    }
  }
  return ImmutableMap.dangerouslyCreate_unstable(internalMap);
}
