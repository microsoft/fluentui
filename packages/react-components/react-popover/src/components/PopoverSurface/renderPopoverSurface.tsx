/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import { Portal } from '@fluentui/react-portal';
import type { PopoverSurfaceSlots, PopoverSurfaceState } from './PopoverSurface.types';

/**
 * Render the final JSX of PopoverSurface
 */
export const renderPopoverSurface_unstable = (state: PopoverSurfaceState) => {
  const { slots, slotProps } = getSlotsNext<PopoverSurfaceSlots>(state);

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
