import * as React from 'react';
import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { PopoverTriggerState } from './PopoverTrigger.types';

/** The only public classes — see componentMarkers; the trigger has no look of its own. */
export const popoverTriggerClassNames: { root: string } = {
  root: componentMarkers('popover-trigger'),
};

type TriggerChildProps = { className?: string };

/**
 * Applies the visual contract, returning new state. The trigger renders the consumer's own
 * element, so the marker pair is the whole contract: it gives the element an identity a consumer
 * can compose against, beside whatever classes that element already carries.
 */
export const usePopoverTriggerStyles = (state: PopoverTriggerState): PopoverTriggerState => {
  const { children } = state;

  if (!children) {
    return state;
  }

  const child = children as React.ReactElement<TriggerChildProps>;

  return {
    ...state,
    children: React.cloneElement(child, {
      className: clsx(popoverTriggerClassNames.root, child.props.className),
    }),
  };
};
