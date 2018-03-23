import * as React from 'react';
import {
  convertSequencesToKeytipID,
  IKeytipTransitionKey,
  KeytipTransitionModifier,
  autobind
} from 'office-ui-fabric-react/lib/Utilities';
import { buildKeytipConfigMap, IKeytipConfigMap } from '../../../utilities/keytips';
import { keytipConfig } from './KeytipSetup';
import { KeytipLayer, } from 'office-ui-fabric-react/lib/KeytipLayer';
import { registerKeytip, addKeytipSequence } from '../../../utilities/keytips';
import { IKeytipProps } from 'office-ui-fabric-react/lib/Keytip';
import { DefaultButton, ActionButton, CompoundButton, IconButton, CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { OverflowSet, IOverflowSetItemProps } from 'office-ui-fabric-react/lib/OverflowSet';

export interface IKeytipLayerBasicExampleState {
  showModal: boolean;
  showMessageBar: boolean;
  items: IOverflowSetItemProps[];
  overflowItems: IOverflowSetItemProps[];
}

export class KeytipLayerBasicExample extends React.Component<{}, IKeytipLayerBasicExampleState> {

  private startingKeySequence: IKeytipTransitionKey = { key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt] };
  private keytipMap: IKeytipConfigMap = {};

  constructor(props: {}) {
    super(props);

    const overflowItem1Click = () => {
      console.log('first overflow item');
    };

    const overflowItem2Click = () => {
      console.log('second overflow item');
    };

    this.keytipMap = buildKeytipConfigMap(keytipConfig);

    // Setup state
    this.state = {
      showModal: false,
      showMessageBar: false,
      items: [
        {
          key: 'item1',
          name: 'Link 1',
          onClick: () => { return; },
          keytipProps: this.keytipMap.OverflowButton1
        },
        {
          key: 'item2',
          name: 'Link 2',
          onClick: () => { return; },
          keytipProps: this.keytipMap.OverflowButton2
        },
        {
          key: 'item3',
          name: 'Link 3',
          onClick: () => { return; },
          keytipProps: this.keytipMap.OverflowButton3
        }
      ],
      overflowItems: [
        {
          key: 'item5',
          name: 'Overflow Link 1',
          keytipProps: {
            ...this.keytipMap.OverflowButton5,
            onExecute: (el: HTMLElement | null) => {
              if (el) {
                el.click();
              } else {
                overflowItem1Click();
              }
            }
          },
          onClick: overflowItem1Click
        },
        {
          key: 'item6',
          name: 'Overflow Link 2',
          keytipProps: {
            ...this.keytipMap.OverflowButton6,
            hasChildrenNodes: true,
            onExecute: (el: HTMLElement | null) => {
              if (el) {
                el.click();
              } else {
                overflowItem2Click();
              }
            }
          },
          onClick: overflowItem2Click,
          subMenuProps: {
            items: [
              {
                key: 'overflowSubMenu1',
                name: 'Overflow Submenu Item 1',
                keytipProps: this.keytipMap.OverflowSubMenuButton1
              },
              {
                key: 'overflowSubMenu2',
                name: 'Overflow Submenu Item 2'
              }
            ]
          }
        }
      ]
    };
  }

  /* tslint:disable:jsx-ban-props jsx-no-lambda */
  public render(): JSX.Element {
    const divStyle = {
      width: '50%',
      display: 'inline-block',
      verticalAlign: 'top'
    };

    return (
      <div style={ { paddingBottom: '100px' } }>
        <KeytipLayer
          keytipStartSequences={ [this.startingKeySequence] }
          keytipExitSequences={ [this.startingKeySequence] }
          content='Alt Windows'
        />
        <p>Press Alt-Win to enable keytips, Esc to return up a level, and Alt-Win to exit keytip mode</p>
        <div>
          <div style={ divStyle }>
            <div>
              <ActionButton
                keytipProps={ this.keytipMap.Pivot1Keytip }
                text='Mock Pivot 1'
              />
            </div>
            <div>
              <DefaultButton
                keytipProps={ this.keytipMap.Button1Pivot1Keytip }
                text='Test Button 1'
                onClick={ () => { alert('Button 1'); } }
              />
              <CompoundButton
                keytipProps={ this.keytipMap.Button2Pivot1Keytip }
                text='Test Button 2'
                description={ 'Description here' }
                onClick={ () => { alert('Button 2'); } }
              />
              <DefaultButton
                keytipProps={ this.keytipMap.Button3Pivot1Keytip }
                text='Test Button 3'
                split={ true }
                onClick={ () => { alert('Button 3'); } }
                menuProps={ {
                  items: [
                    {
                      key: 'splitButtonMenuButton1',
                      name: 'Split Button Menu Item 1'
                    },
                    {
                      key: 'splitButtonMenuButton2',
                      name: 'Split Button Menu Item 2'
                    }
                  ]
                } }
              />
              <DefaultButton
                text='I do not have a keytip'
                onClick={ () => { alert('Button 4'); } }
              />
              <DefaultButton
                keytipProps={ this.keytipMap.Button5Pivot1Keytip }
                text='Test Button 5'
                onClick={ () => { alert('Button 5'); } }
                menuProps={ {
                  items: [
                    {
                      key: 'menuButtonItem1',
                      name: 'Menu Item 1'
                    },
                    {
                      key: 'menuButtonItem2',
                      name: 'Menu Item 2'
                    }
                  ]
                } }
              />
              <Checkbox
                keytipProps={ this.keytipMap.Checkbox1Pivot1Keytip }
                label={ 'Check Box' }
              />
              <Toggle keytipProps={ this.keytipMap.Toggle1Pivot1Keytip } onText={ 'Toggle On' } offText={ 'Toggle Off' } />
              <Link keytipProps={ this.keytipMap.Link1Pivot1Keytip } href={ 'http://www.bing.com' }>This is a link</Link>
              <ComboBox
                label={ 'Combo Box' }
                options={ [
                  { key: 'A', text: 'Option 1' },
                  { key: 'B', text: 'Option 2' },
                  { key: 'C', text: 'Option 3' },
                ] }
                keytipProps={ this.keytipMap.ComboBox1Pivot1Keytip }
              />
              <Dropdown
                label={ 'Dropdown' }
                keytipProps={ this.keytipMap.Dropdown1Pivot1Keytip }
                options={ [
                  { key: 'A', text: 'Option 1' },
                  { key: 'B', text: 'Option 2' },
                  { key: 'C', text: 'Option 3' },
                ] }
              />
              <SpinButton label={ 'Spin Button' } keytipProps={ this.keytipMap.SpinButton1Pivot1Keytip } />
            </div>
          </div>
          <div style={ divStyle }>
            <div>
              <ActionButton
                keytipProps={ this.keytipMap.Pivot2Keytip }
                text='Mock Pivot 2'
              />
            </div>
            <CommandBar
              items={
                [
                  {
                    key: 'commandBarItem1',
                    name: 'New',
                    icon: 'Add',
                    onClick: this._showModal,
                    keytipProps: this.keytipMap.CommandButton1Pivot2Keytip
                  },
                  {
                    key: 'commandBarItem2',
                    name: 'Upload',
                    icon: 'Upload',
                    onClick: this._showMessageBar,
                    keytipProps: this.keytipMap.CommandButton2Pivot2Keytip
                  }
                ]
              }
              farItems={
                [
                  {
                    key: 'farItem1',
                    name: 'SubMenu',
                    icon: 'SortLines',
                    keytipProps: this.keytipMap.CommandButton3Pivot2Keytip,
                    subMenuProps: {
                      items: [
                        {
                          key: 'emailMessage',
                          name: 'Email message',
                          icon: 'Mail',
                          keytipProps: this.keytipMap.SubmenuKeytip1,
                          onClick: () => { console.log('test1'); }
                        },
                        {
                          key: 'calendarEvent',
                          name: 'Calendar event',
                          icon: 'Calendar',
                          keytipProps: this.keytipMap.SubmenuKeytip2,
                          onClick: () => { console.log('test2'); },
                          subMenuProps: {
                            items: [
                              {
                                key: 'testButton',
                                name: 'Test Button',
                                keytipProps: this.keytipMap.SubmenuKeytip3,
                                onClick: () => { console.log('test3'); }
                              },
                              {
                                key: 'testButton2',
                                name: 'Test Button 2',
                                keytipProps: this.keytipMap.SubmenuKeytip4,
                                href: 'http://www.bing.com'
                              }
                            ]
                          }
                        },
                        {
                          key: 'splitButtonTest',
                          name: 'Split Button',
                          split: true,
                          keytipProps: this.keytipMap.SubmenuKeytip5,
                          subMenuProps: {
                            items: [
                              {
                                key: 'splitButtonSubMenu1',
                                name: 'Test Button',
                              },
                              {
                                key: 'splitButtonSubMenu2',
                                name: 'Test Button 2',
                                href: 'http://www.bing.com'
                              }
                            ]
                          }
                        }
                      ],
                    },
                  }
                ]
              }
            />
          </div>
          <div>
            <OverflowSet
              items={ this.state.items }
              overflowItems={ this.state.overflowItems }
              keytipSequences={ this.keytipMap.OverflowButton4.keySequences }
              onRenderOverflowButton={ this._onRenderOverflowButton }
              onRenderItem={ this._onRenderItem }
            />
            <DefaultButton
              text={ 'Move overflow items' }
              onClick={ this._toggleOverflowItems }
            />
          </div>
        </div>
        { this.state.showMessageBar &&
          <MessageBar messageBarType={ MessageBarType.success }>
            Success Uploading
          </MessageBar>
        }
        <Modal
          isOpen={ this.state.showModal }
          onDismiss={ this._hideModal }
          isBlocking={ false }
        >
          <h2>Hello this is a Modal</h2>
        </Modal>
      </div>
    );
  }

  private _onRenderItem(item: IOverflowSetItemProps): JSX.Element {
    return (
      <CommandBarButton
        { ...item }
        styles={ { root: { padding: '10px' } } }
        menuProps={ item.subMenuProps }
      >{ item.name }
      </CommandBarButton>
    );
  }

  @autobind
  private _onRenderOverflowButton(overflowItems: any[] | undefined): JSX.Element {
    return (
      <CommandBarButton
        menuIconProps={ { iconName: 'More' } }
        menuProps={ { items: overflowItems! } }
        keytipProps={ this.keytipMap.OverflowButton4 }
      />
    );
  }

  @autobind
  private _showModal(): void {
    this.setState({ showModal: true });
  }

  @autobind
  private _hideModal(): void {
    this.setState({ showModal: false });
  }

  @autobind
  private _showMessageBar(): void {
    this.setState({ showMessageBar: true });

    // Hide the MessageBar after 2 seconds
    setTimeout(this._hideMessageBar, 2000);
  }

  @autobind
  private _hideMessageBar(): void {
    this.setState({ showMessageBar: false });
  }

  @autobind
  private _toggleOverflowItems(): void {
    this.setState((prevState: IKeytipLayerBasicExampleState) => {
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
  }
}