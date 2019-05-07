import { ICustomizations } from 'office-ui-fabric-react';
import { INavPage } from '../components/Nav/index';
import { IPlatform } from '../components/PlatformPicker/index';

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

  /** Defines app-wide customizations eg. fluent. */
  customizations?: ICustomizations;

  /** Defines the source of the logo image in the top nav bar. */
  siteLogoSource?: string;

  /**
   * If the hash contains any of the strings or matches any of the regular expressions specified in
   * an entry's `from` property, replace that segment of the hash with the `to` property and redirect.
   */
  redirects?: IRedirect[];
}

export interface IRedirect {
  /** Look for URLs containing this string or matching this regex */
  from: string | RegExp;
  /** Replace the matching segment with this string */
  to: string;
}
