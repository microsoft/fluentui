/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import { Portal } from '@fluentui/react-portal';
import type { TeachingBubbleSurfaceSlots, TeachingBubbleSurfaceState } from './TeachingBubbleSurface.types';

/**
 * Render the final JSX of PopoverSurface
 */
export const renderTeachingBubbleSurface_unstable = (state: TeachingBubbleSurfaceState) => {
  const { slots, slotProps } = getSlotsNext<TeachingBubbleSurfaceSlots>(state);

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
