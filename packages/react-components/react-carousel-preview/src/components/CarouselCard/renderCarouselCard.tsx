/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';
import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselCardState, CarouselCardSlots } from './CarouselCard.types';

const Slide = createPresenceComponent<Pick<CarouselCardState, 'navDirection'>>(({ navDirection }) => ({
  enter: {
    keyframes: [
      { transform: navDirection === 'next' ? 'translateX(-100%)' : 'translateX(100%)' },
      { transform: 'translateX(0%)' },
    ],
    easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
    duration: motionTokens.durationUltraSlow,
  },
  exit: {
    keyframes: [
      { transform: 'translateX(0%)' },
      { transform: navDirection === 'next' ? 'translateX(100%)' : 'translateX(-100%)' },
    ],
    easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
    duration: motionTokens.durationUltraSlow,
  },
}));

/**
 * Render the final JSX of CarouselCard
 */
export const renderCarouselCard_unstable = (state: CarouselCardState) => {
  assertSlots<CarouselCardSlots>(state);

  const { navDirection, peeking, visible } = state;

  // TODO: Add peeking animation
  if (peeking) {
    return <state.root />;
  }

  return (
    // TODO: add unmountOnExit
    <Slide navDirection={navDirection} visible={visible}>
      <state.root />
    </Slide>
  );
};
