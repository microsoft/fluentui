/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselCardState, CarouselCardSlots } from './CarouselCard.types';

import { createPresenceComponent, motionTokens } from '@fluentui/react-motions-preview';
import { useEffect } from 'react';

// export const SlideLeftMotion = createPresenceComponent({
//   enter: {
//     keyframes: slideLeftEnterKeyframes,
//     easing: motionTokens.curveLinear,
//     duration: motionTokens.durationGentle,
//   },
//   exit: {
//     keyframes: slideLeftExitKeyframes,
//     easing: motionTokens.curveLinear,
//     duration: motionTokens.durationGentle,
//   },
// });

const slideLeftKeyframes = [{ transform: 'translateX(100%)' }, { transform: 'translateX(0%)' }];
const slideLeftExitKeyframes = [{ transform: 'translateX(0%)' }, { transform: 'translateX(-100%)' }];

const SlideLeft = createPresenceComponent({
  enter: {
    keyframes: slideLeftKeyframes,
    easing: motionTokens.curveLinear,
    duration: motionTokens.durationGentle,
  },
  exit: {
    keyframes: slideLeftExitKeyframes,
    easing: motionTokens.curveLinear,
    duration: motionTokens.durationGentle,
  },
});

// const slideRightKeyframes = [{ transform: 'translateX(-100%)' }, { transform: 'translateX(0%)' }];
// const slideRightExitKeyframes = [{ transform: 'translateX(0%)' }, { transform: 'translateX(100%)' }];
// const SlideRight = createPresenceComponent({
//   enter: {
//     keyframes: slideRightKeyframes,
//     easing: motionTokens.curveLinear,
//     duration: motionTokens.durationGentle,
//   },
//   exit: {
//     keyframes: slideRightExitKeyframes,
//     easing: motionTokens.curveLinear,
//     duration: motionTokens.durationGentle,
//   },
// });

/**
 * Render the final JSX of CarouselCard
 */
export const renderCarouselCard_unstable = (state: CarouselCardState) => {
  assertSlots<CarouselCardSlots>(state);

  const { visible } = state;

  // TODO Add additional slots in the appropriate place
  return (
    // eslint-disable-next-line react/jsx-no-bind
    <SlideLeft visible={visible} appear>
      <state.root />
    </SlideLeft>
  );
};
