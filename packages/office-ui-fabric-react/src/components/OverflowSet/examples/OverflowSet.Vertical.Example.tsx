import * as React from 'react';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { DirectionalHint } from 'office-ui-fabric-react/lib/common/DirectionalHint';
import { IOverflowSetItemProps, OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';

export class OverflowSetVerticalExample extends BaseComponent<any, any> {
  public render(): JSX.Element {
    return (
      <OverflowSet
        vertical
        items={[
          {
            key: 'item1',
            icon: 'Add',
            name: 'Link 1',
            ariaLabel: 'New. Use left and right arrow keys to navigate',
            onClick: () => {
              return;
            }
          },
          {
            key: 'item2',
            icon: 'Upload',
            name: 'Link 2',
            onClick: () => {
              return;
            }
          },
          {
            key: 'item3',
            icon: 'Share',
            name: 'Link 3',
            onClick: () => {
              return;
            }
          }
        ]}
        overflowItems={[
          {
            key: 'item4',
            icon: 'Mail',
            name: 'Overflow Link 1',
            onClick: () => {
              return;
            }
          },
          {
            key: 'item5',
            icon: 'Calendar',
            name: 'Overflow Link 2',
            onClick: () => {
              return;
            }
          }
        ]}
        onRenderOverflowButton={this._onRenderOverflowButton}
        onRenderItem={this._onRenderItem}
      />
    );
  }

  private _onRenderItem(item: IOverflowSetItemProps): JSX.Element {
    return (
      <TooltipHost content={item.name} calloutProps={{ directionalHint: DirectionalHint.rightCenter, beakWidth: 12 }}>
        <CommandBarButton styles={{ root: { padding: '10px' } }} iconProps={{ iconName: item.icon }} onClick={item.onClick} />
      </TooltipHost>
    );
  }

  private _onRenderOverflowButton(overflowItems: any[] | undefined): JSX.Element {
    return (
      <CommandBarButton
        styles={{ root: { padding: '10px' }, menuIcon: { fontSize: '16px' } }}
        menuIconProps={{ iconName: 'More' }}
        menuProps={{ items: overflowItems! }}
      />
    );
  }
}
