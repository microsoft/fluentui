import * as React from 'react';
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType, IPanelProps } from 'office-ui-fabric-react/lib/Panel';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getTheme, IconFontSizes } from 'office-ui-fabric-react/lib/Styling';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

export class PanelNavigationExample extends React.Component<
  {},
  {
    showPanel: boolean;
  }
> {
  constructor(props: {}) {
    super(props);
    this.state = { showPanel: false };
  }

  public render(): JSX.Element {
    return (
      <div>
        <DefaultButton secondaryText="Opens the Sample Panel" onClick={this._onShowPanel} text="Open Panel" />
        <Panel
          isOpen={this.state.showPanel}
          type={PanelType.smallFixedFar}
          onDismiss={this._onClosePanel}
          isFooterAtBottom={true}
          headerText="Panel with custom navigation content"
          closeButtonAriaLabel="Close"
          onRenderNavigationContent={this._onRenderNavigationContent}
        >
          <span>Content goes here.</span>
        </Panel>
      </div>
    );
  }

  private _onClosePanel = () => {
    this.setState({ showPanel: false });
  };

  private _onRenderNavigationContent = (props: IPanelProps, defaultRender: IRenderFunction<IPanelProps>): JSX.Element => {
    const theme = getTheme();

    return (
      <React.Fragment>
        <SearchBox
          placeholder="Search here..."
          styles={{
            root: {
              margin: '5px',
              height: 'auto',
              width: '100%'
            }
          }}
        />
        <IconButton
          styles={{
            root: {
              height: 'auto',
              width: '44px',
              color: theme.palette.neutralSecondary,
              fontSize: IconFontSizes.large
            },
            menuIcon: {
              display: 'none'
            },
            rootHovered: {
              color: theme.palette.neutralPrimary
            }
          }}
          menuProps={{
            items: [
              {
                key: 'home',
                text: 'Home',
                iconProps: {
                  iconName: 'Home'
                }
              },
              {
                key: 'refresh',
                text: 'Refresh',
                iconProps: {
                  iconName: 'Refresh'
                }
              },
              {
                key: 'back',
                text: 'Back',
                iconProps: {
                  iconName: 'Back'
                }
              },
              {
                key: 'forward',
                text: 'Forward',
                iconProps: {
                  iconName: 'Forward'
                }
              }
            ]
          }}
          data-is-visible={true}
          iconProps={{
            iconName: 'MoreVertical'
          }}
        />
        {defaultRender(props)}
      </React.Fragment>
    );
  };

  private _onShowPanel = () => {
    this.setState({ showPanel: true });
  };
}
