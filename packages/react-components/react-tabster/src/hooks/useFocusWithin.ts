import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { applyFocusWithinPolyfill } from '../focus/focusWithinPolyfill';

/**
 * A ponyfill that allows `:focus-within` to support visibility based on keyboard/mouse navigation
 * like `:focus-visible` https://github.com/WICG/focus-visible/issues/151
 * @returns ref to the element that uses `:focus-within` styles
 */
export function useFocusWithin<TElement extends HTMLElement = HTMLElement>() {
  const { targetDocument } = useFluent();
  const elementRef = React.useRef<TElement>(null);

  React.useEffect(() => {
    if (targetDocument?.defaultView && elementRef.current) {
      return applyFocusWithinPolyfill(elementRef.current, targetDocument.defaultView);
    }
  }, [elementRef, targetDocument]);

  return elementRef;
}
