import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { canUseDOM } from '@fluentui/react-utilities';

const fluentProvider = useFluent();
const targetDocument = fluentProvider?.targetDocument;
const _window = targetDocument?.defaultView;

/**
 * Helper to get the window object. The helper will make sure to use a cached variable
 * of "window", to avoid overhead and memory leaks in IE11. Note that in popup scenarios the
 * window object won't match the "global" window object, and for these scenarios, you should
 * pass in an element hosted within the popup.
 *
 * @public
 */
export function getWindow(rootElement?: Element | null): Window | null | undefined {
  if (!canUseDOM() || typeof _window === 'undefined') {
    return undefined;
  } else {
    const el = rootElement as Element;

    return el && el.ownerDocument && el.ownerDocument.defaultView ? el.ownerDocument.defaultView : _window;
  }
}
