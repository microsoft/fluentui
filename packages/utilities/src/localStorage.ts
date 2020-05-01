import { getWindow } from './dom/getWindow';

/**
 * Fetches an item from local storage without throwing an exception
 * @param key The key of the item to fetch from local storage
 */
export function getItem(key: string): string | null {
  let result = null;
  try {
    const win = getWindow();
    result = win ? win.localStorage.getItem(key) : null;
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
    const win = getWindow();

    win && win.localStorage.setItem(key, data);
  } catch (e) {
    /* Eat the exception */
  }
}
