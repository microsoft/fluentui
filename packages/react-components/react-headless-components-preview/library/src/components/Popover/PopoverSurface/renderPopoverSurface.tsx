/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { PopoverSurfaceSlots, PopoverSurfaceState } from './PopoverSurface.types';
import type { JSXElement } from '@fluentui/react-utilities';
import type { PopoverSurfaceStateInternal } from '../Popover.internal-types';

export const renderPopoverSurface = (state: PopoverSurfaceState): JSXElement => {
  assertSlots<PopoverSurfaceSlots>(state);
  const { renderArrowRef } = state as unknown as PopoverSurfaceStateInternal;

  return (
    <state.root>
      {state.withArrow && <div ref={renderArrowRef} data-arrow="" />}
      {state.root.children}
    </state.root>
  );
};
