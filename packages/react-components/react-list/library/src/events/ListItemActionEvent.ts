import type * as React from 'react';
import type { ListItemActionEventData } from '../components/ListItem/ListItem.types';

export const ListItemActionEventName = 'ListItemAction' satisfies ListItemActionEventData['type'];

export interface ListItemActionEventDetail {
  originalEvent: Extract<
    ListItemActionEventData,
    { type: typeof ListItemActionEventName }
  >['event']['detail']['originalEvent'];
}

export type ListItemActionEvent = CustomEvent<ListItemActionEventDetail>;

export const createListItemActionEvent = (
  originalEvent: React.MouseEvent | React.KeyboardEvent,
): CustomEvent<ListItemActionEventDetail> =>
  new CustomEvent<ListItemActionEventDetail>(ListItemActionEventName, {
    cancelable: true,
    bubbles: true,
    detail: { originalEvent },
  });
