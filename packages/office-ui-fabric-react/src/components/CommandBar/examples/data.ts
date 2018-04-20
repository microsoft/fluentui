export const items = [
  {
    key: 'newItem',
    name: 'New',
    cacheKey: 'myCacheKey',
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