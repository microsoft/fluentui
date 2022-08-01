import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { applyFocusWithinPolyfill } from '../focus/focusWithinPolyfill';

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
