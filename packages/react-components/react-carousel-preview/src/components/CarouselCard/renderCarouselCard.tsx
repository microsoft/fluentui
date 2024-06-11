/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselCardState, CarouselCardSlots } from './CarouselCard.types';

import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';

const Slide = createPresenceComponent<{ direction: 'prev' | 'next' }>(({ direction }) => {
  return {
    enter: {
      keyframes: [
        { transform: direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)' },
        { transform: 'translateX(0%)' },
      ],
      easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
      duration: motionTokens.durationUltraSlow,
    },
    exit: {
      keyframes: [
        { transform: 'translateX(0%)' },
        { transform: direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)' },
      ],
      easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
      duration: motionTokens.durationUltraSlow,
    },
  };
});

/**
 * Render the final JSX of CarouselCard
 */
export const renderCarouselCard_unstable = (state: CarouselCardState) => {
  assertSlots<CarouselCardSlots>(state);

  const { visible, navDirection, value } = state;

  if (state.peeking) {
    return <state.root />;
  }

  return (
    <Slide value={value} direction={navDirection} visible={visible}>
      <state.root />
    </Slide>
  );
};
