import * as React from 'react';
import { ContextualMenu, IContextualMenuItem } from '../../../../index';
import './ContextualMenuExample.scss';
export interface IContextualMenuMultiselectExampleState {
  selection?: { [ key: string]: boolean };
  target?: {x: number, y: number};
  isContextMenuVisible?: boolean;
}

let keys: string[] = [ 'newItem', 'share', 'mobile', 'enablePrint', 'enableMusic', 'newSub', 'emailMessage', 'calendarEvent' ];

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
      <div className='ms-ContextualMenu-example-clickableArea'>
        <button onClick={this._onClick} className='ms-ContextualMenu-example-clickableArea'> </button>
        { this.state.isContextMenuVisible ? (
        <ContextualMenu
          targetPoint={this.state.target}
          useTargetPoint={true}
          shouldFocusOnMount={ false }
          onDismiss={this._onDismiss}
          items={
            [
              {
                key: keys[0],
                icon: 'circlePlus',
                name: 'New',
                canCheck: true,
                isChecked: selection[keys[0]],
                onClick: this._onToggleSelect
              },
              {
                key: keys[1],
                icon: 'share',
                name: 'Share',
                canCheck: true,
                isChecked: selection[keys[1]],
                onClick: this._onToggleSelect
              },
              {
                key: keys[2],
                icon: 'mobile',
                name: 'Mobile',
                canCheck: true,
                isChecked: selection[keys[2]],
                onClick: this._onToggleSelect
              },
              {
                key: 'divider_1',
                name: '-',
              },

              {
                key: keys[3],
                icon: 'print',
                name: 'Print',
                canCheck: true,
                isChecked: selection[keys[3]],
                onClick: this._onToggleSelect
              },
              {
                key: keys[4],
                icon: 'music',
                name: 'Music',
                canCheck: true,
                isChecked: selection[keys[4]],
                onClick: this._onToggleSelect
              },
              {
                key: keys[5],
                icon: 'circlePlus',
                items: [
                  {
                    key: keys[6],
                    name: 'Email message',
                    canCheck: true,
                    isChecked: selection[keys[6]],
                    onClick: this._onToggleSelect
                  },
                  {
                    key: keys[7],
                    name: 'Calendar event',
                    canCheck: true,
                    isChecked: selection[keys[7]],
                    onClick: this._onToggleSelect
                  }
                ],
                name: 'New'
              },
            ]
          }
        />) : (null)}
       </div>
    );
  }

  private _onToggleSelect(item: IContextualMenuItem) {
    let { selection } = this.state;

    selection[item.key] = !selection[item.key];

    this.setState({
      selection: selection
    });
  }

  private _onClick(event: any) {
    this.setState({target: {x: event.clientX, y: event.clientY}, isContextMenuVisible: true});
  }

  private _onDismiss(event: any) {
    this.setState({isContextMenuVisible: false});
  }

}
