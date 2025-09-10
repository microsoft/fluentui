import type { TeachingPopoverSurfaceSlots, TeachingPopoverSurfaceState } from './TeachingPopoverSurface.types';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { renderPopoverSurface_unstable } from '@fluentui/react-popover';

/**
 * Render the final JSX of PopoverSurface
 */
export const renderTeachingPopoverSurface_unstable = (state: TeachingPopoverSurfaceState): JSXElement => {
  assertSlots<TeachingPopoverSurfaceSlots>(state);

  // For now we are just extending the base surface
  return renderPopoverSurface_unstable(state);
};
