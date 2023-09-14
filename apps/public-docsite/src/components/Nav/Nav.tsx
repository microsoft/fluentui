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
  IButtonStyles,
  IconButton,
} from '@fluentui/react';
import { isPageActive, hasActiveChild, INavPage, INavProps } from '@fluentui/react-docsite-components/lib/index2';
import { getItem, setItem } from '@fluentui/utilities/lib/sessionStorage';
import * as styles from './Nav.module.scss';

type NavSortState = 'alphabetized' | 'categories';

interface INavState {
  /** Search query as typed by the user. May contain special characters (don't use as a regex). */
  searchQuery: string;
  sortState: NavSortState;
}

const searchBoxStyles: ISearchBoxStyles = {
  iconContainer: {
    marginRight: 8,
  },
};
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
const menuIconProps: IIconProps = { iconName: '' };

const sortStateKey = 'navSortState';

export class Nav extends React.Component<INavProps, INavState> {
  private _menuProps: IContextualMenuProps;

  public constructor(props: INavProps) {
    super(props);

    this.state = {
      searchQuery: '',
      sortState: (getItem(sortStateKey) as NavSortState | undefined) || 'categories',
    };

    this._menuProps = {
      items: [
        {
          key: 'categories',
          text: 'Categories',
          iconProps: { iconName: 'GroupedList', styles: { root: { fontSize: 16 } } },
          onClick: this._setSortState.bind(this, 'categories'),
        },
        {
          key: 'alphabetized',
          text: 'Alphabetical',
          iconProps: { iconName: 'Ascending', styles: { root: { fontSize: 16 } } },
          onClick: this._setSortState.bind(this, 'alphabetized'),
        },
      ],
    };
  }

  public componentDidUpdate(prevProps: INavProps) {
    if (prevProps.pages !== this.props.pages) {
      this.setState({ searchQuery: '' });
    }
  }

  public render(): JSX.Element | null {
    const { pages, searchablePageTitle } = this.props;
    const { sortState } = this.state;
    if (!pages) {
      return null;
    }

    return (
      <div className={styles.navWrapper}>
        {searchablePageTitle && pages.length > 1 && this._renderSearchBox(searchablePageTitle)}
        <FocusZone>
          <nav className={styles.nav} role="navigation">
            {sortState === 'alphabetized' && searchablePageTitle
              ? this._renderSortedLinks(pages)
              : this._renderLinkList(pages, false)}
          </nav>
        </FocusZone>
      </div>
    );
  }

  private _renderLinkList = (pages: INavPage[], isSubMenu: boolean): JSX.Element => {
    const { searchablePageTitle } = this.props;
    const { sortState } = this.state;

    const list = pages
      .filter((page: INavPage) => !page.isHiddenFromMainNav)
      .map((page: INavPage, linkIndex: number) => {
        if (page.isCategory && page.isSearchable && sortState === 'alphabetized') {
          return page.pages!.map((innerPage: INavPage, innerLinkIndex: number) =>
            this._renderLink(innerPage, innerLinkIndex),
          );
        } else if (page.isCategory) {
          return this._renderSection(page, linkIndex);
        }
        return this._renderLink(page, linkIndex);
      });

    return (
      <ul
        className={css(styles.links, isSubMenu && styles.isSubMenu)}
        aria-label={`${searchablePageTitle || ''} section navigation`}
      >
        {list}
      </ul>
    );
  };

  private _renderLink = (page: INavPage, linkIndex: number): JSX.Element => {
    const searchQuery = this.state.searchQuery.toLowerCase();
    const childLinks = page.pages ? this._renderLinkList(page.pages, true) : null;
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
          isPageActive(page.url!) && styles.isActive,
          hasActiveChild(page) && styles.hasActiveChild,
          page.isHomePage && styles.isHomePage,
        )}
        key={linkIndex + page.url!}
      >
        {page.title.toLowerCase().indexOf(searchQuery) !== -1 && (
          <Link href={page.url} onClick={this._onLinkClick} target={page.isExternal ? '_blank' : undefined}>
            {linkText}
            {page.isExternal && (
              <Icon iconName="NavigateExternalInline" className={styles.externalIcon} aria-label="(external)" />
            )}
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
      return titleA > titleB ? 1 : titleA < titleB ? -1 : 0;
    });

    return this._renderLinkList(flatLinks, false);
  }

  private _renderSearchBox = (sectionTitle: string) => {
    const { searchQuery, sortState } = this.state;

    return (
      <div className={styles.searchBoxWrapper}>
        <SearchBox
          className={styles.searchBox}
          placeholder={`Search ${sectionTitle}`}
          value={searchQuery}
          onChange={this._onSearchQueryChanged}
          onClick={this.props.onSearchBoxClick}
          underlined={true}
          styles={searchBoxStyles}
          ariaLabel={`Search ${sectionTitle} pages`}
        />
        <IconButton
          className={styles.filterButton}
          title="Sort list"
          iconProps={{
            iconName: sortState === 'alphabetized' ? 'Ascending' : 'GroupedList',
          }}
          styles={sortButtonStyles}
          menuIconProps={menuIconProps}
          menuProps={this._menuProps}
        />
      </div>
    );
  };

  private _onSearchQueryChanged = (ev: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
    this.setState({
      searchQuery: newValue || '',
      sortState: newValue ? 'alphabetized' : this.state.sortState,
    });
  };

  private _hasMatchChild = (page: INavPage): boolean => {
    const searchQuery = this.state.searchQuery.toLowerCase();
    const checkPage = (pg: INavPage) =>
      pg.title.toLowerCase().indexOf(searchQuery) !== -1 || (!!pg.pages && pg.pages.some(checkPage));
    return checkPage(page);
  };

  private _setSortState = (sortState: NavSortState) => {
    setItem(sortStateKey, sortState);
    this.setState({ sortState });
  };
}
