import * as React from 'react';
import { IContextualMenuItem, ContextualMenuItemType, DirectionalHint } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import './ContextualMenuExample.scss';

export interface IContextualMenuMultiselectExampleState {
  selection?: { [key: string]: boolean };
}

const keys: string[] = [
  'newItem',
  'share',
  'mobile',
  'enablePrint',
  'enableMusic',
  'newSub',
  'emailMessage',
  'calendarEvent',
  'disabledNewSub',
  'disabledEmailMessage',
  'disabledCalendarEvent',
  'splitButtonSubMenuLeftDirection',
  'emailMessageLeft',
  'calendarEventLeft',
  'disabledPrimarySplit'
];

export class ContextualMenuCheckmarksExample extends React.Component<{}, IContextualMenuMultiselectExampleState> {
  constructor(props: {}) {
    super(props);

    this._onToggleSelect = this._onToggleSelect.bind(this);

    this.state = {
      selection: {}
    };
  }

  public render(): JSX.Element {
    const { selection } = this.state;

    return (
      <DefaultButton
        text="Click for ContextualMenu"
        menuProps={{
          shouldFocusOnMount: true,
          items: [
            {
              key: keys[0],
              text: 'New',
              canCheck: true,
              isChecked: selection![keys[0]],
              onClick: this._onToggleSelect
            },
            {
              key: keys[1],
              text: 'Share',
              canCheck: true,
              isChecked: selection![keys[1]],
              onClick: this._onToggleSelect
            },
            {
              key: keys[2],
              text: 'Mobile',
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
              text: 'Print',
              canCheck: true,
              isChecked: selection![keys[3]],
              onClick: this._onToggleSelect
            },
            {
              key: keys[4],
              text: 'Music',
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
                    text: 'Email message',
                    canCheck: true,
                    isChecked: selection![keys[6]],
                    onClick: this._onToggleSelect
                  },
                  {
                    key: keys[7],
                    text: 'Calendar event',
                    canCheck: true,
                    isChecked: selection![keys[7]],
                    onClick: this._onToggleSelect
                  }
                ]
              },
              text: 'Split Button',
              canCheck: true,
              isChecked: selection![keys[5]],
              split: true,
              onClick: this._onToggleSelect
            },
            {
              key: keys[8],
              iconProps: {
                iconName: 'MusicInCollectionFill'
              },
              subMenuProps: {
                items: [
                  {
                    key: keys[9],
                    text: 'Email message',
                    canCheck: true,
                    isChecked: selection![keys[9]],
                    onClick: this._onToggleSelect
                  },
                  {
                    key: keys[10],
                    text: 'Calendar event',
                    canCheck: true,
                    isChecked: selection![keys[10]],
                    onClick: this._onToggleSelect
                  }
                ]
              },
              text: 'Split Button',
              canCheck: true,
              isChecked: selection![keys[8]],
              split: true,
              onClick: this._onToggleSelect,
              disabled: true
            },
            {
              key: keys[11],
              iconProps: {
                iconName: 'MusicInCollectionFill'
              },
              subMenuProps: {
                directionalHint: DirectionalHint.leftCenter,
                items: [
                  {
                    key: keys[12],
                    text: 'Email message',
                    canCheck: true,
                    isChecked: selection![keys[12]],
                    onClick: this._onToggleSelect
                  },
                  {
                    key: keys[13],
                    text: 'Calendar event',
                    canCheck: true,
                    isChecked: selection![keys[13]],
                    onClick: this._onToggleSelect
                  }
                ]
              },
              text: 'Split Button Left Menu',
              canCheck: true,
              isChecked: selection![keys[11]],
              split: true,
              onClick: this._onToggleSelect
            },
            {
              key: keys[12],
              iconProps: {
                iconName: 'MusicInCollectionFill'
              },
              subMenuProps: {
                items: [
                  {
                    key: keys[12],
                    name: 'Email message',
                    canCheck: true,
                    isChecked: selection![keys[12]],
                    onClick: this._onToggleSelect
                  }
                ]
              },
              name: 'Split Button Disabled Primary',
              split: true,
              primaryDisabled: true
            }
          ]
        }}
      />
    );
  }

  private _onToggleSelect(ev?: React.MouseEvent<HTMLButtonElement>, item?: IContextualMenuItem): void {
    const { selection } = this.state;
    ev!.preventDefault();
    selection![item!.key] = !selection![item!.key];

    this.setState({
      selection: selection
    });
  }
}
