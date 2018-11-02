import * as React from 'react';

import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { SearchBox, ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import {
  CollapsibleSection,
  CollapsibleSectionTitle,
  ICollapsibleSectionTitleComponent,
  ICollapsibleSectionTitleStyles
} from '@uifabric/experiments';

import { getPathMinusLastHash } from '../../utilities/pageroute';
import * as stylesImport from './Nav.module.scss';
const styles: any = stylesImport;
import { INavProps, INavPage } from './Nav.types';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';

export interface INavState {
  searchQuery: string;
  defaultFilterState: boolean;
  filterState: boolean;
}

const searchBoxStyles: IStyleSet<ISearchBoxStyles> = {
  root: {
    marginBottom: '5px',
    width: '152px',
    backgroundColor: 'transparent'
  },
  iconContainer: {
    display: 'none'
  },
  field: {
    backgroundColor: 'transparent',
    color: 'white'
  },
  clearButton: {
    selectors: {
      '.ms-Button': {
        color: 'white'
      }
    }
  }
};

const getTitleStyles: ICollapsibleSectionTitleComponent['styles'] = props => {
  const { theme } = props;
  return {
    root: [
      {
        color: theme.palette.neutralQuaternaryAlt,
        marginBottom: '8px',
        selectors: {
          ':hover': {
            background: theme.palette.neutralPrimary,
            cursor: 'pointer'
          }
        }
      }
    ],
    text: theme.fonts.medium
  };
};

export class Nav extends React.Component<INavProps, INavState> {
  constructor(props: INavProps) {
    super(props);

    this.state = {
      searchQuery: '',
      defaultFilterState: true,
      filterState: true
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

  private _renderLinkList(pages: INavPage[], isSubMenu: boolean, title?: string): React.ReactElement<{}> {
    const { filterState } = this.state;

    const links = pages.filter(page => !page.hasOwnProperty('isHiddenFromMainNav')).map((page: INavPage, linkIndex: number) => {
      if (page.isCategory && !filterState) {
        return <span>{page.pages.map((innerPage: INavPage, innerLinkIndex) => this._renderLink(innerPage, innerLinkIndex))}</span>;
      }
      return page.isCategory && filterState ? this._renderCategory(page, linkIndex) : this._renderLink(page, linkIndex);
    });

    return (
      <ul className={css(styles.links, isSubMenu ? styles.isSubMenu : '')} aria-label="Main website navigation">
        {title === 'Components' ? this._getSearchBox() : ''}
        {links}
      </ul>
    );
  }

  private _renderCategory(page: INavPage, categoryIndex: number): React.ReactElement<{}> {
    if (page.isCategory && page.pages) {
      return (
        <span key={categoryIndex} className={css(styles.category, _hasActiveChild(page) && styles.hasActiveChild)}>
          <CollapsibleSection
            titleAs={CollapsibleSectionTitle}
            titleProps={{ text: page.title, styles: getTitleStyles }}
            styles={{ body: [{ marginLeft: '28px' }] }}
            defaultCollapsed={!_hasActiveChild(page)}
          >
            {page.pages.map((innerPage: INavPage, indexNumber: number) => this._renderLink(innerPage, indexNumber))}
          </CollapsibleSection>
        </span>
      );
    }
  }

  private _renderSortedLinks(pages: INavPage[], title: string): React.ReactElement<{}> {
    const links: INavPage[] = [];
    pages.map((page: INavPage) => page.pages.map((link: INavPage) => links.push(link)));
    links.sort((l1, l2) => {
      if (l1.title > l2.title) {
        return 1;
      } else if (l1.title < l2.title) {
        return -1;
      }
      return 0;
    });

    return this._renderLinkList(links, true, title);
  }

  private _renderLink(page: INavPage, linkIndex: number): React.ReactElement<{}> {
    const ariaLabel = page.pages ? 'Hit enter to open sub menu, tab to access sub menu items.' : '';
    const title = page.title === 'Fabric' ? 'Home page' : page.title;
    const childLinks =
      page.pages && title === 'Components' && !this.state.filterState
        ? this._renderSortedLinks(page.pages, title)
        : page.pages
          ? this._renderLinkList(page.pages, true, title)
          : null;
    const { searchQuery } = this.state;
    const text = page.title;
    let linkText = <>{text}</>;
    let matchIndex;

    // Highlight search query within link.
    if (!!searchQuery && page.isFilterable) {
      matchIndex = text.toLowerCase().indexOf(searchQuery.toLowerCase());
      if (matchIndex >= 0) {
        const before = text.slice(0, matchIndex);
        const match = text.slice(matchIndex, matchIndex + searchQuery.length);
        const after = text.slice(matchIndex + searchQuery.length);
        const highlightMatch = <span className={styles.matchesFilter}>{match}</span>;
        linkText = (
          <>
            {before}
            {highlightMatch}
            {after}
          </>
        );
      }
    }

    return (
      <span>
        <li
          className={css(
            styles.link,
            _isPageActive(page) && searchQuery === '' ? styles.isActive : '',
            _hasActiveChild(page) ? styles.hasActiveChild : '',
            page.isHomePage ? styles.isHomePage : '',
            page.className ? styles[page.className] : ''
          )}
          key={linkIndex}
        >
          {!(page.isUhfLink && location.hostname !== 'localhost') &&
            (page.isFilterable && searchQuery !== '' ? matchIndex > -1 : true) && (
              <a href={page.url} onClick={this._onLinkClick} title={title} aria-label={ariaLabel}>
                {linkText}
              </a>
            )}
          {childLinks}
        </li>
      </span>
    );
  }

  private _getSearchBox() {
    return (
      <div className={styles.searchBox}>
        <SearchBox placeholder="Filter components" underlined styles={searchBoxStyles} onChange={this._onChangeQuery} />
        <IconButton
          iconProps={{ iconName: 'filter' }}
          style={{ color: 'white', marginLeft: '5px' }}
          menuIconProps={{ iconName: '' }}
          menuProps={{
            items: [
              {
                key: 'categories',
                text: 'Categories',
                iconProps: { iconName: 'org' },
                onClick: this._setCategories
              },
              {
                key: 'alphabetized',
                text: 'A to Z',
                iconProps: { iconName: 'Ascending' },
                onClick: this._setAlphabetized
              }
            ]
          }}
        />
      </div>
    );
  }

  private _onLinkClick = (ev: React.MouseEvent<{}>) => {
    if (this.props.onLinkClick) {
      return this.props.onLinkClick(ev);
    }
    this.setState({
      searchQuery: ''
    });
  };

  private _onChangeQuery = newValue => {
    this.setState({
      searchQuery: newValue,
      filterState: false
    });
    if (newValue === '') {
      this.setState({
        filterState: this.state.defaultFilterState
      });
    }
  };

  private _setCategories = (): void => {
    this.setState({
      defaultFilterState: true,
      filterState: true
    });
  };

  private _setAlphabetized = (): void => {
    this.setState({
      defaultFilterState: false,
      filterState: false
    });
  };
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
  let hasActiveChild = false;

  if (page.pages) {
    page.pages.forEach(childPage => {
      if (_isPageActive(childPage)) {
        hasActiveChild = true;
      }

      if (childPage.pages) {
        _hasActiveChild(childPage) ? (hasActiveChild = true) : null;
      }
    });
  }

  return hasActiveChild;
}
