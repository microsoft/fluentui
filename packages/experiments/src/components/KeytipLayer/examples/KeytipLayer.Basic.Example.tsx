import * as React from 'react';
import { convertSequencesToKeytipID } from '../../../utilities/keysequence/IKeySequence';
import { IKeytipTransitionKey } from '../../../utilities/keysequence/IKeytipTransitionKey';
import { registerKeytip, addKeytipSequence } from '../../../utilities/keytip/KeytipUtils';
import { KeytipLayer } from '@uifabric/experiments/lib/KeytipLayer';
import { IKeytipProps, KeytipTransitionModifier } from '@uifabric/experiments/lib/Keytip';
import { DefaultButton, ActionButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export interface IKeytipLayerBasicExampleState {
  showModal: boolean;
  showMessageBar: boolean;
}

export interface IKeytipMap {
  [componentKeytipId: string]: IKeytipProps;
}

export class KeytipLayerBasicExample extends React.Component<{}, IKeytipLayerBasicExampleState> {

  private startingKeySequence: IKeytipTransitionKey = { key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt] };
  private keytipMap: IKeytipMap = {};

  constructor(props: {}) {
    super(props);

    // Setup state
    this.state = {
      showModal: false,
      showMessageBar: false
    };

    // Setup keytips
    this.keytipMap.Pivot1Keytip = {
      content: 'A',
      keySequences: [{ keys: ['a'] }]
    } as IKeytipProps;

    this.keytipMap.Pivot2Keytip = {
      content: 'B',
      keySequences: [{ keys: ['b'] }]
    } as IKeytipProps;

    this.keytipMap.Button1Pivot1Keytip = {
      content: '1B',
      keySequences: addKeytipSequence(this.keytipMap.Pivot1Keytip.keySequences, { keys: ['1', 'b'] }),
      onExecute: (el: HTMLElement) => {
        el.click();
      }
    } as IKeytipProps;

    this.keytipMap.Button2Pivot1Keytip = {
      content: '1A',
      keySequences: addKeytipSequence(this.keytipMap.Pivot1Keytip.keySequences, { keys: ['1', 'a'] }),
      onExecute: (el: HTMLElement) => {
        el.click();
      }
    } as IKeytipProps;

    this.keytipMap.Button3Pivot1Keytip = {
      content: 'M',
      keySequences: addKeytipSequence(this.keytipMap.Pivot1Keytip.keySequences, { keys: ['m'] }),
      onExecute: (el: HTMLElement) => {
        el.click();
      }
    } as IKeytipProps;

    this.keytipMap.CommandButton1Pivot2Keytip = {
      content: '2',
      keySequences: addKeytipSequence(this.keytipMap.Pivot2Keytip.keySequences, { keys: ['2'] }),
      onExecute: (el: HTMLElement) => {
        el.click();
      }
    } as IKeytipProps;

    this.keytipMap.CommandButton2Pivot2Keytip = {
      content: 'Y',
      keySequences: addKeytipSequence(this.keytipMap.Pivot2Keytip.keySequences, { keys: ['y'] }),
      onExecute: (el: HTMLElement) => {
        el.click();
      }
    } as IKeytipProps;

    this.keytipMap.CommandButton3Pivot2Keytip = {
      content: 'LK',
      keySequences: addKeytipSequence(this.keytipMap.Pivot2Keytip.keySequences, { keys: ['l', 'k'] }),
      onExecute: (el: HTMLElement) => {
        el.click();
      }
    } as IKeytipProps;
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
        <p>Press Alt-Win to enable keytips, Esc to return up a level, and Alt-Win to exit keytip mode</p>
        <div>
          <div style={ divStyle }>
            <div>
              <ActionButton
                data-ktp-id={ convertSequencesToKeytipID(this.keytipMap.Pivot1Keytip.keySequences) }
                text='Mock Pivot 1'
              />
            </div>
            <div>
              <DefaultButton
                data-ktp-id={ convertSequencesToKeytipID(this.keytipMap.Button1Pivot1Keytip.keySequences) }
                text='Test Button 1'
                onClick={ () => { alert('Button 1'); } }
              />
              <DefaultButton
                data-ktp-id={ convertSequencesToKeytipID(this.keytipMap.Button2Pivot1Keytip.keySequences) }
                text='Test Button 2'
                onClick={ () => { alert('Button 2'); } }
              />
              <DefaultButton
                data-ktp-id={ convertSequencesToKeytipID(this.keytipMap.Button3Pivot1Keytip.keySequences) }
                text='Test Button 3'
                onClick={ () => { alert('Button 3'); } }
              />
            </div>
          </div>
          <div style={ divStyle }>
            <div>
              <ActionButton
                data-ktp-id={ convertSequencesToKeytipID(this.keytipMap.Pivot2Keytip.keySequences) }
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
                    ['data-ktp-id']: convertSequencesToKeytipID(this.keytipMap.CommandButton1Pivot2Keytip.keySequences)
                  },
                  {
                    key: 'commandBarItem2',
                    name: 'Upload',
                    icon: 'Upload',
                    onClick: this._showMessageBar,
                    ['data-ktp-id']: convertSequencesToKeytipID(this.keytipMap.CommandButton2Pivot2Keytip.keySequences)
                  }
                ]
              }
              farItems={
                [
                  {
                    key: 'farItem1',
                    name: 'SubMenu',
                    icon: 'SortLines',
                    ['data-ktp-id']: convertSequencesToKeytipID(this.keytipMap.CommandButton3Pivot2Keytip.keySequences),
                    subMenuProps: {
                      items: [
                        {
                          key: 'emailMessage',
                          name: 'Email message',
                          icon: 'Mail',
                        },
                        {
                          key: 'calendarEvent',
                          name: 'Calendar event',
                          icon: 'Calendar'
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
        <KeytipLayer
          keytipStartSequences={ [this.startingKeySequence] }
          keytipExitSequences={ [this.startingKeySequence] }
          id={ 'test-id' }
        />
      </div>
    );
  }

  public componentDidMount(): void {
    // Manually add keytips to the KeytipManager for now
    // This should really be done in each component
    for (const component of Object.keys(this.keytipMap)) {
      registerKeytip(this.keytipMap[component]);
    }
  }

  private _showModal = (): void => {
    this.setState({ showModal: true });
  }

  private _hideModal = (): void => {
    this.setState({ showModal: false });
  }

  private _showMessageBar = (): void => {
    this.setState({ showMessageBar: true });

    // Hide the MessageBar after 2 seconds
    setTimeout(this._hideMessageBar, 2000);
  }

  private _hideMessageBar = (): void => {
    this.setState({ showMessageBar: false });
  }
}