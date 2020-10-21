import * as React from 'react';
import { INavPage } from '../Nav/index';

/**
 * Props for the top nav.
 * TPlatform can be an enum type and is expected to contain the key `default`.
 */
export interface ITopNavProps<TPlatforms extends string = string> {
  /**
   * Pages to render into the top nav bar.
   */
  pages: INavPage<TPlatforms>[];

  /**
   * Function callback invoked when a link in the navigation is clicked.
   */
  onLinkClick?: (ev?: React.MouseEvent<HTMLElement>) => void;

  /**
   * The currently active platform to determine if active styles should be applied.
   */
  platform?: TPlatforms;

  /**
   * Render callback passed to the mobile navigation panel.
   */
  onRenderNavFooter?: () => JSX.Element | null;

  /**
   * Text for a badge to display inside the header.
   */
  badgeText?: string;

  /**
   * Defines the source of the logo image.
   */
  siteLogoSource?: string;
}
