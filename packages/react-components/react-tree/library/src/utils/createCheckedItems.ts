import type { TreeSelectionValue } from '../Tree';
import type { TreeItemValue } from '../TreeItem';
import { ImmutableMap } from './ImmutableMap';

const tuplifyCheckedItem = (
  value: TreeItemValue | [TreeItemValue, TreeSelectionValue],
): [TreeItemValue, TreeSelectionValue] => (Array.isArray(value) ? value : [value, true]);

export const createCheckedItems = (
  iterable?: Iterable<TreeItemValue | [TreeItemValue, TreeSelectionValue]>,
): ImmutableMap<TreeItemValue, TreeSelectionValue> => ImmutableMap.from(iterable, tuplifyCheckedItem);
