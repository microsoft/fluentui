/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselCardState, CarouselCardSlots } from './CarouselCard.types';
import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';

// @ts-expect-error I will fix this later
const Slide = createPresenceComponent<{}>(({ navDirection }) => {
  return {
    enter: {
      keyframes: [
        { gridColumn: '2', transform: navDirection === 'next' ? 'translateX(-100%)' : 'translateX(100%)' },
        { gridColumn: '2', offset: 0.99, transform: 'translateX(0%)' },
        { gridColumn: '1' },

        // { transform: navDirection === 'next' ? 'translateX(-100%)' : 'translateX(100%)' },
        // { transform: 'translateX(0%)' },
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
  };
});

/**
 * Render the final JSX of CarouselCard
 */
export const renderCarouselCard_unstable = (state: CarouselCardState) => {
  assertSlots<CarouselCardSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
