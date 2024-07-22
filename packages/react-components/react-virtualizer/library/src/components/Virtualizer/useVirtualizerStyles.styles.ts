import { makeStyles, mergeClasses } from '@griffel/react';
import { VirtualizerSlots, VirtualizerState } from './Virtualizer.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

const virtualizerClassName = 'fui-Virtualizer';
export const virtualizerClassNames: SlotClassNames<VirtualizerSlots> = {
  before: `${virtualizerClassName}__before`,
  beforeContainer: `${virtualizerClassName}__beforeContainer`,
  after: `${virtualizerClassName}__after`,
  afterContainer: `${virtualizerClassName}__afterContainer`,
};

const useStyles = makeStyles({
  base: {
    display: 'block',
    pointerEvents: 'none',
  },
  relative: {
    position: 'relative',
  },
  horizontal: {
    minHeight: '100%',
  },
  vertical: {
    minWidth: '100%',
  },
});

/**
 * Apply styling to the Virtualizer states
 */
export const useVirtualizerStyles_unstable = (state: VirtualizerState): VirtualizerState => {
  'use no memo';

  const styles = useStyles();
  const { reversed, axis, beforeBufferHeight, afterBufferHeight, bufferSize } = state;
  const horizontal = axis === 'horizontal';

  state.before.className = mergeClasses(
    virtualizerClassNames.before,
    styles.base,
    styles.relative,
    horizontal ? styles.horizontal : styles.vertical,
    state.before.className,
  );

  state.after.className = mergeClasses(
    virtualizerClassNames.after,
    styles.base,
    styles.relative,
    horizontal ? styles.horizontal : styles.vertical,
    state.after.className,
  );

  state.beforeContainer.className = mergeClasses(
    virtualizerClassNames.beforeContainer,
    styles.base,
    horizontal ? styles.horizontal : styles.vertical,
    state.beforeContainer.className,
  );

  state.afterContainer.className = mergeClasses(
    virtualizerClassNames.afterContainer,
    styles.base,
    horizontal ? styles.horizontal : styles.vertical,
    state.afterContainer.className,
  );

  const beforeHeightPx = beforeBufferHeight + 'px';
  const afterHeightPx = afterBufferHeight + 'px';
  const beforeBufferHeightPx = beforeBufferHeight + bufferSize + 'px';
  const afterBufferHeightPx = afterBufferHeight + bufferSize + 'px';
  const bufferPx = bufferSize + 'px';

  const beforeBuffer = {
    // Column
    ...(!reversed && !horizontal && { marginBottom: `-${bufferPx}` }),
    // Column-Reverse
    ...(reversed && !horizontal && { marginTop: `-${bufferPx}` }),
    // Row
    ...(!reversed && horizontal && { marginRight: `-${bufferPx}` }),
    // Row-Reverse
    ...(reversed && horizontal && { marginLeft: `-${bufferPx}` }),
  };

  const afterBuffer = {
    // Column
    ...(!reversed && !horizontal && { marginTop: `-${bufferPx}` }),
    // Column-Reverse
    ...(reversed && !horizontal && { marginBottom: `-${bufferPx}` }),
    // Row
    ...(!reversed && horizontal && { marginLeft: `-${bufferPx}` }),
    // Row-Reverse
    ...(reversed && horizontal && { marginRight: `-${bufferPx}` }),
  };

  state.before.style = {
    height: horizontal ? '100%' : beforeBufferHeightPx,
    width: horizontal ? beforeBufferHeightPx : '100%',
    ...beforeBuffer,
    ...state.before.style,
  };

  state.beforeContainer.style = {
    height: horizontal ? 'auto' : beforeHeightPx,
    width: horizontal ? beforeHeightPx : 'auto',
    ...state.beforeContainer.style,
  };

  state.after.style = {
    height: horizontal ? '100%' : afterBufferHeightPx,
    width: horizontal ? afterBufferHeightPx : '100%',
    ...afterBuffer,
    ...state.after.style,
  };

  state.afterContainer.style = {
    height: horizontal ? 'auto' : afterHeightPx,
    width: horizontal ? afterHeightPx : 'auto',
    ...state.afterContainer.style,
  };

  return state;
};
