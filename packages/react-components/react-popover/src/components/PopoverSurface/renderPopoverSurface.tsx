/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { Portal } from '@fluentui/react-portal';
import type { PopoverSurfaceSlots, PopoverSurfaceState } from './PopoverSurface.types';

/**
 * Render the final JSX of PopoverSurface
 */
export const renderPopoverSurface_unstable = (state: PopoverSurfaceState) => {
  assertSlots<PopoverSurfaceSlots>(state);

  const surface = (
    <state.root>
      {state.withArrow && <div ref={state.arrowRef} className={state.arrowClassName} />}
      {state.root.children}
    </state.root>
  );

  if (state.inline) {
    return surface;
  }

  return <Portal mountNode={state.mountNode}>{surface}</Portal>;
};
