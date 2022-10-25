import { makeStyles, mergeClasses } from '@griffel/react';
import type { VirtualizerSlots, VirtualizerState } from './Virtualizer.types';
import { VirtualizerFlow } from './Virtualizer.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const virtualizerClassName = 'fui-Virtualizer';
export const virtualizerClassNames: SlotClassNames<VirtualizerSlots> = {
  root: virtualizerClassName,
  before: 'fui-Bookend-Before',
  beforeContainer: 'fui-Bookend-BeforeContainer',
  after: 'fui-Bookend-After',
  afterContainer: 'fui-Bookend-AfterContainer',
};

/**
 * Apply styling to the Table slots based on the state
 */
export const useVirtualizerStyles_unstable = (state: VirtualizerState): VirtualizerState => {
  const { flow, isReversed, bufferSize, beforeBufferHeight, afterBufferHeight, totalVirtualizerHeight } = state;

  const isVertical = flow === VirtualizerFlow.Vertical;
  const totalHeightPx = totalVirtualizerHeight + 'px';
  const beforeHeightPx = beforeBufferHeight + 'px';
  const afterHeightPx = afterBufferHeight + 'px';
  const beforeBufferHeightPx = beforeBufferHeight + bufferSize + 'px';
  const afterBufferHeightPx = afterBufferHeight + bufferSize + 'px';
  let topPos = 0;
  let bottomPos = bufferSize;

  if (isReversed) {
    [topPos, bottomPos] = [bottomPos, topPos];
  }

  const topPosPx = topPos + 'px';
  const bottomPosPx = bottomPos + 'px';

  const beforeBuffer = {
    ...(!isReversed && isVertical && { top: topPosPx }),
    ...(isReversed && isVertical && { bottom: topPosPx }),
    ...(isReversed && !isVertical && { left: topPosPx }),
    ...(!isReversed && !isVertical && { right: topPosPx }),
  };

  const afterBuffer = {
    ...(isReversed && isVertical && { top: bottomPosPx }),
    ...(!isReversed && isVertical && { bottom: bottomPosPx }),
    ...(!isReversed && !isVertical && { left: bottomPosPx }),
    ...(isReversed && !isVertical && { right: bottomPosPx }),
  };

  const direction =
    flow === VirtualizerFlow.Vertical ? (isReversed ? 'column-reverse' : 'column') : isReversed ? 'row-reverse' : 'row';

  // TODO: Split this out?
  const styles = makeStyles({
    root: {
      display: 'flex',
      flexDirection: direction,
      height: isVertical ? totalHeightPx : '100%',
      width: isVertical ? '100%' : totalHeightPx,
      overflowAnchor: 'none',
    },
    before: {
      display: 'flex',
      height: isVertical ? beforeHeightPx : '100%',
      width: isVertical ? '100%' : beforeHeightPx,
    },
    after: {
      display: 'flex',
      height: isVertical ? afterHeightPx : '100%',
      width: isVertical ? '100%' : afterHeightPx,
    },
    beforeContainer: {
      height: isVertical ? beforeBufferHeightPx : '100%',
      width: isVertical ? '100%' : beforeBufferHeightPx,
      position: 'relative',
      ...beforeBuffer,
    },
    afterContainer: {
      height: isVertical ? afterBufferHeightPx : '100%',
      width: isVertical ? '100%' : afterBufferHeightPx,
      position: 'relative',
      ...afterBuffer,
    },
  })();

  state.root.className = mergeClasses(virtualizerClassName, styles.root, state.root.className);

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
