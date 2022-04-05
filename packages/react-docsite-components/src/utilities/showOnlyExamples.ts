import { getCurrentUrl } from './getCurrentUrl';

/**
 * Helper function that returns a boolean whether a `docsExample=true` string is contained within an url.
 */
export function showOnlyExamples(): boolean {
  const url = getCurrentUrl();

  return url.indexOf('docsExample=true') > -1;
}
