import * as React from 'react';
import { keytipMap } from 'office-ui-fabric-react/lib/components/Keytip/examples/KeytipSetup';
import { IOverflowSetItemProps, OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';
import { CommandBarButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface IKeytipsOverflowExampleState {
  items: IOverflowSetItemProps[];
  overflowItems: IOverflowSetItemProps[];
}

export class KeytipsOverflowExample extends React.Component<{}, IKeytipsOverflowExampleState> {
  // Setup initial overflow items
  private _initialItems = [
    {
      key: 'item1',
      name: 'Link 1',
      onClick: () => {
        return;
      },
      keytipProps: keytipMap.OverflowButton1
    },
    {
      key: 'item2',
      name: 'Link 2',
      onClick: () => {
        return;
      },
      keytipProps: keytipMap.OverflowButton2
    },
    {
      key: 'item3',
      name: 'Link 3',
      onClick: () => {
        return;
      },
      keytipProps: keytipMap.OverflowButton3
    }
  ];

  private _initialOverflowItems = [
    {
      key: 'item5',
      name: 'Overflow Link 1',
      keytipProps: {
        ...keytipMap.OverflowButton5,
        onExecute: (el: HTMLElement | null) => {
          if (el) {
            el.click();
          } else {
            console.log('first overflow item');
          }
        }
      },
      onClick: () => {
        console.log('first overflow item');
      }
    },
    {
      key: 'item6',
      name: 'Overflow Link 2',
      keytipProps: {
        ...keytipMap.OverflowButton6,
        onExecute: (el: HTMLElement | null) => {
          if (el) {
            el.click();
          } else {
            console.log('second overflow item');
          }
        }
      },
      onClick: () => {
        console.log('second overflow item');
      },
      subMenuProps: {
        items: [
          {
            key: 'overflowSubMenu1',
            name: 'Overflow Submenu Item 1',
            keytipProps: keytipMap.OverflowSubMenuButton1
          },
          {
            key: 'overflowSubMenu2',
            name: 'Overflow Submenu Item 2'
          }
        ]
      }
    }
  ];

  constructor(props: {}) {
    super(props);

    // Setup state
    this.state = {
      items: this._initialItems,
      overflowItems: this._initialOverflowItems
    };
  }

  /* tslint:disable:jsx-ban-props jsx-no-lambda */
  public render() {
    return (
      <div>
        <p>
          Keytips in an overflow well have a special behavior. When a keytip goes into the overflow button menu, it will also register a
          'persisted' keytip that can be accessed from the top level as a shortcut. A shortcut to a normal button item will trigger that
          button. A shortcut to a menu button item will open the overflow button menu and then open that item's menu as well. In this
          example triggering 'T' and 'Y' will show off this functionality (see console messages).
        </p>
        <OverflowSet
          styles={{ root: { marginBottom: 28 } }}
          items={this.state.items}
          overflowItems={this.state.overflowItems}
          keytipSequences={keytipMap.OverflowButton4.keySequences}
          onRenderOverflowButton={this._onRenderOverflowButton}
          onRenderItem={this._onRenderItem}
        />

        <p>When an item is moved out of the overflow well, it behaves as a normal keytip.</p>
        <DefaultButton text={'Move overflow items'} onClick={this._toggleOverflowItems} />
      </div>
    );
  }

  private _onRenderItem(item: IOverflowSetItemProps): JSX.Element {
    return (
      <CommandBarButton {...item} styles={{ root: { padding: '10px' } }} menuProps={item.subMenuProps}>
        {item.name}
      </CommandBarButton>
    );
  }

  private _onRenderOverflowButton = (overflowItems: any[] | undefined): JSX.Element => {
    return (
      <CommandBarButton
        menuIconProps={{ iconName: 'More' }}
        menuProps={{ items: overflowItems! }}
        keytipProps={keytipMap.OverflowButton4}
      />
    );
  };

  private _toggleOverflowItems = (): void => {
    this.setState((prevState: IKeytipsOverflowExampleState) => {
      let items = prevState.items;
      let overflowItems = prevState.overflowItems;
      if (overflowItems.length) {
        // Move all overflowItems to items
        items = items.concat(overflowItems);
        overflowItems = [];
      } else {
        // Move last two items to overflowItems
        overflowItems = items.slice(-2);
        items = items.slice(0, -2);
      }
      return { items, overflowItems };
    });
  };
}
