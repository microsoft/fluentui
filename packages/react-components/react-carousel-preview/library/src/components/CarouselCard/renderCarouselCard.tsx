/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import { assertSlots } from '@fluentui/react-utilities';

import type { CarouselCardState, CarouselCardSlots } from './CarouselCard.types';
import { CarouselSliderContext } from '../CarouselSlider';
import { Portal } from '@fluentui/react-portal';
import { CAROUSEL_ACTIVE_ITEM, CAROUSEL_ITEM } from '../constants';

/**
 * Render the final JSX of CarouselCard
 */
export const renderCarouselCard_unstable = (state: CarouselCardState) => {
  assertSlots<CarouselCardSlots>(state);

  const buffer = React.useContext(CarouselSliderContext);
  // TODO Add additional slots in the appropriate place
  return (
    <>
      <state.root />
      {typeof state.bufferPosition === 'number' && (
        <Portal mountNode={buffer[state.bufferPosition]}>
          <state.root {...{ [CAROUSEL_ITEM]: null, [CAROUSEL_ACTIVE_ITEM]: null }} />
        </Portal>
      )}
    </>
  );
};
