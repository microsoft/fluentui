/**
 * Fetches an item from local storage without throwing an exception
 * @param key The key of the item to fetch from local storage
 */
export function getItem(key: string): string | null {
  let result = null;
  try {
    result = window.localStorage.getItem(key);
  } catch (e) {
    /* Eat the exception */
  }
  return result;
}

/**
 * Inserts an item into local storage without throwing an exception
 * @param key The key of the item to add to local storage
 * @param data The data to put into local storage
 */
export function setItem(key: string, data: string): void {
  try {
    window.localStorage.setItem(key, data);
  } catch (e) {
    /* Eat the exception */
  }
}