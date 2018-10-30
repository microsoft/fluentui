import * as React from 'react';
import { css, FocusZone } from 'office-ui-fabric-react';
// import { hasActiveChild } from '../../utilities/index';
import { INavPage } from '../Nav/Nav.types';
import { ITopNavProps } from './TopNav.types';
import * as stylesImport from './TopNav.module.scss';
const styles: any = stylesImport;

export interface ITopNavState {}

export class TopNavBase extends React.Component<ITopNavProps, ITopNavState> {
  public render() {
    return (
      <FocusZone className={styles.topNavWrapper}>
        <nav className={css(styles.topNav)} role="navigation">
          <div className={styles.homeLinkSection}>{this._renderHomeLink(this.props.pages)}</div>
          <div className={styles.linkListSection}>{this._renderLinkList(this.props.pages)}</div>
        </nav>
      </FocusZone>
    );
  }

  private _renderHomeLink(pages: INavPage[]): JSX.Element {
    const home = pages.filter(page => page.isHomePage)[0];

    return (
      <div className={styles.isHomePage}>
        <a href="https://microsoft.com/" title="Home page" aria-label="Home page" className={styles.microsoftLogo}>
          <img src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31" alt="Microsoft logo" />
        </a>
        <a href="/#" className={styles.isFabricLink}>
          Fabric
        </a>
      </div>
    );
  }

  private _renderLink(page: INavPage, linkIndex: number): JSX.Element {
    const { platform } = this.props;
    if (page.isHiddenFromMainNav) {
      return null;
    }
    return (
      <li
        className={css(
          styles.link,
          page.isHomePage && styles.isHomePage,
          page.className && styles[page.className]
          // hasActiveChild(page, platform) && styles.isActive
        )}
        key={linkIndex}
      >
        <a href={page.url} onClick={this.props.onLinkClick} title={page.title}>
          <span className={styles.linkTitle}>{page.title}</span>
        </a>
      </li>
    );
  }

  private _renderLinkList(pages: INavPage[]): JSX.Element {
    const links: JSX.Element[] = pages
      .filter(page => !page.hasOwnProperty('isHiddenFromMainNav'))
      .filter(page => !page.isHomePage)
      .map((page, pageIndex) => this._renderLink(page, pageIndex));

    return (
      <ul className={css(styles.links)} aria-label="Website top-level navigation">
        {links}
      </ul>
    );
  }
}

export const TopNav = TopNavBase;
