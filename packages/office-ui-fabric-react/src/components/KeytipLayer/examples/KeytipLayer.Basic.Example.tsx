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
import { DefaultButton, ActionButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

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
      <div>
        <KeytipLayer
          keytipStartSequences={ [this.startingKeySequence] }
          keytipExitSequences={ [this.startingKeySequence] }
          id={ 'test-id' }
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
              <DefaultButton
                keytipProps={ this.keytipMap.Button2Pivot1Keytip }
                text='Test Button 2'
                onClick={ () => { alert('Button 2'); } }
              />
              <DefaultButton
                keytipProps={ this.keytipMap.Button3Pivot1Keytip }
                text='Test Button 3'
                onClick={ () => { alert('Button 3'); } }
              />
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

  public componentDidMount(): void {
    // Manually add keytips to the KeytipManager for now
    // This should really be done in each component
    /*
    for (const component of Object.keys(this.keytipMap)) {
      registerKeytip(this.keytipMap[component]);
    }
    */
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