import * as React from 'react';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { applyCompositeNavigation } from './composite';
import { applyCellNavigation } from './cell';

export type NavigationMode = 'row' | 'cell' | 'composite';

/**
 * THIS HOOK WILL NOT EXIST IN STABLE RELEASE
 * Just a quick workaround before tabster fully supports these navigation modes with grid mode
 * https://github.com/microsoft/fluentui/issues/24382
 * @internal
 * @deprecated
 */
export function useNavigationMode<TElement extends HTMLElement>(mode: NavigationMode) {
  const rowNavigationAttr = useArrowNavigationGroup({ axis: 'vertical' });
  const ref = React.useRef<TElement>(null);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    switch (mode) {
      case 'cell':
        applyCellNavigation(ref.current);
        break;
      case 'composite':
        applyCompositeNavigation(ref.current);
        break;
      case 'row':
        if (rowNavigationAttr['data-tabster']) {
          ref.current.setAttribute('data-tabster', rowNavigationAttr['data-tabster']);
        }
        break;
    }
  }, [rowNavigationAttr, mode]);

  return ref;
}
