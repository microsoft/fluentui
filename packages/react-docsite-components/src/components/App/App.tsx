import * as React from 'react';
import { AppThemesContext } from '../../utilities/theme';
import { classNamesFunction, css, styled, ThemeProvider } from '@fluentui/react';
import { ExampleStatus, IAppProps, IAppStyleProps, IAppStyles } from './App.types';
import { Fabric } from '@fluentui/react/lib/Fabric';
import { getStyles } from './App.styles';
import { Header } from '../Header/Header';
import { INavLink, Nav } from '@fluentui/react/lib/Nav';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { ResponsiveMode, withResponsiveMode } from '@fluentui/react/lib/ResponsiveMode';
import { showOnlyExamples } from '../../utilities/showOnlyExamples';
import { getQueryParam } from '../../utilities/index2';

export interface IAppState {
  isMenuVisible: boolean;
  /** Menu (nav) panel is in the process of closing and should not be re-opened */
  isMenuClosing: boolean;
}

const getClassNames = classNamesFunction<IAppStyleProps, IAppStyles>();

@withResponsiveMode
export class AppBase extends React.Component<IAppProps, IAppState> {
  public state: IAppState = { isMenuVisible: false, isMenuClosing: false };
  private _classNames: IProcessedStyleSet<IAppStyles>;
  private _showOnlyExamples: boolean;
  private _isStrict: boolean;

  constructor(props: IAppProps) {
    super(props);

    this._showOnlyExamples = showOnlyExamples();
    this._isStrict = getQueryParam('strict') === 'all';
  }

  public componentDidMount() {
    document.title = this.props.appDefinition.appTitle.replace(' - ', ' ') + ' Examples';
  }

  public render(): JSX.Element {
    const { appDefinition, styles, responsiveMode = ResponsiveMode.xLarge, theme } = this.props;
    const { themes } = appDefinition;
    const { isMenuVisible } = this.state;

    const onlyExamples = this._showOnlyExamples;

    const classNames = (this._classNames = getClassNames(styles, {
      responsiveMode,
      theme,
      showOnlyExamples: onlyExamples,
    }));

    const isLargeDown = responsiveMode <= ResponsiveMode.large;

    const nav = (
      <Nav
        groups={appDefinition.examplePages}
        onLinkClick={this._onMenuDismiss}
        onRenderLink={this._onRenderLink}
        styles={classNames.subComponentStyles.nav}
      />
    );

    let app = (
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
            // Close by tapping outside the panel or pressing escape
            hasCloseButton={false}
            onDismiss={this._onMenuDismiss}
            onDismissed={this._onMenuDismissed}
            styles={classNames.subComponentStyles.navPanel}
          >
            {nav}
          </Panel>
        )}
      </Fabric>
    );

    if (themes) {
      const { exampleCardTheme, hideSchemes, ...otherTheme } = themes;

      if (exampleCardTheme || typeof hideSchemes === 'boolean') {
        app = <AppThemesContext.Provider value={{ exampleCardTheme, hideSchemes }}>{app}</AppThemesContext.Provider>;
      }
      if (Object.keys(otherTheme).length) {
        app = <ThemeProvider theme={otherTheme}>{app}</ThemeProvider>;
      }
    }

    if (this._isStrict) {
      app = <React.StrictMode>{app}</React.StrictMode>;
    }

    return app;
  }

  private _onMenuDismiss = () => {
    // If the user clicks the hamburger to dismiss, by default it would trigger the click handler
    // and immediately reopen the menu panel. Set a flag while the menu is closing to prevent this.
    this.setState({ isMenuVisible: false, isMenuClosing: true });
  };

  private _onMenuDismissed = () => {
    // Menu panel is finished dismissing, so re-activate the hamburger button
    this.setState({ isMenuClosing: false });
  };

  private _onIsMenuVisibleChanged = (isMenuVisible: boolean): void => {
    // Toggle visibility only if the menu panel is not in the process of closing
    this.setState(prevState => (prevState.isMenuClosing ? null : { isMenuVisible }));
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
              link.status === ExampleStatus.release && classNames.linkFlairRelease,
            )}
          >
            {ExampleStatus[link.status]}
          </span>
        )}
      </>
    );
  };
}

export const App: React.FunctionComponent<IAppProps> = styled<IAppProps, IAppStyleProps, IAppStyles>(
  AppBase,
  getStyles,
  undefined,
  {
    scope: 'App',
  },
);
