import { getDocument } from '@fluentui/react/lib/Utilities';

/**
 * Get the current url of the loaded page. Returns empty string if server-side rendering (`document` is undefined).
 */
export function getCurrentUrl(): string {
  const doc = getDocument();
  const url = doc ? document.location.href : '';

  return url;
}
