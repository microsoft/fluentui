import * as React from 'react';

import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

import { getPathMinusLastHash } from '../../utilities/pageroute';
import * as stylesImport from './Nav.module.scss';
const styles: any = stylesImport;
import { INavProps, INavPage } from './Nav.types';
import { css } from 'office-ui-fabric-react/lib/Utilities';

export interface INavState {
  searchQuery: string;
  filterState: boolean;
}

export class Nav extends React.Component<INavProps, INavState> {
  constructor(props: INavProps) {
    super(props);

    this.state = {
      searchQuery: '',
      filterState: false
    };
  }

  public render(): JSX.Element {
    let { pages } = this.props;

    if (!pages) {
      return null;
    }

    const links = pages ? this._renderLinkList(pages, false) : null;

    return (
      <FocusZone>
        <nav className={styles.nav} role="navigation">
          {links}
        </nav>
      </FocusZone>
    );
  }

  private _getSearchBox(val) {
    if (val === 'Components') {
      return (
        <div style={{ display: 'flex' }}>
          <SearchBox
            placeholder="Filter Components"
            underlined={true}
            styles={{
              root: {
                marginBottom: '5px',
                width: '180px',
                backgroundColor: 'transparent',
              },
              iconContainer:{
                display: 'none'
              },
              field: {
                backgroundColor:'transparent',
                color: 'white'
              },
              clearButton: {
                selectors: {
                  '.ms-Button': {
                    color: 'white'
                  }
                }
              }
            }}
            onChange={this._onChangeQuery.bind(this)}
          />
          <IconButton
              iconProps={{iconName: 'filter'}}
              style={{ color:'white', marginLeft: '5px' }}
              menuIconProps={{iconName:''}}

              menuProps={{
                items: [
                  {
                    key: 'categories',
                    text: 'Categories',
                    iconProps: {iconName: 'org'},
                    onClick: this._setCategories.bind(this)
                  },
                  {
                    key: 'alphabetized',
                    text: 'A to Z',
                    iconProps: {iconName: 'Ascending'},
                    onClick: this._setAlphabetized.bind(this)
                  }
                ]
              }}
            />
        </div>
      );
    }
  }

  private _renderLinkList(pages: INavPage[], isSubMenu: boolean): React.ReactElement<{}> {
  const { searchQuery } = this.state;
  const { filterState } = this.state;

  const links: React.ReactElement<{}>[] = pages
    .filter(page => !page.hasOwnProperty('isHiddenFromMainNav'))
    .filter(
      page =>
        page.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1 ||
        page.url.toLowerCase().indexOf('#/components/')
    )
      .map((page: INavPage, linkIndex: number) => { 
        if(page.isCategory && !filterState) {
          return (
            <span> 
              {page.pages.map((page:INavPage, linkIndex) => this._renderLink(page, linkIndex))} 
            </span>
          );
        }
        return this._renderLink(page, linkIndex);
      });

    return (
      <ul className={css(styles.links, isSubMenu ? styles.isSubMenu : '')} aria-label="Main website navigation">
        {links}
      </ul>
    );
  }

  private _renderLink(page: INavPage, linkIndex: number): React.ReactElement<{}> {
    const ariaLabel = page.pages ? 'Hit enter to open sub menu, tab to access sub menu items.' : '';
    const title = page.title === 'Fabric' ? 'Home page' : page.title;
    const childLinks = page.pages ? this._renderLinkList(page.pages, true) : null;

    return (
      <span>
      {this._getSearchBox(title)}
      <li
        className={css(
          styles.link,
          _isPageActive(page) ? styles.isActive : '',
          _hasActiveChild(page) ? styles.hasActiveChild : '',
          page.isHomePage ? styles.isHomePage : '',
          page.className ? styles[page.className] : ''
        )}
        key={linkIndex}
      >
        {page.isUhfLink && location.hostname !== 'localhost' ? (
          ''
        ) : (
          <a href={page.url} onClick={this.props.onLinkClick} title={title} aria-label={ariaLabel}>
            {page.title}
          </a>
        )}

        {childLinks}
      </li>
    </span>
    );
  }

  private _onChangeQuery(newValue): void {
    this.setState({
      searchQuery: newValue
    });
  }

  private _setCategories(): void {
    this.setState({
      filterState: true
    });
  }

  private _setAlphabetized(): void {
    this.setState({
      filterState: false
    });
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
  let path = location.href;

  if (location.protocol + '//' + location.host + location.pathname === target) {
    return true;
  }

  const hashCount = path.split('#').length - 1;
  if (hashCount > 1) {
    path = getPathMinusLastHash(path);
  }

  if (path === target) {
    return true;
  }

  return false;
}

function _hasActiveChild(page: INavPage): boolean {
  let hasActiveChild: boolean = false;

  if (page.pages) {
    page.pages.forEach(childPage => {
      if (_isPageActive(childPage)) {
        hasActiveChild = true;
      }

      // Is a grandchild page active?
      // @todo: This logic is the same as above. Could be simplified by moving
      //        into another function, which would support many levels of nav.
      if (childPage.pages) {
        childPage.pages.forEach(grandchildPage => {
          if (_isPageActive(grandchildPage)) {
            hasActiveChild = true;
          }
        });
      }
    });
  }

  return hasActiveChild;
}
