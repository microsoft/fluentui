import * as React from 'react';
import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { DialogTriggerState } from './DialogTrigger.types';

/** The only public classes — see componentMarkers; the trigger has no look of its own. */
export const dialogTriggerClassNames: { root: string } = {
  root: componentMarkers('dialog-trigger'),
};

type TriggerChildProps = { className?: string };

/**
 * Applies the visual contract, returning new state. The trigger renders the consumer's own
 * element, so the marker pair is the whole contract: it gives the element an identity a consumer
 * can compose against, beside whatever classes that element already carries.
 */
export const useDialogTriggerStyles = (state: DialogTriggerState): DialogTriggerState => {
  const { children } = state;

  if (!children) {
    return state;
  }

  const child = children as React.ReactElement<TriggerChildProps>;

  return {
    ...state,
    children: React.cloneElement(child, {
      className: clsx(dialogTriggerClassNames.root, child.props.className),
    }),
  };
};
