import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import AttachedScrollUtility from '../../utilities/AttachedScrollUtility';
import { UHFBreakPoints } from '../../utilities/WindowWidthUtility';
import { hasUHF } from '../../utilities/location';
import { Nav } from '../Nav/Nav';
import { AppState } from './AppState';
import './App.scss';

export interface IAppProps extends React.Props<App> {}

export interface IAppState {
  isAttached: boolean;
  navHeight: number;
  isLeftNavOpen: boolean;
  currentSection: object;
  hasLeftNav: boolean;
  isSmallScreen: boolean;
}

// Timer used to throttle resize events.
let resizeTimer;

export class App extends React.Component<IAppProps, any> {
  private _attachedScrollThreshold: number;
  private _appContent: HTMLDivElement;
  private _appContentRect: ClientRect;

  constructor(props: IAppProps) {
    super(props);

    let _currentSection = this._getCurrentSection();

    this.state = {
      isAttached: false,
      isLeftNavOpen: false,
      currentSection: _currentSection,
      hasLeftNav: _currentSection.hasOwnProperty('pages')
    };
  }

  public componentDidMount(): void {
    window.addEventListener('scroll', this._handleNavPositioning);
    window.addEventListener('resize', this._handleNavPositioning);
    window.addEventListener('hashchange', this._updateCurrentSection);

    this._attachedScrollThreshold = AttachedScrollUtility.calculateAttachedScrollThreshold();
    this._handleNavPositioning();
  }

  public componentWillUnmount(): void {
    window.removeEventListener('scroll', this._handleNavPositioning);
    window.removeEventListener('resize', this._handleNavPositioning);
    window.removeEventListener('hashchange', this._updateCurrentSection);
  }

  public componentWillReceiveProps(nextProps: IAppProps): void {
    if (nextProps && nextProps.children !== this.props.children) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }

  public render(): JSX.Element {
    return (
      <Fabric className="App">
        {this._renderLeftNav()}
        <div className="App-wrapper">
          <div className="App-content" data-is-scrollable="true" ref={el => (this._appContent = el)} data-app-content-div="true">
            {this.props.children}
          </div>
        </div>
      </Fabric>
    );
  }

  private _handleNavPositioning = () => {
    clearTimeout(resizeTimer);

    // Throttle the positioning/resize events, which can impact performance if unmanaged.
    resizeTimer = setTimeout(() => {
      let { isAttached, navHeight } = this.state;
      this._appContentRect = this._appContent && this._appContent.getBoundingClientRect();
      const viewPortHeight = window.innerHeight;
      isAttached = AttachedScrollUtility.shouldComponentAttach(isAttached, this._attachedScrollThreshold);
      navHeight = this._calculateNavHeight(viewPortHeight, this._appContentRect, navHeight);

      this.setState({
        isAttached: isAttached,
        navHeight: navHeight,
        isSmallScreen: window.innerWidth < UHFBreakPoints.mobile
      });
    }, 100);
  };

  private _calculateNavHeight(viewPortHeight: number, appContentRect: ClientRect, height: number): number {
    if (!appContentRect) {
      return height;
    }
    if (appContentRect.top >= 0) {
      // This case accounts for space taken up by the UHF header in the viewport.
      height = viewPortHeight - appContentRect.top;
      if (appContentRect.height < appContentRect.bottom && viewPortHeight > appContentRect.bottom) {
        // This case might only exist in the UHF testing environment, when content isn't rendering properly and its height is weird.
        height = appContentRect.height;
      }
    } else if (viewPortHeight < appContentRect.bottom && appContentRect.top < 0) {
      // For pages with content that's longer than the viewport, the viewport is the height.
      // Takes effect when you scroll past the header.
      height = viewPortHeight;
    } else if (appContentRect.bottom < 0) {
      // In smaller screens when you scroll till the footer takes the whole page, collapse the nav.
      height = 0;
    } else {
      // Once the footer is in view, match nav bottom to content bottom.
      height = appContentRect.bottom;
    }
    return height;
  }

  /**
   * Gets the title of the current section.
   */
  private _getSectionTitle(): string {
    let { currentSection } = this.state;
    return currentSection.title;
  }

  /**
   * Gets an object representation of the current section (i.e. top-level page)
   * by comparing the first part of the current URL to the URLs of the "section" pages.
   */
  private _getCurrentSection(): object {
    const hashUrlParts = window.location.hash.split('/');
    const pages = AppState.pages;

    // The home page has no URL parts
    if (hashUrlParts.length === 1 || hashUrlParts[1] === '') {
      return pages[0];
    } else {
      // All other pages, e.g. #/styles/
      for (const page in pages) {
        if (pages.hasOwnProperty(page)) {
          const element = pages[page];

          if (element.url.split('/')[1] === hashUrlParts[1]) {
            return element;
          }
        }
      }
    }
  }

  /**
   * Sets the current section object to state.
   */
  private _updateCurrentSection = (): void => {
    const _currentSection = this._getCurrentSection();

    this.setState({
      currentSection: _currentSection,
      hasLeftNav: _currentSection.hasOwnProperty('pages'),
      isLeftNavOpen: false
    });
  };

  private _openLeftNav = () => {
    this.setState({ isLeftNavOpen: true });
  };

  private _closeLeftNav = () => {
    this.setState({ isLeftNavOpen: false });
  };

  private _renderLeftNav = () => {
    let { isLeftNavOpen, hasLeftNav, navHeight, isSmallScreen } = this.state;
    let navPosition: 'fixed' | 'absolute' = this.state.isAttached ? 'fixed' : 'absolute';
    let navStyle = {
      height: navHeight,
      position: navPosition
    };

    const navPanel = <Nav pages={AppState.pages} />;

    return (
      <>
        {isSmallScreen &&
          !hasUHF &&
          hasLeftNav && (
            <>
              <div className="App-mobileNavMenu">
                <ActionButton
                  iconProps={{
                    iconName: 'ChevronRightSmall',
                    styles: {
                      root: {
                        float: 'right',
                        fontSize: 12,
                        color: '#333'
                      }
                    }
                  }}
                  onClick={this._openLeftNav}
                  styles={{
                    root: { height: 34 },
                    label: { fontWeight: 600 }
                  }}
                >
                  {this._getSectionTitle()}
                </ActionButton>
              </div>

              <Panel
                className="ms-App-navPanel"
                isOpen={isLeftNavOpen}
                isLightDismiss={true}
                type={PanelType.smallFixedNear}
                onDismiss={this._closeLeftNav}
                styles={{
                  closeButton: {
                    color: '#fff',
                    selectors: {
                      ':hover': {
                        color: '#c8c8c8'
                      }
                    }
                  }
                }}
              >
                {navPanel}
              </Panel>
            </>
          )}

        {!isSmallScreen &&
          hasLeftNav && (
            <div className="App-nav" style={navStyle}>
              {navPanel}
            </div>
          )}
      </>
    );
  };
}
