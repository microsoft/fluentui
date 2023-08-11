import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

import { applyFocusVisiblePolyfill } from '../focus/focusVisiblePolyfill';

type UseFocusVisibleOptions = {
  targetDocument?: Document;
};

export function useFocusVisible<TElement extends HTMLElement = HTMLElement>(options: UseFocusVisibleOptions = {}) {
  const contextValue = useFluent();
  const scopeRef = React.useRef<TElement>(null);

  const targetDocument = options.targetDocument ?? contextValue.targetDocument;

  React.useEffect(() => {
    if (targetDocument?.defaultView && scopeRef.current) {
      return applyFocusVisiblePolyfill(scopeRef.current, targetDocument.defaultView);
    }
  }, [scopeRef, targetDocument]);

  return scopeRef;
}
