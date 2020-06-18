import { ContextualMenuItemType } from '../../ContextualMenu';
export const itemsNonFocusable = [
  {
    key: 'newItem',
    name: 'New',
    icon: 'Add',
    itemType: ContextualMenuItemType.Normal,
    ariaLabel: 'New. Use left and right arrow keys to navigate',
    onClick: () => { return; },
    items: [
      {
        key: 'emailMessage',
        name: 'Email message',
        icon: 'Mail'
      },
      {
        key: 'calendarEvent',
        name: 'Calendar event',
        icon: 'Calendar'
      }
    ]
  },
  {
    key: 'upload',
    name: 'Upload',
    icon: 'Upload',
    itemType: ContextualMenuItemType.Normal,
    onClick: () => { return; },
    ['data-automation-id']: 'uploadNonFocusButton'
  }
];

export const farItemsNonFocusable = [
  {
    key: 'saveStatus',
    name: 'Your page has been saved',
    icon: 'CheckMark',
    itemType: ContextualMenuItemType.Header,
    ['data-automation-id']: 'saveStatusCheckMark'
  },
  {
    key: 'publish',
    name: 'Publish',
    icon: 'ReadingMode',
    itemType: ContextualMenuItemType.Normal,
    onClick: () => { return; }
  }
];