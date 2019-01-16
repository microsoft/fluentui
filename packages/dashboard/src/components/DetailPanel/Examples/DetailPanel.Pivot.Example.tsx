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
  IQuickAction
} from '../DetailPanel.types';
import { Link } from 'office-ui-fabric-react/lib/Link';

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

  private getMainContent() {
    return {
      items: [
        {
          headerText: 'Details',
          content: [
            {
              title: 'Name',
              message: 'Contoso.com',
              actionText: 'Rename domain',
              onAction: () => {
                alert('Name');
              }
            } as IDetailInfoTileProps,
            {
              title: 'Health',
              message: 'Status = Healthy​',
              actionText: 'Detail',
              onAction: () => {
                alert('Health');
              }
            } as IDetailInfoTileProps,
            {
              title: 'Purpose',
              message: 'Exchange, SharePoint',
              actionText: 'Change Purpose',
              onAction: () => {
                alert('Change Purpose');
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
          ]
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
            pageTitle: `Title of ${l2Id}`,
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

  private _onDelaySubmit = (forceReject: boolean) => () => {
    return new Promise((resolve: (value: IDetailPanelActionResult) => void, reject: (reason: IDetailPanelErrorResult) => void) => {
      setTimeout(() => {
        if (forceReject) {
          reject({
            messageBannerSetting: {
              message: 'Failed on submit'
            }
          });
        }

        resolve({});
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
      actionBar.onPrimaryAction = this._onDelaySubmit(true);
      actionBar.secondaryButtonText = 'Cat 2nd';
      actionBar.onSecondaryAction = this._onDelaySubmit(false);
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
