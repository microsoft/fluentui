import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { AriaLiveSlots, AriaLiveState } from './AriaLive.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const ariaLiveClassNames: SlotClassNames<AriaLiveSlots> = {
  root: 'fui-AriaLive',
  assertive: 'fui-AriaLive__assertive',
  polite: 'fui-AriaLive__polite',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    clip: 'rect(0px, 0px, 0px, 0px)',
    height: '1px',
    ...shorthands.margin('-1px'),
    ...shorthands.overflow('hidden'),
    ...shorthands.padding('0px'),
    width: '1px',
    position: 'absolute',
  },
});

/**
 * Apply styling to the AriaLive slots based on the state
 */
export const useAriaLiveStyles_unstable = (state: AriaLiveState): AriaLiveState => {
  const styles = useStyles();
  state.root.className = mergeClasses(ariaLiveClassNames.root, styles.root, state.root.className);
  state.assertive.className = mergeClasses(ariaLiveClassNames.assertive, state.root.className);
  state.polite.className = mergeClasses(ariaLiveClassNames.polite, state.root.className);

  return state;
};
