import * as React from 'react';
import { css, ThemeProvider, Async, on } from '@fluentui/react';
import {
  baseDefinition,
  EventNames,
  getPageFirstPlatform,
  getSiteArea,
  hasActiveChild,
  ISiteDefinition,
  PlatformContext,
  trackEvent,
  trackPageView,
  IWithPlatformProps,
  TopNav,
  ScrollBars,
  INavPage,
  PlatformPicker,
  PlatformBar,
  TPlatformPages,
  jumpToAnchor,
  getNormalizedPath,
  SiteMessageBar,
  getQueryParam,
  getActivePage,
} from '@fluentui/react-docsite-components/lib/index2';
import { Nav } from '../Nav/index';
import { AppThemes } from './AppThemes';
import { AppThemesContext, extractAnchorLink } from '@fluentui/react-docsite-components/lib/index';
import { getItem, setItem } from '@fluentui/utilities/lib/sessionStorage';
import * as styles from './Site.module.scss';
import { appMaximumWidthLg } from '../../styles/constants';

export interface ISiteProps<TPlatforms extends string = string> {
  children?: React.ReactNode;
  siteDefinition: ISiteDefinition<TPlatforms>;
  hasUHF?: boolean;
}

export interface ISiteState<TPlatforms extends string = string> {
  platform: TPlatforms;
  searchablePageTitle?: string;
  isContentFullBleed?: boolean;
  hasPlatformPicker?: boolean;
  pagePlatforms?: TPlatformPages<TPlatforms>;
  /** Pages currently shown in the left nav */
  activePages?: INavPage<TPlatforms>[];
  /** Current normalized active route, excluding any anchor link within the page */
  pagePath?: string;
  /** Map from top-level page area (controls, styles, etc) to active platform */
  activePlatforms: { [topLevelPage: string]: TPlatforms };
}

export class Site<TPlatforms extends string = string> extends React.Component<
  ISiteProps<TPlatforms>,
  ISiteState<TPlatforms>
