import { getQueryParam } from './getQueryParam';

/**
 * Gets the value of a setting from the query or session storage.
 * @param name Name of the setting (query param and/or session storage key)
 * @returns The value, or empty string if not specified.
 */
export function getSetting(name: string): string {
  let value = getQueryParam(name);
  try {
    // If there's not a value in the query, try getting it from session storage
    value = value || sessionStorage.getItem(name) || '';
    // Try to update the value in session storage
    sessionStorage.setItem(name, value);
  } catch (ex) {
    // ignore
  }
  return value || '';
}
