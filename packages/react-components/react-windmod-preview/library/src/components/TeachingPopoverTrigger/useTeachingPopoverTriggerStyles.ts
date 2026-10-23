import * as React from 'react';
import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { TeachingPopoverTriggerState } from './TeachingPopoverTrigger.types';

/** The only public classes — see componentMarkers; the trigger has no look of its own. */
export const teachingPopoverTriggerClassNames: { root: string } = {
  root: componentMarkers('teaching-popover-trigger'),
};

type TriggerChildProps = { className?: string };

/**
 * Applies the visual contract, returning new state. The trigger renders the consumer's own
 * element, so the marker pair is the whole contract — see usePopoverTriggerStyles.
 */
export const useTeachingPopoverTriggerStyles = (state: TeachingPopoverTriggerState): TeachingPopoverTriggerState => {
  const { children } = state;

  if (!children) {
    return state;
  }

  const child = children as React.ReactElement<TriggerChildProps>;

  return {
    ...state,
    children: React.cloneElement(child, {
      className: clsx(teachingPopoverTriggerClassNames.root, child.props.className),
    }),
  };
};
