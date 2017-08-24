import * as React from 'react';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import * as stylesImport from './Nav.module.scss';
const styles: any = stylesImport;
import {
  INavProps,
  INavPage
} from './Nav.Props';

export interface INavState {
}

export class Nav extends React.Component<INavProps, INavState> {

  public render() {
    let { pages } = this.props;

    if (!pages) {
      return null;
    }

    const links = pages
      ? this._renderLinkList(pages, false)
      : null;

    return (
      <FocusZone direction={ FocusZoneDirection.vertical } >
        <nav className={ styles.nav } role='navigation'>
          { links }
        </nav>
      </FocusZone>
    );
  }

  private _renderLink(page: INavPage, linkIndex: number): React.ReactElement<{}> {
    const childLinks = page.pages
      ? this._renderLinkList(page.pages, true)
      : null;
    const ariaLabel = page.pages ?
      'Hit enter to open sub menu, tab to access sub menu items.' : '';
    const title = (page.title === 'Fabric') ? 'Home page' : page.title;

    return (
      <li className={ css(styles.link,
        _isPageActive(page) ? styles.isActive : '',
        _hasActiveChild(page) ? styles.hasActiveChild : '',
        page.isHomePage ? styles.isHomePage : '',
        page.className ? styles[page.className] : ''
      ) } key={ linkIndex }>

        { page.isHeaderLink ?
          '' : <a
            href={ page.url }
            onClick={ this.props.onLinkClick }
            title={ title }
            aria-label={ ariaLabel }
          >
            { page.title }
          </a> }

        { childLinks }
      </li>
    );
  }

  private _renderLinkList(pages: INavPage[], isSubMenu: boolean): React.ReactElement<{}> {
    const links: React.ReactElement<{}>[] = pages
      .filter(page => !page.hasOwnProperty('isHiddenFromMainNav'))
      .map(
      (page: INavPage, linkIndex: number) => this._renderLink(page, linkIndex)
      );

    return (
      <ul className={ css(styles.links,
        isSubMenu ? styles.isSubMenu : ''
      ) } aria-label='Main website navigation'>
        { links }
      </ul>
    );
  }
}

// A tag used for resolving links.
const _urlResolver = document.createElement('a');

function _isPageActive(page: INavPage): boolean {
  if (!page.url) {
    return false;
  }
  _urlResolver.href = page.url || '';
  const target: string = _urlResolver.href;

  if (location.protocol + '//' + location.host + location.pathname === target) {
    return true;
  }

  if (location.href === target) {
    return true;
  }

  if (location.hash) {
    // Match the hash to the url.
    if (location.hash === page.url) {
      return true;
    }

    // Match a rebased url. (e.g. #foo becomes http://hostname/foo)
    _urlResolver.href = location.hash.substring(1);

    return _urlResolver.href === target;
  }

  return false;
}

function _hasActiveChild(page: INavPage): boolean {
  let hasActiveChild: boolean = false;

  if (page.pages) {
    page.pages.forEach((childPage) => {
      if (_isPageActive(childPage)) {
        hasActiveChild = true;
      }

      // Is a grandchild page active?
      // @todo: This logic is the same as above. Could be simplified by moving
      //        into another function, which would support many levels of nav.
      if (childPage.pages) {
        childPage.pages.forEach((grandchildPage) => {
          if (_isPageActive(grandchildPage)) {
            hasActiveChild = true;
          }
        });
      }
    });
  }

  return hasActiveChild;
}