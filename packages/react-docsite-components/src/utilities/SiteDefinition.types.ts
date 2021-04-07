import { Theme } from '@fluentui/react';
import { VersionSwitcherDefinition } from '@fluentui/public-docsite-setup';
import { INavPage } from '../components/Nav/index';
import { IPlatform } from '../components/PlatformPicker/index';
import { ISiteMessageBarProps } from '../components/SiteMessageBar/index';

/**
 * Site definition.
 * TPlatform can be an enum type and is expected to contain the key `default`.
 */
export interface ISiteDefinition<TPlatforms extends string = string> {
  /** The title of the app. */
  siteTitle: string;

  /** Text to display in a badge in the header. */
  badgeText?: string;

  /** Defines the platforms for the app. These are rendered in the platform picker */
  platforms?: { [x in TPlatforms]?: IPlatform };

  /** Defines the pages for the app. */
  pages: INavPage<TPlatforms>[];

  /** Defines app-wide theme. */
  theme?: Theme;

  /** Defines the source of the logo image in the top nav bar. */
  siteLogoSource?: string;

  /**
   * If the hash contains any of the strings or matches any of the regular expressions specified in
   * an entry's `from` property, replace that segment of the hash with the `to` property and redirect.
   */
  redirects?: IRedirect[];

  /**
   * Config for the message bars below the top nav. Include the props for the message bar and the paths
   * that need to show that message bar. You can define exclusions too.
   */
  messageBars?: ISiteMessageBarConfig[];

  /**
   * Defines the necessary information to populate the version switcher.
   */
  versionSwitcherDefinition?: VersionSwitcherDefinition;
}

export interface ISiteMessageBarConfig extends ISiteMessageBarProps {
  /** Look for URLs containing this string or matching this regex */
  path: string | RegExp;

  /** Exclude URLs that contain this string or matching this regex */
  exclude?: string | RegExp;
}

export interface IRedirect {
  /** Look for URLs containing this string or matching this regex */
  from: string | RegExp;
  /** Replace the matching segment with this string */
  to: string;
}
