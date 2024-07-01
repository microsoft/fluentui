import { mergeClasses, makeResetStyles } from '@griffel/react';
import type { AriaLiveSlots, AriaLiveState } from './AriaLive.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const ariaLiveClassNames: SlotClassNames<AriaLiveSlots> = {
  assertive: 'fui-AriaLive__assertive',
  polite: 'fui-AriaLive__polite',
};

/**
 * Styles for the root slot
 */
const useResetStyles = makeResetStyles({
  clip: 'rect(0px, 0px, 0px, 0px)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: '0px',
  width: '1px',
  position: 'absolute',
});

/**
 * Apply styling to the AriaLive slots based on the state
 */
export const useAriaLiveStyles_unstable = (state: AriaLiveState): AriaLiveState => {
  'use no memo';

  const visuallyHidden = useResetStyles();
  state.assertive.className = mergeClasses(visuallyHidden, ariaLiveClassNames.assertive, state.assertive.className);
  state.polite.className = mergeClasses(visuallyHidden, ariaLiveClassNames.polite, state.polite.className);

  return state;
};
