import * as React from 'react';
import { TPlatformPages } from '../PlatformPicker/PlatformPicker.types';
import { IRouteProps } from '../../utilities/router/index';

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

  /**
   * Category title to show in the search box. If not given, section is not searchable.
   */
  searchablePageTitle?: string;
}

export interface INavPage<TPlatform extends string = string> extends Pick<IRouteProps, 'component' | 'getComponent'> {
  /**
   * The page's title, as shown in the navigation.
   */
  title: string;

  /**
   * Hash route or full external URL for this page. Undefined for categories.
   */
  url?: string;

  /**
   * Unique CSS class name for this page.
   */
  className?: string;

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
   * Whether the link is to an external site.
   * This flag enables the 'NavigateExternalInline' icon.
   */
  isExternal?: boolean;

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
