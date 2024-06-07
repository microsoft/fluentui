/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselCardState, CarouselCardSlots } from './CarouselCard.types';

import { createPresenceComponent, motionTokens } from '@fluentui/react-motions-preview';
import * as React from 'react';

const slideLeftKeyframes = [{ transform: 'translateX(100%)' }, { transform: 'translateX(0%)' }];
const slideLeftExitKeyframes = [{ transform: 'translateX(0%)' }, { transform: 'translateX(-100%)' }];

const SlideLeft = createPresenceComponent({
  enter: {
    keyframes: slideLeftKeyframes,
    easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
    duration: motionTokens.durationUltraSlow,
  },
  exit: {
    keyframes: slideLeftExitKeyframes,
    easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
    duration: motionTokens.durationUltraSlow,
  },
});

const slideRightKeyframes = [{ transform: 'translateX(-100%)' }, { transform: 'translateX(0%)' }];
const slideRightExitKeyframes = [{ transform: 'translateX(0%)' }, { transform: 'translateX(100%)' }];
const SlideRight = createPresenceComponent({
  enter: {
    keyframes: slideRightKeyframes,
    easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
    duration: motionTokens.durationUltraSlow,
  },
  exit: {
    keyframes: slideRightExitKeyframes,
    easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
    duration: motionTokens.durationUltraSlow,
  },
});

/**
 * Render the final JSX of CarouselCard
 */
export const renderCarouselCard_unstable = (state: CarouselCardState) => {
  assertSlots<CarouselCardSlots>(state);

  const { visible, navDirection, onAnimationEnd, peekDir, directionChanged, wasVisible } = state;

  if (navDirection === 'next') {
    if (directionChanged) {
      return (
        <SlideRight visible={visible || !!peekDir || !!wasVisible} appear={true} onMotionFinish={onAnimationEnd}>
          <state.root />
        </SlideRight>
      );
    }
    return (
      <SlideRight visible={visible} appear={visible} onMotionFinish={onAnimationEnd}>
        <state.root />
      </SlideRight>
    );
  } else if (navDirection === 'prev') {
    if (directionChanged) {
      return (
        <SlideLeft visible={visible || !!peekDir || !!wasVisible} appear={true} onMotionFinish={onAnimationEnd}>
          <state.root />
        </SlideLeft>
      );
    }
    return (
      <SlideLeft visible={visible} appear={visible} onMotionFinish={onAnimationEnd}>
        <state.root />
      </SlideLeft>
    );
  } else {
    return <state.root />;
  }
};
