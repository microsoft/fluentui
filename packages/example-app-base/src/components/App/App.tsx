import * as React from 'react';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { AppCustomizationsContext } from '../../utilities/customizations';
import { withResponsiveMode, ResponsiveMode } from 'office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode';
import { INavLink } from 'office-ui-fabric-react/lib/Nav';
import { Header } from '../Header/Header';
import './App.scss';
import { IAppProps, ExampleStatus } from './App.types';

export interface IAppState {
  isMenuVisible: boolean;
}

@withResponsiveMode
export class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      isMenuVisible: false
    };
  }

  public render(): JSX.Element {
    const { appDefinition, responsiveMode = ResponsiveMode.large } = this.props;
    const { customizations } = appDefinition;
    const { isMenuVisible } = this.state;

    const isLargeDown = responsiveMode <= ResponsiveMode.large;

    const navPanel = (
      <Nav
        groups={appDefinition.examplePages}
        onLinkClick={this._onLinkClick}
        onRenderLink={this._onRenderLink}
        styles={{ root: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } }}
      />
    );

    const app = (
      <Fabric className={css('ms-App', 'ms-App--' + ResponsiveMode[responsiveMode])}>
        <div className="ms-App-header">
          <Header
            title={appDefinition.appTitle}
            sideLinks={appDefinition.headerLinks}
            isMenuVisible={isMenuVisible}
            onIsMenuVisibleChanged={this._onIsMenuVisibleChanged}
          />
        </div>

        {!isLargeDown && <div className="ms-App-nav">{navPanel}</div>}

        <div className="ms-App-content" data-is-scrollable="true">
          {this.props.children}
        </div>

        {isLargeDown && (
          <Panel
            isOpen={isMenuVisible}
            isLightDismiss={true}
            type={PanelType.smallFixedNear}
            // Close by tapping outside the panel
            hasCloseButton={false}
            // Use onDismissed (not onDismiss) to prevent _onIsMenuVisibleChanged being called twice
            // (once by the panel and once by the header button)
            onDismissed={this._onIsMenuVisibleChanged.bind(this, false)}
            styles={{
              root: { top: 50 },
              contentInner: { padding: 0 }
            }}
          >
            {navPanel}
          </Panel>
        )}
      </Fabric>
    );

    return customizations ? <AppCustomizationsContext.Provider value={customizations}>{app}</AppCustomizationsContext.Provider> : app;
  }

  private _onIsMenuVisibleChanged = (isMenuVisible: boolean): void => {
    this.setState({ isMenuVisible });
  };

  private _onLinkClick = (): void => {
    this.setState({ isMenuVisible: false });
  };

  private _onRenderLink = (link: INavLink): JSX.Element => {
    // Nav-linkText is a class name from the Fabric nav
    return (
      <>
        <span className="Nav-linkText">{link.name}</span>
        {link.status !== undefined && (
          <span key={2} className={'Nav-linkFlair ' + 'is-state' + link.status}>
            {ExampleStatus[link.status]}
          </span>
        )}
      </>
    );
  };
}
