// eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecated FOR STYLING (DECISIONS.md D16.5); re-exporting the identity class is the point.
export { List, listClassNames, renderList_unstable, useListStyles_unstable, useList_unstable } from './List';
export type { ListProps, ListSlots, ListState } from './List';

/* eslint-disable @typescript-eslint/no-deprecated -- deprecated FOR STYLING (DECISIONS.md D16.5); re-exporting the identity class is the point. */
export {
  ListItem,
  listItemClassNames,
  renderListItem_unstable,
  useListItemStyles_unstable,
  useListItem_unstable,
} from './ListItem';
/* eslint-enable @typescript-eslint/no-deprecated */
export type { ListItemProps, ListItemSlots, ListItemState } from './ListItem';

export { useListSelection } from './hooks';
