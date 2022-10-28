import { makeStyles, mergeClasses } from '@griffel/react';
import { VirtualizerFlow, VirtualizerSlots, VirtualizerState } from './Virtualizer.types';
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

const useRowStyles = makeStyles({
  root: {
    display: 'flex',
    overflowAnchor: 'none',
    flexDirection: 'row',
  },
});

const useReverseRowStyles = makeStyles({
  root: {
    display: 'flex',
    overflowAnchor: 'none',
    flexDirection: 'row-reverse',
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
  const { isReversed, flow } = state;
  const isVertical = flow === VirtualizerFlow.Vertical;
  const styles = useStyles();
  const containerStyles = {
    column: useColumnStyles(),
    reverseColumn: useReverseColumnStyles(),
    row: useRowStyles(),
    reverseRow: useReverseRowStyles(),
  };

  const columnStyle = isReversed ? containerStyles.reverseColumn : containerStyles.column;
  const rowStyle = isReversed ? containerStyles.reverseRow : containerStyles.row;
  const rootContainerStyle = isVertical ? columnStyle : rowStyle;

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
