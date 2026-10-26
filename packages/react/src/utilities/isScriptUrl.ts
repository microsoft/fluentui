// eslint-disable-next-line no-script-url
const scriptProtocols = new Set(['javascript:', 'vbscript:']);

/**
 * Checks whether navigating to a URL would execute script in the current origin.
 *
 * Parsing is delegated to the platform `URL` parser so the result always matches what the browser
 * would do, including its normalization of leading control characters and embedded tabs/newlines.
 *
 * @internal
 */
export function isScriptUrl(href: string): boolean {
  try {
    return scriptProtocols.has(new URL(href).protocol.toLowerCase());
  } catch {
    // Anything unparsable as an absolute URL is navigated as a relative path and can't execute script.
    return false;
  }
}
