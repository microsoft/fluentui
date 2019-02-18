import { getWindow } from './dom/getWindow';

export function initializeDir(window?: Window): void {
  const win = (window || getWindow()) as Window & { __hasInitializedDir__: boolean };

  if (win && !win.__hasInitializedDir__) {
    win.__hasInitializedDir__ = true;

    // Ensure that the documentElement has a 'dir' attribute.
    const { documentElement } = win.document;

    if (!documentElement.hasAttribute('dir')) {
      documentElement.setAttribute('dir', 'ltr');
    }
  }
}
