import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { VirtualizerFlow, VirtualizerSlots, VirtualizerState } from './Virtualizer.types';

export const renderVirtualizer_unstable = (state: VirtualizerState) => {
  const { slots, slotProps } = getSlots<VirtualizerSlots>(state);
  const { isReversed, flow, beforeBufferHeight, afterBufferHeight, bufferSize } = state;

  const isVertical = flow === VirtualizerFlow.Vertical;
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

  const beforeStyle = {
    height: isVertical ? beforeBufferHeightPx : '100%',
    width: isVertical ? '100%' : beforeBufferHeightPx,
  };

  const beforeContainerStyle = {
    height: isVertical ? beforeHeightPx : '100%',
    width: isVertical ? '100%' : beforeHeightPx,
    ...beforeBuffer,
  };

  const afterStyle = {
    height: isVertical ? afterBufferHeightPx : '100%',
    width: isVertical ? '100%' : afterBufferHeightPx,
  };

  const afterContainerStyle = {
    height: isVertical ? afterHeightPx : '100%',
    width: isVertical ? '100%' : afterHeightPx,
    ...afterBuffer,
  };

  return (
    <React.Fragment>
      {/* The 'before' bookend to hold items in place and detect scroll previous */}
      <slots.beforeContainer style={beforeContainerStyle} {...slotProps.beforeContainer}>
        <slots.before style={beforeStyle} {...slotProps.before} />
      </slots.beforeContainer>
      {/* The reduced list of non-virtualized children to be rendered */}
      {state.virtualizedChildren}
      {/* The 'after' bookend to hold items in place and detect scroll next */}
      <slots.afterContainer style={afterContainerStyle} {...slotProps.afterContainer}>
        <slots.after style={afterStyle} {...slotProps.after} />
      </slots.afterContainer>
    </React.Fragment>
  );
};
