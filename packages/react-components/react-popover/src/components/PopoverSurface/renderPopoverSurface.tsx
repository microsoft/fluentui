import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { getSlots } from '@fluentui/react-utilities';
import type { PopoverSurfaceSlots, PopoverSurfaceState } from './PopoverSurface.types';

/**
 * Render the final JSX of PopoverSurface
 */
export const renderPopoverSurface_unstable = (state: PopoverSurfaceState) => {
  const { slots, slotProps } = getSlots<PopoverSurfaceSlots>(state);

  const surface = (
    <slots.root {...slotProps.root}>
      {state.withArrow && <div ref={state.arrowRef} className={state.arrowClassName} />}
      {slotProps.root.children}
    </slots.root>
  );

  if (state.inline) {
    return surface;
  }

  return <Portal mountNode={state.mountNode}>{surface}</Portal>;
};
