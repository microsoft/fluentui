import { TreeItemId, TreeOpenChangeData } from '../Tree';
import { createImmutableSet, ImmutableSet } from './ImmutableSet';

export function updateOpenItems(
  data: TreeOpenChangeData,
  previousOpenItems: ImmutableSet<TreeItemId>,
): ImmutableSet<TreeItemId> {
  const id = data.event.currentTarget.id;
  const previousOpenItemsHasId = previousOpenItems.has(id);
  if (data.open ? previousOpenItemsHasId : !previousOpenItemsHasId) {
    return previousOpenItems;
  }
  const nextOpenItems = createImmutableSet(previousOpenItems);
  return data.open ? nextOpenItems.add(id) : nextOpenItems.delete(id);
}
