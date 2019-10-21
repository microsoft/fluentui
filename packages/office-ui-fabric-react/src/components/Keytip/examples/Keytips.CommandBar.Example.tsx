import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { keytipMap } from 'office-ui-fabric-react/lib/components/Keytip/examples/KeytipSetup';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export interface IKeytipsCommandBarExampleState {
  showModal: boolean;
  showMessageBar: boolean;
}

export class KeytipsCommandBarExample extends React.Component<{}, IKeytipsCommandBarExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showModal: false,
      showMessageBar: false
    };
  }

  /* tslint:disable:jsx-ban-props jsx-no-lambda */
  public render() {
    return (
      <div style={{ height: 100 }}>
        <CommandBar
          items={[
            {
              key: 'commandBarItem1',
              text: 'New',
              iconProps: {
                iconName: 'Add'
              },
              onClick: this._showModal,
              keytipProps: keytipMap.CommandButton1Keytip
            },
            {
              key: 'commandBarItem2',
              text: 'Upload',
              iconProps: {
                iconName: 'Upload'
              },
              onClick: this._showMessageBar,
              keytipProps: keytipMap.CommandButton2Keytip
            }
          ]}
          farItems={[
            {
              key: 'farItem1',
              text: 'Options',
              iconProps: {
                iconName: 'SortLines'
              },
              keytipProps: keytipMap.CommandButton3Keytip,
              subMenuProps: {
                items: [
                  {
                    key: 'emailMessage',
                    text: 'Send Email',
                    iconProps: {
                      iconName: 'Mail'
                    },
                    keytipProps: keytipMap.SubmenuKeytip1,
                    onClick: () => {
                      console.log('test1');
                    }
                  },
                  {
                    key: 'calendarEvent',
                    text: 'Make Calendar Event',
                    iconProps: {
                      iconName: 'Calendar'
                    },
                    keytipProps: keytipMap.SubmenuKeytip2,
                    onClick: () => {
                      console.log('test2');
                    },
                    subMenuProps: {
                      items: [
                        {
                          key: 'testButton',
                          text: 'Add to Outlook',
                          keytipProps: keytipMap.SubmenuKeytip3,
                          onClick: () => {
                            console.log('test3');
                          }
                        },
                        {
                          key: 'testButton2',
                          text: 'Go to Bing',
                          keytipProps: keytipMap.SubmenuKeytip4,
                          href: 'http://www.bing.com',
                          target: '_blank'
                        }
                      ]
                    }
                  },
                  {
                    key: 'splitButtonTest',
                    text: 'Other...',
                    split: true,
                    keytipProps: keytipMap.SubmenuKeytip5,
                    subMenuProps: {
                      items: [
                        {
                          key: 'splitButtonSubMenu1',
                          text: 'Submenu Item w/o Keytip'
                        },
                        {
                          key: 'splitButtonSubMenu2',
                          text: 'Submenu Item w/o Keytip'
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]}
        />
        {this.state.showMessageBar && <MessageBar messageBarType={MessageBarType.success}>Success Uploading</MessageBar>}
        <Modal isOpen={this.state.showModal} onDismiss={this._hideModal} isBlocking={false}>
          <h3>New Modal</h3>
        </Modal>
      </div>
    );
  }

  private _showModal = (): void => {
    this.setState({ showModal: true });
  };

  private _hideModal = (): void => {
    this.setState({ showModal: false });
  };

  private _showMessageBar = (): void => {
    this.setState({ showMessageBar: true });

    // Hide the MessageBar after 2 seconds
    setTimeout(this._hideMessageBar, 2000);
  };

  private _hideMessageBar = (): void => {
    this.setState({ showMessageBar: false });
  };
}
