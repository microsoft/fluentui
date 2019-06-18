import { getDocument } from 'office-ui-fabric-react/lib/Utilities';

/**
 * Get the current url of the loaded page.
 */
export function getCurrentUrl(): string {
  const doc = getDocument();
  const url = doc ? document.location.href : '';

  return url;
}
