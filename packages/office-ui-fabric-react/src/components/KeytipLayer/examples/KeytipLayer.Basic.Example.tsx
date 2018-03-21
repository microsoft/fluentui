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
import { DefaultButton, ActionButton, CompoundButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

export interface IKeytipLayerBasicExampleState {
  showModal: boolean;
  showMessageBar: boolean;
}

export class KeytipLayerBasicExample extends React.Component<{}, IKeytipLayerBasicExampleState> {

  private startingKeySequence: IKeytipTransitionKey = { key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt] };
  private keytipMap: IKeytipConfigMap = {};

  constructor(props: {}) {
    super(props);

    // Setup state
    this.state = {
      showModal: false,
      showMessageBar: false
    };

    this.keytipMap = buildKeytipConfigMap(keytipConfig);
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
}