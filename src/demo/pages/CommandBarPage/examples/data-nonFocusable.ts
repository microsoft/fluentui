export const itemsNonFocusable = [
  {
    key: 'newItem',
    name: 'New',
    icon: 'circlePlus',
    ariaLabel: 'New. Use left and right arrow keys to navigate',
    onClick: () => { return; },
    items: [
      {
        key: 'emailMessage',
        name: 'Email message',
        icon: 'mail'
      },
      {
        key: 'calendarEvent',
        name: 'Calendar event',
        icon: 'calendar'
      }
    ]
  },
  {
    key: 'upload',
    name: 'Upload',
    icon: 'upload',
    onClick: () => { return; }
  }
];

export const farItemsNonFocusable = [
  {
    key: 'saveStatus',
    name: 'Your page has been saved',
    icon: 'check'
  },
  {
    key: 'publish',
    name: 'Publish',
    icon: 'story',
    onClick: () => { return; }
  }
];