> {
  public static defaultProps: ISiteProps = {
    siteDefinition: { ...baseDefinition },
  };

  private _async: Async;
  private _disposables: Function[];
  private _jumpInterval: number | undefined;
  private _isStrict: boolean;

  constructor(props: ISiteProps<TPlatforms>) {
    super(props);

    this._async = new Async();
    this._disposables = [() => this._async.dispose()];

    this._isStrict = getQueryParam('strict') === 'all';

    let activePlatforms: ISiteState<TPlatforms>['activePlatforms'] = {};

    const { siteDefinition } = this.props;
    if (siteDefinition.pages) {
      // Get top level pages with platforms.
      const topLevelPages = siteDefinition.pages.filter(page => !!page.platforms).map(page => page.title);

      // Get session storage platforms for top level pages.
      try {
        activePlatforms = JSON.parse(getItem('activePlatforms') || '') || {};
      } catch (err) {
        // ignore parsing error
      }

      // Set active platform for each top level page to local storage platform or the first platform defined for
      // that page.
      topLevelPages.forEach(item => {
        activePlatforms[item] = activePlatforms[item] || getPageFirstPlatform(item, siteDefinition);
      });
    }

    const navData = this._getNavData(activePlatforms);
    let platform = 'default' as TPlatforms;

    // If current page doesn't have pages for the active platform, switch to its first platform.
    if (Object.keys(navData.pagePlatforms).length > 0 && navData.activePages.length === 0) {
      const firstPlatform = getPageFirstPlatform(getSiteArea(siteDefinition.pages), siteDefinition);
      const currentPage = getSiteArea(siteDefinition.pages);
      platform = firstPlatform;
      activePlatforms = {
        ...activePlatforms,
        [currentPage]: firstPlatform,
      };
    }

    this.state = {
      activePlatforms,
      platform,
      ...navData,
    };
  }

  public componentDidMount(): void {
    // Set the initial state with navigation data.
    this.setState({ ...(this._getNavData() as ISiteState<TPlatforms>) }, this._setActivePlatforms);
    // Handle hash routing
    this._disposables.push(on(window, 'hashchange', this._handleRouteChange));
    this._handleRouteChange();
  }

  public componentWillUnmount(): void {
    this._disposables.forEach(dispose => dispose());
  }

  public UNSAFE_componentWillReceiveProps(nextProps: ISiteProps): void {
    if (nextProps && nextProps.children !== this.props.children) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    this.setState(this._getNavData() as ISiteState<TPlatforms>);
  }

  public componentDidUpdate(prevProps: ISiteProps, prevState: ISiteState): void {
    if (prevState.pagePath !== this.state.pagePath) {
      this._jumpToAnchor(extractAnchorLink(location.hash));
    }

    const { activePages, pagePlatforms } = this.state;
    const { siteDefinition } = this.props;

    // If current page doesn't have pages for the active platform, switch to its first platform.
    if (Object.keys(pagePlatforms).length > 0 && activePages.length === 0) {
      const firstPlatform = getPageFirstPlatform(getSiteArea(siteDefinition.pages), siteDefinition);
      this._onPlatformChanged(firstPlatform);
    }
  }

  public render() {
    const { platform, isContentFullBleed } = this.state;
    const { children, siteDefinition } = this.props;
    const { theme } = siteDefinition;
    const childrenWithPlatform = React.Children.map(children, (child: React.ReactElement<IWithPlatformProps>) =>
      React.cloneElement(child, { platform }),
    );

    const SiteContent = () => (
      <div key="site" className={styles.siteRoot}>
        {this._renderTopNav()}
        {this._renderMessageBar()}
        <div className={css(styles.siteWrapper, isContentFullBleed && styles.fullWidth)}>
          {this._renderPageNav()}
          <div
            className={styles.siteContent}
            data-is-scrollable="true"
            data-app-content-div="true"
            // This needs to be programmatically focusable for "jump to main content" functionality
            tabIndex={-1}
            role="main"
          >
            {childrenWithPlatform}
          </div>
        </div>
        {this._renderPlatformBar()}
      </div>
    );

    const app = (
      <PlatformContext.Provider value={platform}>
        <AppThemesContext.Provider value={AppThemes}>
          {theme ? (
            <ThemeProvider theme={theme}>
              <SiteContent />
            </ThemeProvider>
          ) : (
            <SiteContent />
          )}
        </AppThemesContext.Provider>
      </PlatformContext.Provider>
    );

    return this._isStrict ? <React.StrictMode>{app}</React.StrictMode> : app;
  }

  private _getNavData(activePlatforms?: ISiteState<TPlatforms>['activePlatforms']): Partial<ISiteState<TPlatforms>> {
    const { siteDefinition } = this.props;
    const pages = siteDefinition.pages;
    if (!pages) {
      return {};
    }

    const platform = this._getPlatform(activePlatforms);
    let searchablePageTitle: string | undefined;
    let isContentFullBleed = false;
    let hasPlatformPicker = false;
    let pagePlatforms: TPlatformPages<TPlatforms> = {};

    const activePages: INavPage<TPlatforms>[] = [];

    pages
      .filter(page => !page.isHiddenFromMainNav && hasActiveChild(page, platform))
      .forEach(page => {
        isContentFullBleed = !!page.isContentFullBleed;
        hasPlatformPicker = !!page.hasPlatformPicker;
        if (page.isSearchable) {
          searchablePageTitle = page.title;
        }

        if (page.platforms) {
          pagePlatforms = page.platforms;

          // Get active platform pages.
          const platforms: INavPage<TPlatforms>[] | undefined = pagePlatforms[platform];
          if (platforms) {
            activePages.push(...platforms);
          }
        }

        // Get the rest of the active pages.
        if (page.pages) {
          activePages.push(...page.pages);
        }
      });

    return {
      platform,
      activePages,
      searchablePageTitle,
      isContentFullBleed,
      hasPlatformPicker,
      pagePlatforms,
    };
  }

  private _renderMessageBar(): JSX.Element | null {
    const { pagePath } = this.state;
    const { siteDefinition } = this.props;
    const { messageBars } = siteDefinition;

    let _messageBar: JSX.Element | null = null;

    if (messageBars && pagePath) {
      for (const messageBar of messageBars) {
        let { path, exclude, ...rest } = messageBar;
        // Ensure path to match is a RegExp
        path = new RegExp(path);
        if (path.test(pagePath)) {
          // The path matches, but test if there are exclusions that match
          if (exclude !== undefined) {
            // Ensure exclude is a RegExp
            exclude = new RegExp(exclude);
            if (exclude.test(pagePath)) {
              // Exclude matched, break to return null
              break;
            }
          }
          // No exclusions matched, set the message bar JSX and break to return it
          _messageBar = <SiteMessageBar {...rest} />;
          break;
        }
      }
    }
    return _messageBar;
  }

  private _renderPageNav(): JSX.Element | null {
    const { activePages, searchablePageTitle, isContentFullBleed } = this.state;

    if (!isContentFullBleed && activePages) {
      return (
        <div className={styles.siteNavScrollWrapper}>
          <ScrollBars>
            <div className={styles.siteNavWrapper}>
              <div className={styles.siteNavHeader}>{this._renderPlatformPicker()}</div>
              <Nav
                pages={activePages}
                searchablePageTitle={searchablePageTitle}
                onLinkClick={this._onLeftNavLinkClick}
                onSearchBoxClick={this._onLeftNavSearchBoxClick}
              />
            </div>
          </ScrollBars>
        </div>
      );
    }
    return null;
  }

  /**
   * Determines the current page's platform.
   */
  private _getPlatform = (
    activePlatforms: ISiteState<TPlatforms>['activePlatforms'] = this.state.activePlatforms,
  ): TPlatforms => {
    const currentPage = getSiteArea(this.props.siteDefinition.pages);

    if (activePlatforms && activePlatforms[currentPage]) {
      return activePlatforms[currentPage];
    }

    return 'default' as TPlatforms;
  };

  private _renderTopNav = (): JSX.Element | undefined => {
    const { platform } = this.state;
    const { siteDefinition, hasUHF } = this.props;

    if (!hasUHF) {
      return (
        <TopNav
          siteLogoSource={siteDefinition.siteLogoSource}
          platform={platform}
          pages={siteDefinition.pages}
          onRenderNavFooter={this._renderPlatformPicker}
          onLinkClick={this._onTopNavLinkClick}
          badgeText={siteDefinition.badgeText}
        />
      );
    }
  };

  private _renderPlatformPicker = (): JSX.Element | null => {
    const { siteDefinition } = this.props;
    const { hasPlatformPicker, platform, pagePlatforms } = this.state;

    if (hasPlatformPicker && siteDefinition.platforms && pagePlatforms && Object.keys(pagePlatforms).length > 0) {
      return (
        <PlatformPicker
          activePlatform={platform}
          onPlatformClick={this._onPlatformChanged}
          pagePlatforms={pagePlatforms}
          platforms={siteDefinition.platforms}
        />
      );
    }
    return null;
  };

  private _renderPlatformBar = (): JSX.Element | undefined => {
    const { siteDefinition } = this.props;
    const { platform, pagePlatforms, hasPlatformPicker } = this.state;

    return (
      hasPlatformPicker &&
      Object.keys(pagePlatforms).length > 0 && (
        <PlatformBar
          activePlatform={platform}
          onPlatformClick={this._onPlatformChanged}
          pagePlatforms={pagePlatforms}
          platforms={siteDefinition.platforms}
          innerWidth={appMaximumWidthLg}
        />
      )
    );
  };

  /**
   * Callback for when Top Nav Links are clicked. Fires a tracking event.
   */
  private _onTopNavLinkClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    const { platform } = this.state;
    const { siteDefinition } = this.props;
    const target = ev.currentTarget as HTMLAnchorElement;
    trackEvent(EventNames.ClickedTopNavLink, {
      // Use the dom element's title or innerText as the topic.
      topic: target.title || target.innerText, // @TODO: Remove topic when data is stale.
      currentArea: getSiteArea(siteDefinition.pages),
      nextArea: getSiteArea(siteDefinition.pages, target.hash || target.href),
      nextPage: target.hash || target.href,
      currentPage: window.location.hash,
      platform: platform === 'default' ? 'None' : platform, // @TODO: Remove platform when data is stale.
      currentPlatform: platform === 'default' ? 'None' : platform, // Pages that don't have a platform will say 'none'
    });
  };

  /**
   * Callback for when Left Nav Links are clicked. Fires a tracking event.
   */
  private _onLeftNavLinkClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    const { platform } = this.state;
    const { siteDefinition } = this.props;
    const target = ev.currentTarget as HTMLAnchorElement;
    trackEvent(EventNames.ClickedLeftNavLink, {
      // Use the dom element's title or innerText as the topic.
      topic: target.title || target.innerText, // @TODO: Remove topic when data is stale.
      currentArea: getSiteArea(siteDefinition.pages),
      nextArea: getSiteArea(siteDefinition.pages, target.hash || target.href),
      nextPage: target.hash || target.href,
      currentPage: window.location.hash,
      platform: platform === 'default' ? 'None' : platform, // @TODO: Remove platform when data is stale.
      currentPlatform: platform === 'default' ? 'None' : platform, // Pages that don't have a platform will say 'none'
    });
  };

  /**
   * Callback for when Left Nav SearchBox is clicked. Fires a tracking event.
   */
  private _onLeftNavSearchBoxClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    const { platform } = this.state;
    const { siteDefinition } = this.props;
    trackEvent(EventNames.ClickedSearchFilter, {
      // Use the dom element's title or innerText as the topic.
      topic: getSiteArea(siteDefinition.pages), // @TODO: Remove topic when data is stale.
      currentArea: getSiteArea(siteDefinition.pages),
      platform: platform === 'default' ? 'None' : platform, // @TODO: Remove platform when data is stale.
      currentPlatform: platform === 'default' ? 'None' : platform, // Pages that don't have a platform will say 'none'
    });
  };

  /**
   * Set the state and local storage for the current page's platform. Fires a tracking event.
   * @param platformKey The key of the target platform as defined in siteDefinition.
   */
  private _onPlatformChanged = (platformKey: TPlatforms): void => {
    const { siteDefinition } = this.props;
    // if (platformKey !== this.state.platform) {
    trackEvent(EventNames.ChangedPlatform, {
      topic: getSiteArea(siteDefinition.pages), // @TODO: Remove topic when data is stale.
      currentArea: getSiteArea(siteDefinition.pages),
      platform: platformKey, // @TODO: Remove platform when data is stale.
      currentPlatform: this.state.platform,
      nextPlatform: platformKey,
    });

    const { activePlatforms } = this.state;
    const currentPage = getSiteArea(siteDefinition.pages);

    this.setState(
      {
        platform: platformKey,
        activePlatforms: {
          ...activePlatforms,
          [currentPage]: platformKey,
        },
      },
      this._setActivePlatforms,
    );
    // }
  };

  private _setActivePlatforms = () => {
    setItem('activePlatforms', JSON.stringify(this.state.activePlatforms));
  };

  /**
   * Sets the current page's platform if a platform key (as defined in AppState)
   * is detected in the window URL. Fires a pageView tracking event.
   */
  private _handleRouteChange = (): void => {
    const { pagePath: prevPagePath, platform, activePlatforms } = this.state;
    const { siteDefinition } = this.props;
    const { platforms } = siteDefinition;

    const newPagePath = getNormalizedPath();
    // Top level path (Controls, Get started or Styles)
    const siteArea = getSiteArea(siteDefinition.pages);

    if (prevPagePath === newPagePath) {
      // Must have been a change to the anchor only (not the route).
      // Don't do a full update, just jump to the anchor.
      this._jumpToAnchor(extractAnchorLink(location.hash));
      return;
    }

    let currPlatform: TPlatforms | undefined;
    const platformKeys = Object.keys(platforms || {}) as TPlatforms[];
    if (platformKeys.length > 0) {
      const prevPlatform = activePlatforms[siteArea] || platform;
      const prevPlatformRegex = new RegExp(`/${prevPlatform}\\b`);

      if (prevPlatformRegex.test(newPagePath)) {
        // the platform didn't change
        currPlatform = prevPlatform;
      } else {
        for (const key of platformKeys) {
          // If the user navigates directly to a platform-specific page, set the active platform to that of the new page
          const newPlatformRegex = new RegExp(`/${key}(?![a-z])`, 'gi');
          if (newPlatformRegex.test(newPagePath)) {
            currPlatform = key;
            this._onPlatformChanged(key);
            break;
          }
        }
      }
    }

    const activePageName = getActivePage(siteDefinition, currPlatform, newPagePath)?.title;
    // Example: Fluent UI - Controls - React - Button
    document.title = [
      siteDefinition.siteTitle,
      siteArea,
      currPlatform && platforms[currPlatform]?.name,
      activePageName !== siteArea && activePageName,
    ]
      .filter(Boolean)
      .join(' - ');

    // @TODO: investigate using real page name.
    trackPageView('FabricPage', newPagePath, {
      currentArea: siteArea,
      previousPage: prevPagePath,
      platform: platform === 'default' ? 'None' : platform, // @TODO: Remove platform when data is stale.
      currentPlatform: platform === 'default' ? 'None' : platform, // Pages that don't have a platform will say 'none'
      referrer: document.referrer.length ? document.referrer : undefined,
    });

    // @TODO: investigate using history to save a re-render.
    this.setState({ pagePath: newPagePath });
  };

  private _jumpToAnchor(anchor: string): void {
    if (this._jumpInterval) {
      this._async.clearInterval(this._jumpInterval);
      this._jumpInterval = undefined;
    }
    if (anchor) {
      // If we've just re-rendered, the element needed may not be rendered yet.
      // Retry every 100ms (up to 1s) until the element shows up.
      const start = Date.now();
      this._jumpInterval = this._async.setInterval(() => {
        const el = document.getElementById(anchor);
        if (el || Date.now() - start > 1000) {
          this._async.clearInterval(this._jumpInterval);
          this._jumpInterval = undefined;
          if (el) {
            jumpToAnchor(anchor);
          }
        }
      }, 100);
    }
  }
}
