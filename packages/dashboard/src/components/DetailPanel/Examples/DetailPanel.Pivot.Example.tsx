import * as React from 'react';
import { DetailPanel } from '../DetailPanel';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import {
  IDetailPanelHeaderProps,
  IDetailPanelErrorResult,
  IDetailPanelActionBarProps,
  IDetailPanelActionResult,
  LoadingTheme,
  IDetailPanelPivotBodyProps,
  IDetailPanelPivotBodyItem,
  IDetailInfoTileProps,
  IQuickAction,
  IDetailPanelConfirmationResultProps,
  ConfirmationStatus
} from '../DetailPanel.types';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

interface IDetailPanelL2PivotExampleStates {
  show: boolean;
  currentL2Id?: string;
}

export class DetailPanelPivotExample extends React.PureComponent<{}, IDetailPanelL2PivotExampleStates> {
  constructor(props: {}) {
    super(props);
    this.state = { show: false, currentL2Id: undefined };
  }

  public render() {
    const { show, currentL2Id } = this.state;
    if (show) {
      const header: IDetailPanelHeaderProps = {
        title: 'Contoso.com',
        personaHeader: true,
        quickActions: [
          {
            icon: 'AADLogo',
            actionName: 'AADLogo',
            onClick: () => {
              alert('AADLogo');
            }
          } as IQuickAction,
          {
            icon: 'ATPLogo',
            actionName: 'ATPLogo',
            onClick: () => {
              alert('ATPLogo');
            }
          } as IQuickAction,
          {
            icon: 'CalendarSettingsMirrored',
            actionName: 'CalendarSettingsMirrored',
            onClick: () => {
              alert('CalendarSettingsMirrored');
            }
          } as IQuickAction
        ],
        status: 'Default'
      };

      return (
        <DetailPanel
          mainHeader={header}
          mainContent={this.getMainContent()}
          onDetailPanelDimiss={() => {
            this.setState({ show: false, currentL2Id: undefined });
          }}
          onL2BackClick={() => {
            this.setState({ currentL2Id: undefined });
          }}
          currentL2Id={currentL2Id}
          onGetL2Header={this._onGetL2Header}
          onGetL2Content={this._onGetL2Content}
          onGetL2ActionBar={this._onGetL2ActionBar}
          onGetLoadingAnimation={this._onGetLoadingAnimation}
        />
      );
    } else {
      return (
        <PrimaryButton
          onClick={() => {
            this.setState({ show: true });
          }}
        >
          Open
        </PrimaryButton>
      );
    }
  }

  private getTiles() {
    return [
      {
        title: 'Name',
        message: 'Contoso.com',
        actionText: 'Rename domain',
        onAction: () => {
          this.setState({ currentL2Id: 'cat' });
        }
      } as IDetailInfoTileProps,
      {
        title: 'Health',
        message: 'Status = Healthy​',
        actionText: 'Detail',
        onAction: () => {
          this.setState({ currentL2Id: 'dog' });
        }
      } as IDetailInfoTileProps,
      {
        title: 'Purpose',
        message: 'Exchange, SharePoint',
        actionText: 'Change Purpose',
        onAction: () => {
          this.setState({ currentL2Id: 'bird' });
        }
      } as IDetailInfoTileProps,
      {
        title: 'Privacy',
        message: 'Privacy Enabled',
        actionText: 'Privacy',
        onAction: () => {
          alert('Privacy');
        }
      } as IDetailInfoTileProps,
      {
        title: 'Name',
        message: 'Contoso.com',
        actionText: 'Rename domain',
        onAction: () => {
          alert('Rename domain');
        }
      } as IDetailInfoTileProps,
      {
        title: 'Expiration',
        message: new Date().toLocaleDateString(),
        actionText: 'Detail',
        onAction: () => {
          alert('Expiration');
        }
      } as IDetailInfoTileProps
    ];
  }

  private getMainContent() {
    return {
      items: [
        {
          headerText: 'Details',
          content: this.getTiles(),
          actionBar: {
            primaryButtonText: 'Primary Detail',
            onPrimaryAction: () => {
              alert('Primary detail');
            }
          } as IDetailPanelActionBarProps
        } as IDetailPanelPivotBodyItem,
        {
          headerText: 'JSX',
          content: (<div>
            <ColorPicker color={'#000000'} />
          </div>)
        } as IDetailPanelPivotBodyItem,
        {
          headerText: 'Delayed Details',
          onContentLoad: () => {
            return new Promise((resolve: (value: IDetailInfoTileProps[]) => void) => {
              setTimeout(() => {
                resolve(this.getTiles());
              }, 2000);
            });
          },
          actionBar: {
            primaryButtonText: 'Primary Delayed Details',
            onPrimaryAction: () => {
              alert('Primary Delayed Details');
            }
          } as IDetailPanelActionBarProps
        } as IDetailPanelPivotBodyItem,
        {
          headerText: 'Delayed JSX',
          onContentLoad: () => {
            return new Promise((resolve: (value: JSX.Element) => void) => {
              setTimeout(() => {
                resolve(
                  <div>
                    <ColorPicker color={'#000000'} />
                  </div>
                );
              }, 2000);
            });
          }
        } as IDetailPanelPivotBodyItem,
        {
          headerText: 'Load error',
          onContentLoad: () => {
            return new Promise((_resolve: (value: JSX.Element) => void, reject: (reason: IDetailPanelErrorResult) => void) => {
              setTimeout(() => {
                const err: IDetailPanelErrorResult = {
                  messageBannerSetting: {
                    message: 'Failed on loading pivot item'
                  }
                };

                reject(err);
              }, 2000);
            });
          }
        } as IDetailPanelPivotBodyItem
      ]
    } as IDetailPanelPivotBodyProps;
  }

