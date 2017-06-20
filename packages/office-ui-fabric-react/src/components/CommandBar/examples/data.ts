export const items = [
  {
    key: 'newItem',
    name: 'New',
    icon: 'Add',
    ariaLabel: 'New. Use left and right arrow keys to navigate',
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
    href: 'https://mytenenat.sharepoint.com/teams/IT/BPU/',
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
    key: 'disabled',
    name: 'Disabled...',
    icon: 'Cancel',
    disabled: true,
    onClick: () => { return; }
  }
];

export const textOnlyItems = [
  {
    key: 'upload',
    name: 'Upload',
    onClick: () => { return; }
  },
  {
    key: 'share',
    name: 'Share',
    onClick: () => { return; }
  },
  {
    key: 'download',
    name: 'Download',
    onClick: () => { return; }
  }
];

export const iconOnlyItems = [
  {
    key: 'upload',
    name: '',
    icon: 'Upload',
    onClick: () => { return; }
  },
  {
    key: 'share',
    name: '',
    icon: 'Share',
    onClick: () => { return; }
  },
  {
    key: 'download',
    name: '',
    icon: 'Download',
    onClick: () => { return; }
  },
  {
    key: 'move',
    name: '',
    icon: 'MoveToFolder',
    onClick: () => { return; }
  },
  {
    key: 'copy',
    name: '',
    icon: 'Copy',
    onClick: () => { return; }
  },
  {
    key: 'rename',
    name: '',
    icon: 'Edit',
    onClick: () => { return; }
  },
  {
    key: 'disabled',
    icon: 'Cancel',
    disabled: true,
    onClick: () => { return; }
  }
];

export const overflowItems = [
  {
    key: 'move',
    name: 'Move to...',
    icon: 'MoveToFolder'
  },
  {
    key: 'copy',
    name: 'Copy to...',
    icon: 'Copy'
  },
  {
    key: 'rename',
    name: 'Rename...',
    icon: 'Edit'
  }
];

export const farItems = [
  {
    key: 'sort',
    name: 'Sort',
    icon: 'SortLines',
    onClick: () => { return; }
  },
  {
    key: 'tile',
    name: 'Grid view',
    icon: 'Tiles',
    onClick: () => { return; }
  },
  {
    key: 'info',
    name: 'Info',
    icon: 'Info',
    onClick: () => { return; }
  }
];