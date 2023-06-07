import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { AriaLiveSlots, AriaLiveState } from './AriaLive.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const ariaLiveClassNames: SlotClassNames<AriaLiveSlots> = {
  assertive: 'fui-AriaLive__assertive',
  polite: 'fui-AriaLive__polite',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  visuallyHidden: {
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
  state.assertive.className = mergeClasses(
    styles.visuallyHidden,
    ariaLiveClassNames.assertive,
    state.assertive.className,
  );
  state.polite.className = mergeClasses(styles.visuallyHidden, ariaLiveClassNames.polite, state.polite.className);

  return state;
};
