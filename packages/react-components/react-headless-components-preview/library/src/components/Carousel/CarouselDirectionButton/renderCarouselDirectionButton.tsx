/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { CarouselDirectionStaging } from './CarouselDirectionStaging';
import type { CarouselDirectionButtonSlots, CarouselDirectionButtonState } from './CarouselDirectionButton.types';

export const renderCarouselDirectionButton = (state: CarouselDirectionButtonState): JSXElement | null => {
  assertSlots<CarouselDirectionButtonSlots>(state);
  if (!state.rendered && !state.keepButtonMounted) {
    return state.probeRef ? <template ref={state.probeRef} /> : null;
  }
  const stage = state.keepButtonMounted && state.hidden;
  const control = (
    <state.root data-carousel-button={stage ? undefined : state.root['data-carousel-button']}>
      {(!state.hidden || state.keepButtonMounted) && <state.button />}
    </state.root>
  );
  return state.keepButtonMounted ? (
    <CarouselDirectionStaging state={state}>{control}</CarouselDirectionStaging>
  ) : (
    control
  );
};
