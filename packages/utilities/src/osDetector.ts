/**
 * Returns true if the user is on a Mac.
 */
export function isMac(): boolean {
  const userAgent = window && window.navigator && window.navigator.userAgent;
  return !!userAgent && userAgent.indexOf('Macintosh') !== -1;
}
