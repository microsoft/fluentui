import { TreeOpenChangeData } from '../Tree';

export function updateOpenItems(data: TreeOpenChangeData, previousOpenSubtrees: string[]) {
  const id = data.event.currentTarget.id;
  if (data.open) {
    return previousOpenSubtrees.includes(id) ? previousOpenSubtrees : [...previousOpenSubtrees, id];
  }
  const nextOpenItems = previousOpenSubtrees.filter(value => value !== id);
  return nextOpenItems.length === previousOpenSubtrees.length ? previousOpenSubtrees : nextOpenItems;
}
