import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { applyFocusVisiblePolyfill } from '../focus/focusVisiblePolyfill';

/**
 * @internal
 * @returns ref to the container element whose children have `:focus-visible` styles
 */
export function useFocusVisible<TElement extends HTMLElement = HTMLElement>() {
  const { targetDocument } = useFluent();
  const scopeRef = React.useRef<TElement>(null);

  React.useEffect(() => {
    if (targetDocument?.defaultView && scopeRef.current && canUseDOM()) {
      return applyFocusVisiblePolyfill(scopeRef.current, targetDocument.defaultView);
    }
  }, [scopeRef, targetDocument]);

  return scopeRef;
}
