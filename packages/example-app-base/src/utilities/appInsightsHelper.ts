import { getWindow } from '@fluentui/react/lib/Utilities';

// Checks if appInsights exists on the window.
const win = getWindow();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const appInsights = (win as any)?.appInsights;

/**
 * Fires a custom event for Application Insights. Wrapper around window['appInsights'].trackEvent().
 *
 * @param eventName A name for the event.
 * @param properties Additional data used to filter events in the portal. Defaults to empty.
 * @param measurements Metrics associated with this page. Defaults to empty.
 */
export function trackEvent(eventName: EventNames | string, properties?: IEventProperties, measurements?: object): void {
  appInsights && appInsights.trackEvent(eventName, properties, measurements);
}

/**
 * Fires a page view event for Application Insights. Wrapper around window['appInsights'].trackPageEvent().
 *
 * @param name The name of the page.
 * @param url The URL/hash of the page.
 * @param properties Additional data used to filter events in the portal. Defaults to empty.
 * @param measurements Metrics associated with this page. Defaults to empty.
 */
export function trackPageView(name: string, url: string, properties?: IEventProperties, measurements?: object): void {
  appInsights && appInsights.trackPageView(name, url, properties, measurements);
}

/**
 * Commonly used custom events for Application Insights.
 */
export enum EventNames {
  /** The user clicked a link in the top nav. */
  ClickedTopNavLink = 'ClickedTopNavLink',

  /** The user clicked a link in the left nav. */
  ClickedLeftNavLink = 'ClickedLeftNavLink',

  /** The user changed their current platform. */
  ChangedPlatform = 'ChangedPlatform',

  /** The user clicked a link in the right nav. */
  ClickedRightNavLink = 'ClickedRightNavLink',

  /** The user clicked Get Started on the home page. */
  ClickedGetStartedLink = 'ClickedGetStartedLink',

  /** The user clicked a link to another internal page. */
  ClickedInternalLink = 'ClickedInternalLink',

  /** The user clicked a link to different site. */
  ClickedExternalLink = 'ClickedExternalLink',

  /** The user clicked the search filter option in the left nav. */
  ClickedSearchFilter = 'ClickedSearchFilter',

  /** The user clicked a "go back" link or button. */
  ClickedGoBack = 'ClickedGoBack',

  /** The user landed on a page that doesn't exist. */
  PageNotFound = 'PageNotFound',
}

export interface IEventProperties {
  /** @deprecated Will be replaced by currentArea. */
  topic?: string;

  /** The current area/level one. */
  currentArea: string;

  /** The next area/level one. */
  nextArea?: string;

  /** The URL/hash of the current page.*/
  currentPage?: string;

  /** The URL/hash of the next page. Typically the destination of a link. */
  nextPage?: string;

  /** The URL/hash of the previous page. */
  previousPage?: string;

  /** @deprecated will be replaced by currentPlatform. */
  platform?: string;

  /** The currently active platform. */
  currentPlatform?: string;

  /** The platform the user is switching to. */
  nextPlatform?: string;

  /** The document referral URL. */
  referrer?: string;

  /** More granular description or purpose of the event. */
  action?: string;

  [key: string]: string | undefined;
}
