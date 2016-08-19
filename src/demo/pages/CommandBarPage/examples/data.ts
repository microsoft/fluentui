export const items = [
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
  },
  {
    key: 'share',
    name: 'Share',
    icon: 'share',
    onClick: () => { return; }
  },
  {
    key: 'download',
    name: 'Download',
    icon: 'download',
    onClick: () => { return; }
  },
  {
    key: 'move',
    name: 'Move to...',
    icon: 'folderMove',
    onClick: () => { return; }
  },
  {
    key: 'copy',
    name: 'Copy to...',
    icon: 'copy',
    onClick: () => { return; }
  },
  {
    key: 'rename',
    name: 'Rename...',
    icon: 'editBox',
    onClick: () => { return; }
  },
  {
    key: 'junk',
    name: 'Junk',
    icon: null,
    ariaLabel: 'Junk',
    items: [
      {
        key: 'option1',
        name: 'Option1',
        icon: 'mail'
      },
      {
        key: 'option2',
        name: 'Option2',
        icon: 'calendar'
      }
    ]
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
  },
  {
    key: 'move',
    name: 'Move to...',
    onClick: () => { return; }
  },
  {
    key: 'copy',
    name: 'Copy to...',
    onClick: () => { return; }
  },
  {
    key: 'rename',
    name: 'Rename...',
    onClick: () => { return; }
  }
];

export const iconOnlyItems = [
  {
    key: 'upload',
    name: '',
    icon: 'upload',
    onClick: () => { return; }
  },
  {
    key: 'share',
    name: '',
    icon: 'share',
    onClick: () => { return; }
  },
  {
    key: 'download',
    name: '',
    icon: 'download',
    onClick: () => { return; }
  },
  {
    key: 'move',
    name: '',
    icon: 'folderMove',
    onClick: () => { return; }
  },
  {
    key: 'copy',
    name: '',
    icon: 'copy',
    onClick: () => { return; }
  },
  {
    key: 'rename',
    name: '',
    icon: 'editBox',
    onClick: () => { return; }
  }
];

export const overflowItems = [
  {
    key: 'move',
    name: 'Move to...',
    icon: 'folderMove'
  },
  {
    key: 'copy',
    name: 'Copy to...',
    icon: 'copy'
  },
  {
    key: 'rename',
    name: 'Rename...',
    icon: 'editBox'
  }

];
export const farItems = [
  {
    key: 'sort',
    name: 'Sort',
    icon: 'sortLines',
    onClick: () => { return; }
  },
  {
    key: 'tile',
    name: 'Grid view',
    icon: 'tile',
    onClick: () => { return; }
  },
  {
    key: 'info',
    name: 'Info',
    icon: 'circleInfo',
    onClick: () => { return; }
  }
];