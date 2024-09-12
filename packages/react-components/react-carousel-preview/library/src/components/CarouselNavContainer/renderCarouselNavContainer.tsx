/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselNavContainerState, CarouselNavContainerSlots } from './CarouselNavContainer.types';

/**
 * Render the final JSX of CarouselNavContainer
 */
export const renderCarouselNavContainer_unstable = (state: CarouselNavContainerState) => {
  assertSlots<CarouselNavContainerSlots>(state);

  return (
    <state.root>
      {state.autoplay && <state.autoplay />}
      {state.prev && <state.prev />}
      {state.root.children}
      {state.next && <state.next />}
    </state.root>
  );
};
