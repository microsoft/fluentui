import * as React from 'react';
import { CommandBarButton, IButtonStyles, IOverflowSetItemProps, OverflowSet, Checkbox } from 'office-ui-fabric-react';

const noOp = () => undefined;

const checkboxStyles = {
  root: {
    marginRight: 5
  }
};

export class OverflowSetCustomExample extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <OverflowSet
        aria-label="Custom Example"
        items={[
          {
            key: 'checkbox',
            onRender: () => {
              return <Checkbox role="menuitem" label="A Checkbox" styles={checkboxStyles} />;
            }
          },
          {
            key: 'newItem',
            name: 'New',
            icon: 'Add',
            ariaLabel: 'New. Use left and right arrow keys to navigate',
            onClick: noOp,
            subMenuProps: {
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
            }
          },
          {
            key: 'upload',
            name: 'Upload',
            icon: 'Upload',
            onClick: noOp
          },
          {
            key: 'share',
            name: 'Share',
            icon: 'Share',
            onClick: noOp
          }
        ]}
        overflowItems={[
          {
            key: 'move',
            name: 'Move to...',
            icon: 'MoveToFolder',
            onClick: noOp
          },
          {
            key: 'copy',
            name: 'Copy to...',
            icon: 'Copy',
            onClick: noOp
          },
          {
            key: 'rename',
            name: 'Rename...',
            icon: 'Edit',
            onClick: noOp
          },
          {
            key: 'disabled',
            name: 'Disabled...',
            icon: 'Cancel',
            disabled: true,
            onClick: noOp
          }
        ]}
        onRenderOverflowButton={this._onRenderOverflowButton}
        onRenderItem={this._onRenderItem}
      />
    );
  }

  private _onRenderItem = (item: IOverflowSetItemProps): JSX.Element => {
    if (item.onRender) {
      return item.onRender(item);
    }
    return <CommandBarButton role="menuitem" iconProps={{ iconName: item.icon }} menuProps={item.subMenuProps} text={item.name} />;
  };

  private _onRenderOverflowButton = (overflowItems: any[] | undefined): JSX.Element => {
    const buttonStyles: Partial<IButtonStyles> = {
      root: {
        minWidth: 0,
        padding: '0 4px',
        alignSelf: 'stretch',
        height: 'auto'
      }
    };
    return (
      <CommandBarButton
        ariaLabel="More items"
        role="menuitem"
        styles={buttonStyles}
        menuIconProps={{ iconName: 'More' }}
        menuProps={{ items: overflowItems! }}
      />
    );
  };
}
