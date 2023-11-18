import { ImmutableSet } from './ImmutableSet';
import type { TreeItemValue } from '../TreeItem';

export function createOpenItems(iterable?: Iterable<TreeItemValue>) {
  if (iterable === undefined) {
    return ImmutableSet.empty;
  }
  if (ImmutableSet.isImmutableSet<TreeItemValue>(iterable)) {
    return iterable;
  }
  return ImmutableSet.create(iterable);
}
