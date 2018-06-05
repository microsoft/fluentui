export const items = [
  {
    key: 'newItem',
    text: 'New',
    cacheKey: 'myCacheKey',
    iconProps: {
      iconName: 'Add'
    },
    ariaLabel: 'New. Use left and right arrow keys to navigate',
    ['data-automation-id']: 'newItemMenu',
    subMenuProps: {
      items: [
        {
          key: 'emailMessage',
          text: 'Email message',
          iconProps: {
            iconName: 'Mail'
          },
          ['data-automation-id']: 'newEmailButton'
        },
        {
          key: 'calendarEvent',
          text: 'Calendar event',
          iconProps: {
            iconName: 'Calendar'
          }
        }
      ]
    }
  },
  {
    key: 'upload',
    text: 'Upload',
    iconProps: {
      iconName: 'Upload'
    },
    href: 'https://dev.office.com/fabric',
    ['data-automation-id']: 'uploadButton'
  },
  {
    key: 'share',
    text: 'Share',
    iconProps: {
      iconName: 'Share'
    },
    onClick: () => console.log('Share')
  },
  {
    key: 'download',
    text: 'Download',
    iconProps: {
      iconName: 'Download'
    },
    onClick: () => console.log('Download')
  }
];

export const overflowItems = [
  {
    key: 'move',
    text: 'Move to...',
    iconProps: {
      iconName: 'MoveToFolder'
    }
  },
  {
    key: 'copy',
    text: 'Copy to...',
    iconProps: {
      iconName: 'Copy'
    }
  },
  {
    key: 'rename',
    text: 'Rename...',
    iconProps: {
      iconName: 'Edit'
    }
  }
];

export const farItems = [
  {
    key: 'sort',
    text: 'Sort',
    iconProps: {
      iconName: 'SortLines'
    },
    onClick: () => console.log('Sort')
  },
  {
    key: 'tile',
    text: 'Grid view',
    iconProps: {
      iconName: 'Tiles'
    },
    iconOnly: true,
    onClick: () => console.log('Tiles')
  },
  {
    key: 'info',
    text: 'Info',
    iconProps: {
      iconName: 'Info'
    },
    iconOnly: true,
    onClick: () => console.log('Info')
  }
];
