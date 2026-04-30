/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { PopoverSurfaceSlots, PopoverSurfaceState } from './PopoverSurface.types';
import type { JSXElement } from '@fluentui/react-utilities';

export const renderPopoverSurface = (state: PopoverSurfaceState): JSXElement => {
  assertSlots<PopoverSurfaceSlots>(state);

  return (
    <state.root>
      {state.withArrow && <div ref={state.arrowRef} data-arrow="" />}
      {state.root.children}
    </state.root>
  );
};
