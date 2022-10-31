import { makeStyles, mergeClasses } from '@griffel/react';
import { VirtualizerSlots, VirtualizerState } from './Virtualizer.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const virtualizerClassName = 'fui-Virtualizer';
export const virtualizerClassNames: SlotClassNames<VirtualizerSlots> = {
  before: 'fui-Bookend-Before',
  beforeContainer: 'fui-Bookend-BeforeContainer',
  after: 'fui-Bookend-After',
  afterContainer: 'fui-Bookend-AfterContainer',
};

const useStyles = makeStyles({
  before: {
    display: 'flex',
  },
  after: {
    display: 'flex',
  },
  beforeContainer: {
    position: 'relative',
  },
  afterContainer: {
    position: 'relative',
  },
});

/**
 * Apply styling to the Virtualizer states
 */
export const useVirtualizerStyles_unstable = (state: VirtualizerState): VirtualizerState => {
  const styles = useStyles();

  if (state.before) {
    state.before.className = mergeClasses(virtualizerClassName, styles.before, state.before.className);
  }

  if (state.after) {
    state.after.className = mergeClasses(virtualizerClassName, styles.after, state.after.className);
  }

  if (state.beforeContainer) {
    state.beforeContainer.className = mergeClasses(
      virtualizerClassName,
      styles.beforeContainer,
      state.beforeContainer.className,
    );
  }

  if (state.afterContainer) {
    state.afterContainer.className = mergeClasses(
      virtualizerClassName,
      styles.afterContainer,
      state.afterContainer.className,
    );
  }

  return state;
};
