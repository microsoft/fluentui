import * as React from 'react';

export const ListItemActionEventName = 'ListItemAction';

export interface ListItemActionEventDetail {
  originalEvent: React.MouseEvent | React.KeyboardEvent;
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
