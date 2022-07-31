import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { applyFocusWithinPolyfill } from '../focus/focusWithinPolyfill';

export function useFocusWithin() {
  const { targetDocument } = useFluent();
  const elementRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (targetDocument?.defaultView && elementRef.current) {
      return applyFocusWithinPolyfill(elementRef.current, targetDocument.defaultView);
    }
  }, [elementRef, targetDocument]);

  return elementRef;
}
