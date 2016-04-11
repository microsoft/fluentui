import * as React from 'react';
import { ContextualMenu, IContextualMenuItem } from '../../../../components/index';

export interface IContextualMenuMultiselectExampleState {
  selection?: { [ key: string]: boolean };
}

let keys: string[] = [ 'newItem', 'share', 'mobile', 'enablePrint', 'enableMusic', 'newSub', 'emailMessage', 'calendarEvent' ];

export default class ContextualMenuCheckmarksExample extends React.Component<any, IContextualMenuMultiselectExampleState> {

  constructor() {
    super();

    this._onToggleSelect = this._onToggleSelect.bind(this);

    this.state = {
      selection: {}
    };
  }

  public render() {
    let { selection } = this.state;

    return (
      <ContextualMenu
        shouldFocusOnMount={ false }
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
      />
    );
  }

  private _onToggleSelect(item: IContextualMenuItem) {
    let { selection } = this.state;

    selection[item.key] = !selection[item.key];

    this.setState({
      selection: selection
    });
  }

}
