import * as React from 'react';

export interface INavProps {
  /**
   * A collection of link groups to display in the navigation bar
   */
  pages: INavPage[];

  /**
   * Function callback invoked when a link in the navigation is clicked
   */
  onLinkClick?: (ev?: React.MouseEvent<{}>) => void;
}

export interface INavPage {
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
  component?: any;

  /**
   *  Loads the component using require.ensure;
   */
  getComponent?: (cb: (obj: any) => void) => any;

  /**
   * Optional array of child pages belonging to this one.
   */
  pages?: INavPage[];

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
   * Whether this appears in the UHF header nav.
   * @default false
   */
  isTopNavHeader?: boolean;
}