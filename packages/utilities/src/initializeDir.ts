import { getWindow } from './dom/getWindow';

export function initializeDir(win?: Window): void {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const w = (win || getWindow()) as Window & { __hasInitializedDir__: boolean };

  if (w && !w.__hasInitializedDir__) {
    w.__hasInitializedDir__ = true;

    // Ensure that the documentElement has a 'dir' attribute.
    const { documentElement } = w.document;

    if (!documentElement.hasAttribute('dir')) {
      documentElement.setAttribute('dir', 'ltr');
    }
  }
}
