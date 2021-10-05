import * as React from 'react';
import { CollapsibleSection } from '@fluentui/react-experiments';
import {
  css,
  FocusZone,
  Icon,
  IIconProps,
  ISearchBoxStyles,
  Link,
  SearchBox,
  IContextualMenuProps,
  DefaultPalette,
} from '@fluentui/react';
import { IButtonStyles, IconButton } from '@fluentui/react/lib/Button';
import {
  isPageActive,
  hasActiveChild,
  INavPage,
  INavProps,
  NavSortType,
} from '@fluentui/react-docsite-components/lib/index2';
import { getItem, setItem } from '@fluentui/utilities/lib/sessionStorage';
import * as styles from './Nav.module.scss';
import { isLocal } from '../../utilities/index';

export interface INavState {
  /** Search query as typed by the user. May contain special characters (don't use as a regex). */
  searchQuery: string;
  defaultSortState: keyof typeof NavSortType;
  sortState: keyof typeof NavSortType;
}

interface INavLocalItems {
  defaultSortState?: NavSortType;
}

const searchBoxStyles: ISearchBoxStyles = {
  iconContainer: {
    marginRight: 8,
  },
};

const menuIconProps: IIconProps = { iconName: '' };

export class Nav extends React.Component<INavProps, INavState> {
  private _localItems: INavLocalItems;
  private _menuProps: IContextualMenuProps;

  public constructor(props: INavProps) {
    super(props);

    const defaultSortState = getItem('defaultSortState');
    this._localItems = defaultSortState
      ? {
          defaultSortState: NavSortType[defaultSortState as keyof typeof NavSortType],
        }
      : {};

    this.state = {
      defaultSortState: this._localItems.defaultSortState
        ? NavSortType[this._localItems.defaultSortState]
        : NavSortType.categories,
      searchQuery: '',
      sortState: this._localItems.defaultSortState
        ? NavSortType[this._localItems.defaultSortState]
        : NavSortType.categories,
    };

    this._menuProps = {
      items: [
        {
          key: 'categories',
          text: 'Categories',
          iconProps: { iconName: 'GroupedList', styles: { root: { fontSize: 16 } } },
          onClick: this._setSortTypeCategories,
        },
        {
          key: 'alphabetized',
          text: 'Alphabetical',
          iconProps: { iconName: 'Ascending', styles: { root: { fontSize: 16 } } },
          onClick: this._setSortTypeAlphabetized,
        },
      ],
    };
  }

  public componentDidMount(): void {
    !this._localItems.defaultSortState && setItem('defaultSortState', this.state.defaultSortState);
  }

  public shouldComponentUpdate(nextProps: INavProps): boolean {
    if (nextProps.pages !== this.props.pages) {
      this.setState({
        searchQuery: '',
        sortState: this.state.defaultSortState,
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
        {searchablePageTitle && pages && pages.length > 1 && this._renderSearchBox(searchablePageTitle)}
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
          return page.pages!.map((innerPage: INavPage, innerLinkIndex: number) =>
            this._renderLink(innerPage, innerLinkIndex),
          );
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
    const searchQuery = this.state.searchQuery.toLowerCase();
    const childLinks = page.pages ? this._renderLinkList(page.pages, true) : null;
    const ariaLabel = page.pages ? 'Hit enter to open sub menu, tab to access sub menu items.' : '';
    const title = page.title === 'Fabric' ? 'Home page' : page.title;
    const text = page.title;
    let linkText = <>{text}</>;

    // Highlight search query within link.
    if (searchQuery) {
      const matchIndex = text.toLowerCase().indexOf(searchQuery);
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
          page.isHomePage && styles.isHomePage,
        )}
        key={linkIndex + page.url}
      >
        {(!page.isUhfLink || isLocal) && page.title.toLowerCase().indexOf(searchQuery) !== -1 && (
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
      searchQuery: '',
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

    const sortButtonStyles: IButtonStyles = {
      rootExpanded: {
        // the website always uses the default palette, so this is okay
        background: DefaultPalette.neutralLighter,
      },
      icon: {
        position: 'absolute',
        margin: 0,
      },
    };

    return (
      <div className={styles.searchBoxWrapper}>
        <SearchBox
          className={styles.searchBox}
          placeholder={`Search ${pageTitle}`}
          value={searchQuery}
          onChange={this._onSearchQueryChanged}
          onClick={this.props.onSearchBoxClick}
          underlined={true}
          styles={searchBoxStyles}
          ariaLabel={`Search ${pageTitle}`}
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
                : undefined,
          }}
          styles={sortButtonStyles}
          menuIconProps={menuIconProps}
          menuProps={this._menuProps}
        />
      </div>
    );
  };

  private _onSearchQueryChanged = (ev: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
    this.setState(
      {
        searchQuery: newValue,
        sortState: NavSortType.alphabetized,
      },
      () => {
        if (this.state.searchQuery === '') {
          this.setState({
            sortState: this.state.defaultSortState,
          });
        }
      },
    );
  };

  private _hasMatchChild = (page: INavPage): boolean => {
    const searchQuery = this.state.searchQuery.toLowerCase();
    const checkPage = (pg: INavPage) =>
      pg.title.toLowerCase().indexOf(searchQuery) !== -1 || (!!pg.pages && pg.pages.some(checkPage));
    return checkPage(page);
  };

  private _setSortTypeCategories = (): void => {
    this.setState(
      {
        defaultSortState: NavSortType.categories,
        sortState: NavSortType.categories,
      },
      () => {
        setItem('defaultSortState', NavSortType[NavSortType.categories]);
      },
    );
  };

  private _setSortTypeAlphabetized = (): void => {
    this.setState(
      {
        defaultSortState: NavSortType.alphabetized,
        sortState: NavSortType.alphabetized,
      },
      () => {
        setItem('defaultSortState', NavSortType[NavSortType.alphabetized]);
      },
    );
  };
}
