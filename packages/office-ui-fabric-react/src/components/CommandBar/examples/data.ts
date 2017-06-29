export const items = [
  {
    key: 'newItem',
    name: 'New',
    iconProps: {
      iconName: 'Add',
    },
    ariaLabel: 'New. Use left and right arrow keys to navigate',
    ['data-automation-id']: 'newItemMenu',
    subMenuProps: {
      items: [
        {
          key: 'emailMessage',
          name: 'Email message',
          iconProps: {
            iconName: 'Mail',
          },
          ['data-automation-id']: 'newEmailButton'
        },
        {
          key: 'calendarEvent',
          name: 'Calendar event',
          iconProps: {
            iconName: 'Calendar'
          },
        }
      ],
    },
  },
  {
    key: 'upload',
    name: 'Upload',
    iconProps: {
      iconName: 'Upload',
    },
    href: 'https://dev.office.com/fabric',
    ['data-automation-id']: 'uploadButton'
  },
  {
    key: 'share',
    name: 'Share',
    iconProps: {
      iconName: 'Share',
    },
    onClick: () => { return; }
  },
  {
    key: 'download',
    name: 'Download',
    iconProps: {
      iconName: 'Download',
    },
    onClick: () => { return; }
  },
  {
<<<<<<< HEAD
    key: 'move',
    name: 'Move to...',
    iconProps: {
      iconName: 'MoveToFolder',
    },
    onClick: () => { return; }
  },
  {
    key: 'copy',
    name: 'Copy to...',
    iconProps: {
      iconName: 'Copy',
    },
    onClick: () => { return; }
  },
  {
    key: 'rename',
    name: 'Rename...',
    iconProps: {
      iconName: 'Edit',
    },
    onClick: () => { return; }
  },
  {
=======
>>>>>>> master
    key: 'disabled',
    name: 'Disabled...',
    iconProps: {
      iconName: 'Cancel',
    },
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
    iconProps: {
      iconName: 'Upload',
    },
    onClick: () => { return; }
  },
  {
    key: 'share',
    name: '',
    iconProps: {
      iconName: 'Share',
    },
    onClick: () => { return; }
  },
  {
    key: 'download',
    name: '',
    iconProps: {
      iconName: 'Download',
    },
    onClick: () => { return; }
  },
  {
    key: 'move',
    name: '',
    iconProps: {
      iconName: 'MoveToFolder',
    },
    onClick: () => { return; }
  },
  {
    key: 'copy',
    name: '',
    iconProps: {
      iconName: 'Copy',
    },
    onClick: () => { return; }
  },
  {
    key: 'rename',
    name: '',
    iconProps: {
      iconName: 'Edit',
    },
    onClick: () => { return; }
  },
  {
    key: 'disabled',
    iconProps: {
      iconName: 'Cancel',
    },
    disabled: true,
    onClick: () => { return; }
  }
];

export const overflowItems = [
  {
    key: 'move',
    name: 'Move to...',
    iconProps: {
      iconName: 'MoveToFolder'
    },
  },
  {
    key: 'copy',
    name: 'Copy to...',
    iconProps: {
      iconName: 'Copy'
    },
  },
  {
    key: 'rename',
    name: 'Rename...',
    iconProps: {
      iconName: 'Edit'
    },
  }
];

export const farItems = [
  {
    key: 'sort',
    name: 'Sort',
    iconProps: {
      iconName: 'SortLines',
    },
    onClick: () => { return; }
  },
  {
    key: 'tile',
    name: 'Grid view',
    iconProps: {
      iconName: 'Tiles',
    },
    iconOnly: true,
    onClick: () => { return; }
  },
  {
    key: 'info',
    name: 'Info',
    iconProps: {
      iconName: 'Info',
    },
    iconOnly: true,
    onClick: () => { return; }
  }
];