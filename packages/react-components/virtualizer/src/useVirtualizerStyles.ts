import { makeStyles, mergeClasses } from '@griffel/react';
import type { VirtualizerSlots, VirtualizerState } from './Virtualizer.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const virtualizerClassName = 'fui-Virtualizer';
export const virtualizerClassNames: SlotClassNames<VirtualizerSlots> = {
  root: virtualizerClassName,
  before: 'fui-Bookend-Before',
  beforeContainer: 'fui-Bookend-BeforeContainer',
  after: 'fui-Bookend-After',
  afterContainer: 'fui-Bookend-AfterContainer',
};

const useColumnStyles = makeStyles({
  root: {
    display: 'flex',
    overflowAnchor: 'none',
    flexDirection: 'column',
  },
});

const useReverseColumnStyles = makeStyles({
  root: {
    display: 'flex',
    overflowAnchor: 'none',
    flexDirection: 'column-reverse',
  },
});

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
  const { isReversed } = state;
  const styles = useStyles();
  const containerStyles = {
    column: useColumnStyles(),
    reverseColumn: useReverseColumnStyles(),
  };

  const rootContainerStyle = isReversed ? containerStyles.reverseColumn : containerStyles.column;

  state.root.className = mergeClasses(virtualizerClassName, rootContainerStyle.root, state.root.className);

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
