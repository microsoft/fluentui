import * as React from 'react';
import { ContextualMenu, IContextualMenuItem, DirectionalHint, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import './ContextualMenuExample.scss';

export interface IContextualMenuMultiselectExampleState {
  selection?: { [key: string]: boolean };
  isContextMenuVisible?: boolean;
}

let keys: string[] = ['newItem', 'share', 'mobile', 'enablePrint', 'enableMusic', 'newSub', 'emailMessage', 'calendarEvent'];

export class ContextualMenuCheckmarksExample extends React.Component<any, IContextualMenuMultiselectExampleState> {

  constructor() {
    super();

    this._onToggleSelect = this._onToggleSelect.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onDismiss = this._onDismiss.bind(this);

    this.state = {
      selection: {},
      isContextMenuVisible: false
    };
  }

  public render() {
    let { selection } = this.state;

    return (
      <div>
        <DefaultButton
          onClick={ this._onClick } id='ContextualMenuButton2'
          text='Click for ContextualMenu'
        />
        { this.state.isContextMenuVisible ? (
          <ContextualMenu
            target='#ContextualMenuButton2'
            shouldFocusOnMount={ false }
            onDismiss={ this._onDismiss }
            directionalHint={ DirectionalHint.bottomLeftEdge }
            items={
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
                  name: 'New'
                },
              ]
            }
          />) : (null) }
      </div>
    );
  }

  private _onToggleSelect(ev?: React.MouseEvent<HTMLButtonElement>, item?: IContextualMenuItem) {
    let { selection } = this.state;

    selection![item!.key] = !selection![item!.key];

    this.setState({
      selection: selection
    });
  }

  private _onClick(event: React.MouseEvent<HTMLButtonElement>) {
    this.setState({ isContextMenuVisible: true });
  }

  private _onDismiss() {
    this.setState({ isContextMenuVisible: false });
  }

}
