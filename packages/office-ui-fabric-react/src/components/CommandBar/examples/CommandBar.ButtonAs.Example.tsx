import * as React from 'react';

import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { CommandBarButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { DirectionalHint } from 'office-ui-fabric-react/lib/components/Callout';

export class CommandBarButtonAsExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const customButton = (props: IButtonProps) => {
      const buttonOnMouseClick: IButtonProps['onClick'] = ev => alert(`${props.text} clicked`);
      return (
        <CommandBarButton
          {...props}
          onClick={buttonOnMouseClick}
          styles={{
            ...props.styles,
            textContainer: { fontSize: 18 },
            icon: { color: 'red' }
          }}
        />
      );
    };

    return (
      <div>
        <CommandBar
          overflowButtonProps={{
            menuProps: {
              items: [], // Items must be passed for typesafety, but commandBar will determine items rendered in overflow
              isBeakVisible: true,
              beakWidth: 20,
              gapSpace: 10,
              directionalHint: DirectionalHint.topCenter
            }
          }}
          buttonAs={customButton}
          items={items}
          overflowItems={overflowItems}
          farItems={farItems}
          ariaLabel={'Use left and right arrow keys to navigate between commands'}
        />
      </div>
    );
  }
}

// Data for CommandBar
const items: ICommandBarItemProps[] = [
  {
    key: 'newItem',
    name: 'New',
    cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
    iconProps: {
      iconName: 'Add'
    },
    ariaLabel: 'New. Use left and right arrow keys to navigate',
    subMenuProps: {
      items: [
        {
          key: 'emailMessage',
          name: 'Email message',
          iconProps: {
            iconName: 'Mail'
          },
          ['data-automation-id']: 'newEmailButton'
        },
        {
          key: 'calendarEvent',
          name: 'Calendar event',
          iconProps: {
            iconName: 'Calendar'
          }
        }
      ]
    }
  },
  {
    key: 'upload',
    name: 'Upload',
    iconProps: {
      iconName: 'Upload'
    },
    href: 'https://dev.office.com/fabric',
    ['data-automation-id']: 'uploadButton'
  },
  {
    key: 'share',
    name: 'Share',
    iconProps: {
      iconName: 'Share'
    }
  },
  {
    key: 'download',
    name: 'Download',
    iconProps: {
      iconName: 'Download'
    }
  }
];

const overflowItems: ICommandBarItemProps[] = [
  {
    key: 'move',
    name: 'Move to...',
    iconProps: {
      iconName: 'MoveToFolder'
    }
  },
  {
    key: 'copy',
    name: 'Copy to...',
    iconProps: {
      iconName: 'Copy'
    }
  },
  {
    key: 'rename',
    name: 'Rename...',
    iconProps: {
      iconName: 'Edit'
    }
  }
];

const farItems: ICommandBarItemProps[] = [
  {
    key: 'sort',
    name: 'Sort',
    iconProps: {
      iconName: 'SortLines'
    }
  },
  {
    key: 'tile',
    name: 'Grid view',
    iconProps: {
      iconName: 'Tiles'
    },
    iconOnly: true
  },
  {
    key: 'info',
    name: 'Info',
    iconProps: {
      iconName: 'Info'
    },
    iconOnly: true
  }
];
