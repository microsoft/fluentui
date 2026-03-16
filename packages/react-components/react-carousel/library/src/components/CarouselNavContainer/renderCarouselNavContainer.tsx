/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CarouselNavContainerState, CarouselNavContainerSlots } from './CarouselNavContainer.types';

/**
 * Render the final JSX of CarouselNavContainer
 */
export const renderCarouselNavContainer_unstable = (state: CarouselNavContainerState): JSXElement => {
  assertSlots<CarouselNavContainerSlots>(state);

  return (
    <state.root>
      {!state.autoplayTooltip && state.autoplay && <state.autoplay />}
      {state.autoplayTooltip && state.autoplay && (
        <state.autoplayTooltip>
          <state.autoplay />
        </state.autoplayTooltip>
      )}
      {!state.prevTooltip && state.prev && <state.prev />}
      {state.prevTooltip && state.prev && (
        <state.prevTooltip>
          <state.prev />
        </state.prevTooltip>
      )}
      {state.root.children}
      {!state.nextTooltip && state.next && <state.next />}
      {state.nextTooltip && state.next && (
        <state.nextTooltip>
          <state.next />
        </state.nextTooltip>
      )}
    </state.root>
  );
};
