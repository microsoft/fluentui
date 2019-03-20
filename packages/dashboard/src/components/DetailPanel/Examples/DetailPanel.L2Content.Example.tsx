/* tslint:disable */
import * as React from 'react';
import { DetailPanel } from '../DetailPanel';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import {
  IDetailPanelHeaderProps,
  IDetailPanelErrorResult,
  IDetailPanelActionBarProps,
  IDetailPanelActionResult,
  LoadingTheme,
  IActionButton
} from '../DetailPanel.types';
import { Link } from 'office-ui-fabric-react/lib/Link';

export interface IDetailPanelL2ContentExampleStates {
  show: boolean;
  currentL2Id?: string;
}

export class DetailPanelL2ContentExample extends React.PureComponent<{}, IDetailPanelL2ContentExampleStates> {
  constructor(props: {}) {
    super(props);
    this.state = { show: false, currentL2Id: 'dog' };
  }

  public render(): JSX.Element {
    const { show, currentL2Id } = this.state;
    if (show) {
      const header: IDetailPanelHeaderProps = {
        title: ' I am the main header'
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
    return (
      <div>
        <div>Main content</div>
        <ul>
          <li>
            <Link
              onClick={() => {
                this.setState({ currentL2Id: 'cat' });
              }}
            >
              CAT
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                this.setState({ currentL2Id: 'dog' });
              }}
            >
              DOG
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                this.setState({ currentL2Id: 'bird' });
              }}
            >
              Bird
            </Link>
          </li>
        </ul>
      </div>
    );
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
      primaryButton: {
        buttonText: `Primary ${l2Id}`,
        onAction: () => {
          alert(l2Id);
        }
      } as IActionButton
    };

    if (l2Id === 'cat') {
      actionBar.primaryButton!.onAction = this._onDelaySubmit(true);

      actionBar.secondaryButton = {
        buttonText: 'Cat 2nd',
        onAction: this._onDelaySubmit(false),
        inlineSpinner: true
      } as IActionButton;
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
/* tslint:enable */
