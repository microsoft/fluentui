import * as React from 'react';
import { CommandBarButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { IOverflowSetItemProps, OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';

const noOp = () => undefined;

export class OverflowSetCustomExample extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <OverflowSet
        items={[
          {
            key: 'search',
            onRender: () => {
              return <SearchBox placeholder="Search" styles={{ root: { marginBottom: 0, width: 200 } }} />;
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
            key: 'newItem',
            name: 'Add',
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
    return <CommandBarButton iconProps={{ iconName: item.icon }} menuProps={item.subMenuProps} text={item.name} />;
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
    return <CommandBarButton styles={buttonStyles} menuIconProps={{ iconName: 'More' }} menuProps={{ items: overflowItems! }} />;
  };
}
