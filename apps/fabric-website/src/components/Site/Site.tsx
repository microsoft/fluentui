import * as React from 'react';
import { css, Customizer } from 'office-ui-fabric-react';
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
  TPlatformPages
} from '@uifabric/example-app-base/lib/index2';
import { Nav } from '../Nav/index';
import { AppCustomizations } from './customizations';
import { AppCustomizationsContext } from '@uifabric/example-app-base/lib/index';
import * as styles from './Site.module.scss';
import { appMaximumWidthLg } from '../../styles/constants';
import SiteMessageBar from './SiteMessageBar';

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
  pagePath?: string;
  activePlatforms: { [topLevelPage: string]: TPlatforms };
}

export class Site<TPlatforms extends string = string> extends React.Component<ISiteProps<TPlatforms>, ISiteState<TPlatforms>> {
  public static defaultProps: ISiteProps = {
    siteDefinition: { ...baseDefinition }
  };

  constructor(props: ISiteProps<TPlatforms>) {
    super(props);

    this.state = {
      activePlatforms: {},
      platform: 'default' as TPlatforms
    };
  }

  public componentDidMount(): void {
    const { siteDefinition } = this.props;
    if (siteDefinition.pages) {
      // Get top level pages with platforms.
      const topLevelPages = siteDefinition.pages.filter(page => !!page.platforms).map(page => page.title);

      // Get local storage platforms for top level pages.
      let activePlatforms: ISiteState<TPlatforms>['activePlatforms'];
      try {
        // Accessing localStorage can throw for various reasons
        activePlatforms = JSON.parse(localStorage.getItem('activePlatforms') || '') || {};
      } catch (ex) {
        activePlatforms = {};
      }

      // Set active platform for each top level page to local storage platform or the first platform defined for that page.
      topLevelPages.forEach(item => {
        activePlatforms[item] = activePlatforms[item] || getPageFirstPlatform(item, siteDefinition);
      });

      // Set the initial state with navigation data and the activePlatforms.
      this.setState({ ...(this._getNavData() as ISiteState<TPlatforms>), activePlatforms }, this._setActivePlatforms);
      // Handle hash routing
      window.addEventListener('hashchange', this._handleRouteChange);
      this._handleRouteChange();
    }
  }

  public componentWillUnmount(): void {
    window.removeEventListener('hashchange', this._handleRouteChange);
  }

  public componentWillReceiveProps(nextProps: ISiteProps): void {
    if (nextProps && nextProps.children !== this.props.children) {
      // TODO: decide which version to use
      // from Jordan:
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      // from Natalie:
      // when loading a new component page, we want to scroll to the top
      // if (hash.indexOf('/components') !== -1) {
      //   window.scrollTo(0, 0);
      // }
    }

    this.setState(this._getNavData() as ISiteState<TPlatforms>);
  }

  public render(): JSX.Element {
    const { platform, isContentFullBleed } = this.state;
    const { children, siteDefinition } = this.props;
    const { customizations } = siteDefinition;
    const childrenWithPlatform = React.Children.map(children, (child: React.ReactElement<IWithPlatformProps>) =>
      React.cloneElement(child, { platform })
    );

    const SiteContent = () => (
      <div key="site" className={styles.siteRoot}>
        {this._renderTopNav()}
        {this._renderMessageBar()}
        <div className={css(styles.siteWrapper, isContentFullBleed && styles.fullWidth)}>
          {this._renderPageNav()}
          <main className={styles.siteContent} data-is-scrollable="true" data-app-content-div="true" role="main">
            {childrenWithPlatform}
          </main>
        </div>
        {this._renderPlatformBar()}
      </div>
    );

    return (
      <PlatformContext.Provider value={platform}>
        <AppCustomizationsContext.Provider value={AppCustomizations}>
          {customizations ? (
            <Customizer {...customizations}>
              <SiteContent />
            </Customizer>
          ) : (
            <SiteContent />
          )}
        </AppCustomizationsContext.Provider>
      </PlatformContext.Provider>
    );
  }

