/**
 * Verifies if application is running in server side rendering or in the browser
 */
export function isSSR() {
  return typeof window === 'undefined' || /ServerSideRendering/.test(window.navigator && window.navigator.userAgent);
}
