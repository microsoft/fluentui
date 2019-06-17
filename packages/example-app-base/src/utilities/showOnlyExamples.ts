/**
 * Helper function that returns a boolean whether a `docsExample=true` string is contained within an url.
 * @param url url to check.
 */
export function showOnlyExamples(url: string): boolean {
  return url.indexOf('docsExample=true') > -1;
}
