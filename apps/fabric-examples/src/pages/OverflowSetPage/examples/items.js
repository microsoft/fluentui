export const items = [
  {
    key: 'newItem',
    name: 'New',
    icon: 'Add',
    ariaLabel: 'New. Use left and right arrow keys to navigate',
    onClick: () => { return; },
    ['data-automation-id']: 'newItemMenu',
    subMenuProps: {
      items: [
        {
          key: 'emailMessage',
          name: 'Email message',
          icon: 'Mail',
          ['data-automation-id']: 'newEmailButton'
        },
        {
          key: 'calendarEvent',
          name: 'Calendar event',
          icon: 'Calendar'
        }
      ],
    },
  },
  {
    key: 'upload',
    name: 'Upload',
    icon: 'Upload',
    onClick: () => { return; },
    ['data-automation-id']: 'uploadButton'
  },
  {
    key: 'share',
    name: 'Share',
    icon: 'Share',
    onClick: () => { return; }
  },
  {
    key: 'download',
    name: 'Download',
    icon: 'Download',
    onClick: () => { return; }
  },
  {
    key: 'move',
    name: 'Move to...',
    icon: 'MoveToFolder',
    onClick: () => { return; }
  },
  {
    key: 'copy',
    name: 'Copy to...',
    icon: 'Copy',
    onClick: () => { return; }
  },
  {
    key: 'rename',
    name: 'Rename...',
    icon: 'Edit',
    onClick: () => { return; }
  },
  {
    key: 'disabled',
    name: 'Disabled...',
    icon: 'Cancel',
    disabled: true,
    onClick: () => { return; }
  }
];
