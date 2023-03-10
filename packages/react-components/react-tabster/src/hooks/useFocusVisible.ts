import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { applyFocusVisiblePolyfill } from '../focus/focusVisiblePolyfill';

export function useFocusVisible<TElement extends HTMLElement = HTMLElement>() {
  const { targetDocument } = useFluent();
  const scopeRef = React.useRef<TElement>(null);

  React.useEffect(() => {
    if (targetDocument?.defaultView && scopeRef.current) {
      return applyFocusVisiblePolyfill(scopeRef.current, targetDocument.defaultView);
    }
  }, [scopeRef, targetDocument]);

  return scopeRef;
}
