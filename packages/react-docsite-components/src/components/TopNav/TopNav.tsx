import * as React from 'react';
import { css, FocusZone, Panel, PanelType, ScreenWidthMinUhfMobile, on } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';
import { hasActiveChild, getNormalizedPath } from '../../utilities/index2';
import { INavPage } from '../Nav/Nav.types';
import { Badge } from '../Badge/index';
import { ITopNavProps } from './TopNav.types';
import * as styles from './TopNav.module.scss';

export interface ITopNavState {
  isNavOpen: boolean;
  isSmallScreen?: boolean;
}

// Timer used to throttle resize events.
let resizeTimer: any; // eslint-disable-line @typescript-eslint/no-explicit-any

export class TopNav extends React.Component<ITopNavProps, ITopNavState> {
  public state: Readonly<ITopNavState> = { isNavOpen: false };

  private _disposables: Function[] = [];
  private _isMounted: boolean = false;
  private _route: string = getNormalizedPath();

  public componentDidMount(): void {
    this._isMounted = true;
    this._disposables.push(on(window, 'resize', this._onWindowResize));
    this._disposables.push(on(window, 'hashchange', this._onHashChange));

    this._onWindowResize();
  }

  public componentWillUnmount(): void {
    this._isMounted = false;
    this._disposables.forEach(dispose => dispose());
  }

  public render(): JSX.Element {
    const { isSmallScreen, isNavOpen } = this.state;
    const { onRenderNavFooter, pages, badgeText } = this.props;

    return (
      <FocusZone className={styles.topNavWrapper}>
        <nav className={css(styles.topNav)} role="navigation">
          {isSmallScreen ? (
            <>
              <IconButton
                className={styles.mobileMenuButton}
                iconProps={{
                  iconName: 'GlobalNavButton',
                  styles: {
                    root: {
                      fontSize: 20, // Matches UHF menu
                    },
                  },
                }}
                onClick={this._openNavPanel}
              />
              {pages && this._renderAppLogo(pages)}
              <Panel
                className="ms-App-topNavPanel"
                isOpen={isNavOpen}
                isLightDismiss={true}
                type={PanelType.smallFixedNear}
                onDismiss={this._closeNavPanel}
                isFooterAtBottom={true}
                onRenderFooterContent={onRenderNavFooter}
                styles={{
                  navigation: {
                    height: 52, // Matches TopNav height
                  },
                }}
              >
                {pages && <FocusZone>{this._renderLinkList(pages, true)}</FocusZone>}
                {badgeText && <Badge className={styles.badgeMobile}>{badgeText}</Badge>}
              </Panel>
            </>
          ) : (
            <>
              {pages && (
                <>
                  <div className={styles.homeLinkSection}>{this._renderAppLogo(pages)}</div>
                  <div className={styles.linkListSection}>{this._renderLinkList(pages)}</div>
                </>
              )}
              {badgeText && <Badge className={styles.badge}>{badgeText}</Badge>}
            </>
          )}
        </nav>
      </FocusZone>
    );
  }

  private _onWindowResize = (): void => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      this._isMounted &&
        this.setState({
          isSmallScreen: window.innerWidth < ScreenWidthMinUhfMobile,
        });
    }, 100);
  };

  private _onHashChange = (): void => {
    const newRoute = getNormalizedPath();
    if (this._isMounted && newRoute !== this._route) {
      this._route = newRoute;
      this.setState({ isNavOpen: false });
    }
  };

  private _openNavPanel = (): void => {
    this._isMounted && this.setState({ isNavOpen: true });
  };

  private _closeNavPanel = (): void => {
    this._isMounted && this.setState({ isNavOpen: false });
  };

  private _renderAppLogo(pages: INavPage[]): JSX.Element | null {
    const home = pages.filter((page: INavPage) => page.isHomePage)[0];
    if (home) {
      return (
        <a href={home.url} className={styles.appLogo} title="Home page">
          {/* @todo: Set up baseImageUrl to easily swap image host. */}
          <img src={this.props.siteLogoSource} role="presentation" />
        </a>
      );
    }
    return null;
  }

  private _renderLink(page: INavPage, linkIndex: number, isStacked?: boolean): JSX.Element | undefined {
    const { platform } = this.props;
    if (page.isHiddenFromMainNav) {
      return undefined;
    }
    return (
      <li
        className={css(
          styles.link,
          page.isHomePage && styles.isHomePage,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          page.className && (styles as any)[page.className],
          hasActiveChild(page, platform) && styles.isActive,
          isStacked && styles.isStacked,
        )}
        key={linkIndex}
      >
        <a href={page.url} onClick={this.props.onLinkClick} title={page.title}>
          <span className={styles.linkTitle}>{page.title}</span>
        </a>
      </li>
    );
  }

  private _renderLinkList(pages: INavPage[], isStacked?: boolean): JSX.Element {
    const links: (JSX.Element | undefined)[] = pages
      .filter((page: INavPage) => {
        if (!page.isHiddenFromMainNav && page.isHomePage && !isStacked) {
          return false;
        }

        return true;
      })
      .map((page: INavPage, pageIndex: number) => this._renderLink(page, pageIndex, isStacked));

    return (
      <ul className={css(styles.links, isStacked && styles.isStacked)} aria-label="Website top-level navigation">
        {links}
      </ul>
    );
  }
}
