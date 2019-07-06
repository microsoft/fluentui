import * as React from 'react';
import { CollapsibleSection } from '@uifabric/experiments';
import {
  css,
  FocusZone,
  IButtonStyles,
  Icon,
  IIconProps,
  IconButton,
  ISearchBoxStyles,
  Link,
  SearchBox,
  getFocusStyle
} from 'office-ui-fabric-react';
import { isPageActive, hasActiveChild, INavPage, INavProps, NavSortType } from '@uifabric/example-app-base/lib/index2';
import { theme } from '@uifabric/example-app-base/lib/styles/theme';
import * as styles from './Nav.module.scss';

export interface INavState {
  searchQuery: string;
  defaultSortState: keyof typeof NavSortType;
  sortState: keyof typeof NavSortType;
}

export interface INavLocalItems {
  defaultSortState?: NavSortType;
}

export class Nav extends React.Component<INavProps, INavState> {
  private _localItems: INavLocalItems;

  public constructor(props: INavProps) {
    super(props);

    this._localItems = !!window.localStorage
      ? {
          defaultSortState: NavSortType[localStorage.getItem('defaultSortState') as keyof typeof NavSortType]
        }
      : {};

    this.state = {
      defaultSortState: this._localItems.defaultSortState ? NavSortType[this._localItems.defaultSortState] : NavSortType.categories,
      searchQuery: '',
      sortState: this._localItems.defaultSortState ? NavSortType[this._localItems.defaultSortState] : NavSortType.categories
    };
  }

  public componentDidMount(): void {
    !this._localItems.defaultSortState && localStorage.setItem('defaultSortState', this.state.defaultSortState);
  }

  public shouldComponentUpdate(nextProps: INavProps): boolean {
    if (nextProps.pages !== this.props.pages) {
      this.setState({
        searchQuery: '',
        sortState: this.state.defaultSortState
      });
    }
    return true;
  }

  public render(): JSX.Element | null {
    const { pages } = this.props;
    if (!pages) {
      return null;
    }

    return <div className={styles.navWrapper}>{this._renderPageNav(pages)}</div>;
  }

  private _renderPageNav = (pages: INavPage[]): JSX.Element => {
    const { searchablePageTitle } = this.props;
    const { sortState } = this.state;
    let list: JSX.Element;
    if (sortState === NavSortType.alphabetized && searchablePageTitle) {
      list = this._renderSortedLinks(pages);
    } else {
      list = this._renderLinkList(pages, false);
    }

    return (
      <>
        {searchablePageTitle && this._renderSearchBox(searchablePageTitle)}
        <FocusZone>
          <nav className={styles.nav} role="navigation">
            {list}
          </nav>
        </FocusZone>
      </>
    );
  };

  private _renderLinkList = (pages: INavPage[], isSubMenu: boolean): JSX.Element => {
    const { sortState } = this.state;

    const list = pages
      .filter((page: INavPage) => !page.isHiddenFromMainNav)
      .map((page: INavPage, linkIndex: number) => {
        if (page.isCategory && page.isSearchable && sortState === NavSortType.alphabetized) {
          return page.pages!.map((innerPage: INavPage, innerLinkIndex: number) => this._renderLink(innerPage, innerLinkIndex));
        } else if (page.isCategory) {
          return this._renderSection(page, linkIndex);
        }
        return this._renderLink(page, linkIndex);
      });

    return (
      <ul className={css(styles.links, isSubMenu && styles.isSubMenu)} aria-label="Main website navigation">
        {list}
      </ul>
    );
  };

  private _renderLink = (page: INavPage, linkIndex: number): JSX.Element => {
    const { searchQuery } = this.state;
    const childLinks = page.pages ? this._renderLinkList(page.pages, true) : null;
    const ariaLabel = page.pages ? 'Hit enter to open sub menu, tab to access sub menu items.' : '';
    const title = page.title === 'Fabric' ? 'Home page' : page.title;
    const searchRegEx = new RegExp(searchQuery, 'i');
    const text = page.title;
    let linkText = <>{text}</>;

    // Highlight search query within link.
    if (!!searchQuery) {
      const matchIndex = text.toLowerCase().indexOf(searchQuery.toLowerCase());
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
      <li
        className={css(
          styles.link,
          isPageActive(page.url) && styles.isActive,
          hasActiveChild(page) && styles.hasActiveChild,
          page.isHomePage && styles.isHomePage
        )}
        key={linkIndex + page.url}
      >
        {!(page.isUhfLink && location.hostname !== 'localhost') && searchRegEx.test(page.title) && (
          <Link
            href={page.url}
            onClick={this._onLinkClick}
            title={page.isExternal ? title + ' (External)' : title}
            aria-label={page.isExternal ? ariaLabel + ' (External)' : ariaLabel}
            target={page.isExternal && '_blank'}
          >
            {linkText}
            {page.isExternal && <Icon iconName="NavigateExternalInline" className={styles.externalIcon} />}
          </Link>
        )}

        {childLinks}
      </li>
    );
  };

