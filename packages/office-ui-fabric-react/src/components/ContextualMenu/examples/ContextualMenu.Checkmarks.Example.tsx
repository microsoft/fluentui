import * as React from 'react';
import { IContextualMenuItem, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import './ContextualMenuExample.scss';

export interface IContextualMenuMultiselectExampleState {
  selection?: { [key: string]: boolean };
}

let keys: string[] = ['newItem', 'share', 'mobile', 'enablePrint', 'enableMusic', 'newSub', 'emailMessage', 'calendarEvent'];

export class ContextualMenuCheckmarksExample extends React.Component<any, IContextualMenuMultiselectExampleState> {

  constructor() {
    super();

    this._onToggleSelect = this._onToggleSelect.bind(this);

    this.state = {
      selection: {},
    };
  }

  public render() {
    let { selection } = this.state;

    return (
      <DefaultButton
        id='ContextualMenuButton2'
        text='Click for ContextualMenu'
        menuProps={
          {
            shouldFocusOnMount: true,
            items:
            [
              {
                key: keys[0],
                name: 'New',
                canCheck: true,
                isChecked: selection![keys[0]],
                onClick: this._onToggleSelect
              },
              {
                key: keys[1],
                name: 'Share',
                canCheck: true,
                isChecked: selection![keys[1]],
                onClick: this._onToggleSelect
              },
              {
                key: keys[2],
                name: 'Mobile',
                canCheck: true,
                isChecked: selection![keys[2]],
                onClick: this._onToggleSelect
              },
              {
                key: 'divider_1',
                itemType: ContextualMenuItemType.Divider
              },

              {
                key: keys[3],
                name: 'Print',
                canCheck: true,
                isChecked: selection![keys[3]],
                onClick: this._onToggleSelect
              },
              {
                key: keys[4],
                name: 'Music',
                canCheck: true,
                isChecked: selection![keys[4]],
                onClick: this._onToggleSelect
              },
              {
                key: keys[5],
                iconProps: {
                  iconName: 'MusicInCollectionFill'
                },
                subMenuProps: {
                  items: [
                    {
                      key: keys[6],
                      name: 'Email message',
                      canCheck: true,
                      isChecked: selection![keys[6]],
                      onClick: this._onToggleSelect
                    },
                    {
                      key: keys[7],
                      name: 'Calendar event',
                      canCheck: true,
                      isChecked: selection![keys[7]],
                      onClick: this._onToggleSelect
                    }
                  ],
                },
                name: 'Split Button',
                canCheck: true,
                isChecked: selection![keys[5]],
                split: true,
                onClick: this._onToggleSelect,
              },
            ]
          }
        }
      />
    );
  }

  private _onToggleSelect(ev?: React.MouseEvent<HTMLButtonElement>, item?: IContextualMenuItem) {
    let { selection } = this.state;
    ev!.preventDefault();
    selection![item!.key] = !selection![item!.key];

    this.setState({
      selection: selection
    });
  }
}