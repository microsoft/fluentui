import * as React from 'react';
import { AppCustomizationsContext } from '../../utilities/customizations';
import { classNamesFunction, css, styled } from 'office-ui-fabric-react/lib/Utilities';
import { ExampleStatus, IAppProps, IAppStyleProps, IAppStyles } from './App.types';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { getStyles } from './App.styles';
import { Header } from '../Header/Header';
import { INavLink, Nav } from 'office-ui-fabric-react/lib/Nav';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { ResponsiveMode, withResponsiveMode } from 'office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode';
import { showOnlyExamples } from '../../utilities/showOnlyExamples';

export interface IAppState {
  isMenuVisible: boolean;
}

const getClassNames = classNamesFunction<IAppStyleProps, IAppStyles>();

@withResponsiveMode
export class AppBase extends React.Component<IAppProps, IAppState> {
  public state: IAppState = { isMenuVisible: false };
  private _classNames: IProcessedStyleSet<IAppStyles>;
  private _showOnlyExamples: boolean;

  constructor(props: IAppProps) {
    super(props);

    this._showOnlyExamples = showOnlyExamples();
  }

  public componentDidMount() {
    document.title = this.props.appDefinition.appTitle.replace(' - ', ' ') + ' Examples';
  }

  public render(): JSX.Element {
    const { appDefinition, styles, responsiveMode = ResponsiveMode.xLarge, theme } = this.props;
    const { customizations } = appDefinition;
    const { isMenuVisible } = this.state;

    const onlyExamples = this._showOnlyExamples;

    const classNames = (this._classNames = getClassNames(styles, { responsiveMode, theme, showOnlyExamples: onlyExamples }));

    const isLargeDown = responsiveMode <= ResponsiveMode.large;

    const nav = (
      <Nav
        groups={appDefinition.examplePages}
        onLinkClick={this._onLinkClick}
        onRenderLink={this._onRenderLink}
        styles={classNames.subComponentStyles.nav}
      />
    );

    const app = (
      <Fabric className={classNames.root}>
        {!onlyExamples && (
          <div className={classNames.headerContainer}>
            <Header
              isLargeDown={isLargeDown}
              title={appDefinition.appTitle}
              sideLinks={appDefinition.headerLinks}
              isMenuVisible={isMenuVisible}
              onIsMenuVisibleChanged={this._onIsMenuVisibleChanged}
              styles={classNames.subComponentStyles.header}
            />
          </div>
        )}

        {!isLargeDown && !onlyExamples && <div className={classNames.leftNavContainer}>{nav}</div>}

        <div className={classNames.content} data-is-scrollable="true">
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
            styles={classNames.subComponentStyles.navPanel}
          >
            {nav}
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
    const classNames = this._classNames;

    // Nav-linkText is a class name from the Fabric nav
    return (
      <>
        <span key={1} className="Nav-linkText">
          {link.name}
        </span>
        {link.status !== undefined && (
          <span
            key={2}
            className={css(
              classNames.linkFlair,
              link.status === ExampleStatus.started && classNames.linkFlairStarted,
              link.status === ExampleStatus.beta && classNames.linkFlairBeta,
              link.status === ExampleStatus.release && classNames.linkFlairRelease
            )}
          >
            {ExampleStatus[link.status]}
          </span>
        )}
      </>
    );
  };
}

export const App: React.StatelessComponent<IAppProps> = styled<IAppProps, IAppStyleProps, IAppStyles>(AppBase, getStyles, undefined, {
  scope: 'App'
});
