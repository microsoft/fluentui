/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as ReactDOM from 'react-dom';
import { assertSlots } from '@fluentui/react-utilities';
import type { PopoverSurfaceSlots, PopoverSurfaceState } from './PopoverSurface.types';
import type { JSXElement } from '@fluentui/react-utilities';

/**
 * Renders the PopoverSurface component. Portals to `state.mountNode` when
 * provided; otherwise renders in place.
 */
export const renderPopoverSurface = (state: PopoverSurfaceState): JSXElement => {
  assertSlots<PopoverSurfaceSlots>(state);

  const surface = (
    <state.root>
      {state.withArrow && <div ref={state.arrowRef} data-arrow="" />}
      {state.root.children}
    </state.root>
  );

  return state.mountNode ? ReactDOM.createPortal(surface, state.mountNode) : surface;
};