  private _onLinkClick = (ev: React.MouseEvent<HTMLElement>) => {
    if (this.props.onLinkClick) {
      return this.props.onLinkClick(ev);
    }
    this.setState({
      searchQuery: ''
    });
  };

  private _renderSection = (page: INavPage, sectionIndex: number) => {
    if (page.isCategory && page.pages && this._hasMatchChild(page)) {
      const key = `${page.title}-${sectionIndex}`;
      return (
        <li key={key} className={css(styles.section, hasActiveChild(page) && styles.hasActiveChild)}>
          <CollapsibleSection defaultCollapsed={!hasActiveChild(page)} title={page.title}>
            {this._renderLinkList(page.pages, false)}
          </CollapsibleSection>
        </li>
      );
    }
  };

  private _renderSortedLinks(pages: INavPage[]): React.ReactElement<{}> {
    const flatten = (pgs: INavPage[]): INavPage[] => {
      let links: INavPage[] = [];
      pgs.forEach((page: INavPage) => {
        if (!page.isCategory) {
          links.push(page);
        }
        if (page.pages) {
          links = links.concat(flatten(page.pages));
        }
      });
      return links;
    };
    const flatLinks = flatten(pages);
    flatLinks.sort((a: INavPage, b: INavPage) => {
      // Casing can affect sorting, so convert to lower case.
      const titleA = a.title.toLocaleLowerCase();
      const titleB = b.title.toLocaleLowerCase();
      if (titleA > titleB) {
        return 1;
      }
      if (titleA < titleB) {
        return -1;
      }
      return 0;
    });

    return this._renderLinkList(flatLinks, false);
  }

  private _renderSearchBox = (pageTitle: string) => {
    const { searchQuery, defaultSortState } = this.state;

    const searchBoxStyles: ISearchBoxStyles = {
      iconContainer: {
        marginRight: 8
      }
    };

    const sortButtonStyles: IButtonStyles = {
      root: {
        ...getFocusStyle(theme, 1)
      },
      rootExpanded: {
        background: theme.palette.neutralLighter
      },
      icon: {
        position: 'absolute',
        margin: 0
      }
    };

    const menuIconProps: IIconProps = {
      styles: {
        root: { fontSize: 16 }
      }
    };

    return (
      <div className={styles.searchBoxWrapper}>
        <SearchBox
          className={styles.searchBox}
          placeholder={`Search ${pageTitle}`}
          value={searchQuery}
          onChange={this._onSearchQueryChanged}
          onClick={this._onSearchBoxClick}
          underlined={true}
          styles={searchBoxStyles}
        />
        <IconButton
          className={styles.filterButton}
          title="Sort list"
          iconProps={{
            iconName:
              defaultSortState === NavSortType.alphabetized
                ? 'Ascending'
                : defaultSortState === NavSortType.categories
                ? 'GroupedList'
                : undefined
          }}
          styles={sortButtonStyles}
          menuIconProps={{ iconName: '' }}
          menuProps={{
            items: [
              {
                key: 'categories',
                text: 'Categories',
                iconProps: { iconName: 'GroupedList', ...menuIconProps },
                onClick: this._setSortTypeCategories
              },
              {
                key: 'alphabetized',
                text: 'Alphabetical',
                iconProps: { iconName: 'Ascending', ...menuIconProps },
                onClick: this._setSortTypeAlphabetized
              }
            ]
          }}
        />
      </div>
    );
  };

  private _onSearchBoxClick = (ev: React.MouseEvent<HTMLElement>): void => {
    if (this.props.onSearchBoxClick) {
      this.props.onSearchBoxClick(ev);
    }
  };

  private _onSearchQueryChanged = (ev: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
    this.setState(
      {
        searchQuery: newValue,
        sortState: NavSortType.alphabetized
      },
      () => {
        if (this.state.searchQuery === '') {
          this.setState({
            sortState: this.state.defaultSortState
          });
        }
      }
    );
  };

  private _hasMatchChild = (page: INavPage): boolean => {
    const { searchQuery } = this.state;
    const searchRegEx = new RegExp(searchQuery, 'i');
    let hasMatchChild: boolean = searchRegEx.test(page.title);

    if (page.pages) {
      page.pages.forEach((childPage: INavPage) => {
        if (searchRegEx.test(childPage.title)) {
          hasMatchChild = true;
        }

        if (childPage.pages) {
          childPage.pages.forEach((grandchildPage: INavPage) => {
            if (searchRegEx.test(grandchildPage.title)) {
              hasMatchChild = true;
            }
          });
        }
      });
    }

    return hasMatchChild;
  };

  private _setSortTypeCategories = (): void => {
    this.setState(
      {
        defaultSortState: NavSortType.categories,
        sortState: NavSortType.categories
      },
      () => {
        localStorage.setItem('defaultSortState', NavSortType[NavSortType.categories]);
      }
    );
  };

  private _setSortTypeAlphabetized = (): void => {
    this.setState(
      {
        defaultSortState: NavSortType.alphabetized,
        sortState: NavSortType.alphabetized
      },
      () => {
        localStorage.setItem('defaultSortState', NavSortType[NavSortType.alphabetized]);
      }
    );
  };
}
