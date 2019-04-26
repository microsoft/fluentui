import * as React from 'react';
import { TPlatformPages } from '../PlatformPicker/PlatformPicker.types';

/**
 * Props for the nav.
 * TPlatform can be an enum type and is expected to contain the key `default`.
 */
export interface INavProps<TPlatforms extends string = string> {
  /**
   * A collection of link groups to display in the navigation bar
   */
  pages: INavPage<TPlatforms>[];

  /**
   * Function callback invoked when a link in the navigation is clicked
   */
  onLinkClick?: (ev?: React.MouseEvent<HTMLElement>) => void;

  /**
   * Function callback invoked when search box the navigation is clicked
   */
  onSearchBoxClick?: (ev?: React.MouseEvent<HTMLElement>) => void;

  searchablePageTitle?: string;
}

export interface INavPage<TPlatform extends string = string> {
  /**
   * The page's title, as shown in the navigation.
   */
  title: string;

  /**
   * URL for this page, relative to the site's root.
   */
  url: string;

  /**
   * Unique CSS class name for this page.
   */
  className?: string;

  /**
   * The component to render for this page's content.
   */
  component?: React.ComponentType;

  /**
   * Loads the component using require.ensure;
   */
  getComponent?: (cb: (component: React.ComponentType) => void) => void;

  /**
   * Optional array of child pages belonging to this one.
   */
  pages?: INavPage<TPlatform>[];

  /**
   * Whether this page should be hidden from the main nav.
   */
  isHiddenFromMainNav?: boolean;

  /**
   * Whether this is the home page.
   * @default false
   */
  isHomePage?: boolean;

  /**
   * Whether this link appears in the UHF header nav.
   * This flag is different from isHiddenFromMainNav because we want the UHF link's childLinks to be rendered.
   * isHiddenFromMainNav will not render childLinks.
   * @default false
   */
  isUhfLink?: boolean;

  /**
   * An object of platform arrays containing pages specific to each platform.
   */
  platforms?: TPlatformPages<TPlatform>;

  /**
   * Determines whether the nav renders the platform picker.
   */
  hasPlatformPicker?: boolean;

  /**
   * Determines if the page renders as a Collapsible Section or Link in the nav.
   */
  isCategory?: boolean;

  /**
   * Determines whether the nav renders the search bar.
   */
  isSearchable?: boolean;

  /**
   * Determines whether the nav should render to make room for the content to take the
   * full width of the page.
   */
  isContentFullBleed?: boolean;
}

export enum NavSortType {
  alphabetized = 'alphabetized',
  categories = 'categories'
}