  private _onGetL2Header(l2Id: string) {
    return {
      title: `I am the header of ${l2Id}`
    } as IDetailPanelHeaderProps;
  }

  private _onGetL2Content(l2Id: string) {
    return new Promise((resolve: (element: JSX.Element) => void, reject: (reason: IDetailPanelErrorResult) => void) => {
      setTimeout(() => {
        if (l2Id === 'bird') {
          const err: IDetailPanelErrorResult = {
            messageBannerSetting: {
              message: `Error message of ${l2Id}`
            }
          };
          reject(err);
        }

        resolve(<div>Content of {l2Id}</div>);
      }, 1000);
    });
  }

  private _onDelaySubmit = (forceReject: boolean, useConfirmationPage?: boolean) => () => {
    return new Promise((resolve: (value: IDetailPanelActionResult) => void, reject: (reason: IDetailPanelErrorResult) => void) => {
      setTimeout(() => {
        if (forceReject) {
          reject({
            messageBannerSetting: {
              message: 'Failed on submit'
            }
          });
        }

        if (useConfirmationPage) {
          resolve({
            confirmationPage: {
              overallStatus: ConfirmationStatus.Success,
              headerText: 'I am a dummy confirmation page',
              descriptionText:
                // tslint:disable-next-line:max-line-length
                'Now people in your organization can apply labels to sensitive information. Track how your new  labels are being used in the new sensitivity labels card on your home page. Edit your labels in the Security Center.',
              linkList: () => [
                {
                  title: 'Next steps',
                  links: [{ linkText: 'Set up protection settings for sensitive data in the Security Center' }]
                },
                {
                  title: 'Related tasks',
                  links: [
                    { linkText: 'Microsoft information protection' },
                    { linkText: 'Office 365 Advanced Threat Protection' }
                  ]
                },
                {
                  title: 'Learn more',
                  links: [{ linkText: 'Documentation link' }, { linkText: 'Documentation link' }]
                }
              ],
              statusItems: () => [
                {
                  status: ConfirmationStatus.Failed,
                  title: 'Email aliases couldn’t be removed',
                  items: ['aliasone@contoso.com', 'onealias@contoso.com']
                },
                {
                  status: ConfirmationStatus.Success,
                  title: 'Calendar events removed on invitees’ calendars'
                },
                {
                  status: ConfirmationStatus.Success,
                  title: 'Mailbox delegate permissions removed'
                },
                {
                  status: ConfirmationStatus.Success,
                  title: 'Licenses unassigned',
                  items: ['Microsoft 365 E3', 'Office 365 Business Premium']
                }
              ],
              actionBar: {
                primaryButtonText: 'Copy',
                onPrimaryAction: () => {
                  alert('copied');
                },
                secondaryButtonText: 'Print',
                onSecondaryAction: () => {
                  alert('printing');
                }
              }

            } as IDetailPanelConfirmationResultProps
          } as IDetailPanelActionResult);
        } else {
          resolve({
            messageBanner: {
              messageType: MessageBarType.success,
              message: 'You did it'
            }
          } as IDetailPanelActionResult);
        }
      }, 1000);
    });
  };

  private _onGetL2ActionBar = (l2Id: string) => {
    let actionBar: IDetailPanelActionBarProps = {
      primaryButtonText: `Primary ${l2Id}`,
      onPrimaryAction: () => {
        alert(l2Id);
      }
    };

    if (l2Id === 'cat') {
      actionBar.onPrimaryAction = this._onDelaySubmit(false);
      actionBar.secondaryButtonText = 'Cat 2nd';
      actionBar.onPrimaryActionMessage = 'Cat is meowing';
      actionBar.onSecondaryAction = this._onDelaySubmit(false, true);
      actionBar.secondaryActionInlineSpinner = true;
    }

    if (l2Id === 'dog') {
      actionBar.onPrimaryAction = this._onDelaySubmit(true);
      actionBar.secondaryButtonText = 'Dog 2nd';
      actionBar.onPrimaryActionMessage = 'Dog is barking';
      actionBar.onSecondaryAction = this._onDelaySubmit(false, true);
      actionBar.secondaryActionInlineSpinner = true;
    }

    return actionBar;
  };

  private _onGetLoadingAnimation = (loadingTheme: LoadingTheme, themeId?: string | number) => {
    if (loadingTheme === LoadingTheme.OnL2ContentLoad) {
      if (themeId === 'cat') {
        return <div>I am a cat loading theme</div>;
      }
    }

    return null;
  };
}