  private _getNavData(): Partial<ISiteState<TPlatforms>> {
    const { siteDefinition } = this.props;
    const pages = siteDefinition.pages;
    if (!pages) {
      return {};
    }

    const platform = this._getPlatform();
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
      pagePlatforms
    };
  }

  private _renderMessageBar(): JSX.Element | null {
    const { pagePath = '' } = this.state;
    // TODO: generalize when to show a message bar and how to provide the text
    if (pagePath && pagePath.indexOf('#/controls/web/') === 0 && pagePath.indexOf('fluent-theme') === -1) {
      return (
        <SiteMessageBar
          text="You can now implement the new Fluent styles in Fabric Web controls."
          linkText="Learn more"
          linkUrl="#/controls/web/fluent-theme"
          sessionStoragePrefix="WebFluentUpdates"
        />
      );
    } else if (/^#?\/?$/.test(pagePath)) {
      return (
        <SiteMessageBar
          text="Microsoft employees can sign in to see additional documentation."
          linkText="Sign in"
          linkUrl="http://aka.ms/hig"
          sessionStoragePrefix="SignIn"
        />
      );
    }
    return null;
  }

  private _renderPageNav(): JSX.Element | null {
    const { activePages, searchablePageTitle, isContentFullBleed, pagePlatforms = {} } = this.state;

    if (!isContentFullBleed && activePages) {
      // If current page doesn't have pages for the active platform, switch to its first platform.
      if (Object.keys(pagePlatforms).length > 0 && activePages.length === 0) {
        this._onPlatformChanged(Object.keys(pagePlatforms)[0] as TPlatforms);
      }

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
  private _getPlatform = (): TPlatforms => {
    const currentPage = getSiteArea();
    const { activePlatforms } = this.state;

    if (activePlatforms[currentPage]) {
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
    const target = ev.currentTarget as HTMLAnchorElement;
    trackEvent(EventNames.ClickedTopNavLink, {
      // Use the dom element's title or innerText as the topic.
      topic: target.title || target.innerText, // @TODO: Remove topic when data is stale.
      currentArea: getSiteArea(),
      nextArea: getSiteArea(target.hash || target.href),
      nextPage: target.hash || target.href,
      currentPage: window.location.hash,
      platform: platform === 'default' ? 'None' : platform, // @TODO: Remove platform when data is stale.
      currentPlatform: platform === 'default' ? 'None' : platform // Pages that don't have a platform will say 'none'
    });
  };

  /**
   * Callback for when Left Nav Links are clicked. Fires a tracking event.
   */
  private _onLeftNavLinkClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    const { platform } = this.state;
    const target = ev.currentTarget as HTMLAnchorElement;
    trackEvent(EventNames.ClickedLeftNavLink, {
      // Use the dom element's title or innerText as the topic.
      topic: target.title || target.innerText, // @TODO: Remove topic when data is stale.
      currentArea: getSiteArea(),
      nextArea: getSiteArea(target.hash || target.href),
      nextPage: target.hash || target.href,
      currentPage: window.location.hash,
      platform: platform === 'default' ? 'None' : platform, // @TODO: Remove platform when data is stale.
      currentPlatform: platform === 'default' ? 'None' : platform // Pages that don't have a platform will say 'none'
    });
  };

  /**
   * Callback for when Left Nav SearchBox is clicked. Fires a tracking event.
   */
  private _onLeftNavSearchBoxClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    const { platform } = this.state;
    trackEvent(EventNames.ClickedSearchFilter, {
      // Use the dom element's title or innerText as the topic.
      topic: getSiteArea(undefined, false), // @TODO: Remove topic when data is stale.
      currentArea: getSiteArea(),
      platform: platform === 'default' ? 'None' : platform, // @TODO: Remove platform when data is stale.
      currentPlatform: platform === 'default' ? 'None' : platform // Pages that don't have a platform will say 'none'
    });
  };

  /**
   * Set the state and local storage for the current page's platform. Fires a tracking event.
   * @param platformKey The key of the target platform as defined in siteDefinition.
   */
  private _onPlatformChanged = (platformKey: TPlatforms): void => {
    if (platformKey !== this.state.platform) {
      trackEvent(EventNames.ChangedPlatform, {
        topic: getSiteArea(undefined, false), // @TODO: Remove topic when data is stale.
        currentArea: getSiteArea(),
        platform: platformKey, // @TODO: Remove platform when data is stale.
        currentPlatform: this.state.platform,
        nextPlatform: platformKey
      });

      const { activePlatforms } = this.state;
      const currentPage = getSiteArea();

      this.setState(
        {
          platform: platformKey,
          activePlatforms: {
            ...activePlatforms,
            [currentPage]: platformKey
          }
        },
        this._setActivePlatforms
      );
    }
  };

  private _setActivePlatforms = () => {
    try {
      localStorage.setItem('activePlatforms', JSON.stringify(this.state.activePlatforms));
    } catch (ex) {
      // ignore
    }
  };

  /**
   * Sets the current page's platform if a platform key (as defined in AppState)
   * is detected in the window URL. Fires a pageView tracking event.
   */
  private _handleRouteChange = (): void => {
    const { pagePath: prevPagePath, platform } = this.state;
    const { siteDefinition } = this.props;
    const { platforms } = siteDefinition;
    const newPagePath = window.location.hash;

    const platformKeys = platforms && (Object.keys(platforms) as TPlatforms[]);
    if (platformKeys && platformKeys.length > 0) {
      // Test if the platform has changed on each hashchange to avoid costly forEach below.
      const isCurrentPlatform = new RegExp(`/${platform}`);

      !isCurrentPlatform.test(newPagePath) &&
        platformKeys.forEach(platformKey => {
          // If the user navigates directly to a platform specific page, set the active platform to that of the new page.
          const isNewPlatform = new RegExp(`/${platformKey}`, 'gi');
          if (isNewPlatform.test(newPagePath)) {
            this._onPlatformChanged(platformKey);
          }
        });
    }

    // @TODO: investigate using real page name.
    trackPageView('FabricPage', newPagePath, {
      currentArea: getSiteArea(),
      previousPage: prevPagePath,
      platform: platform === 'default' ? 'None' : platform, // @TODO: Remove platform when data is stale.
      currentPlatform: platform === 'default' ? 'None' : platform, // Pages that don't have a platform will say 'none'
      referrer: document.referrer.length ? document.referrer : undefined
    });

    // @TODO: investigate using history to save a re-render.
    this.setState({ pagePath: newPagePath });
  };
}
