/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CarouselDirectionButtonSlots, CarouselDirectionButtonState } from './CarouselDirectionButton.types';

/** At a boundary the root stays as an empty, hidden placeholder that keeps the arrow's space. */
export const renderCarouselDirectionButton = (state: CarouselDirectionButtonState): JSXElement | null => {
  assertSlots<CarouselDirectionButtonSlots>(state);
  if (!state.rendered) {
    return null;
  }
  return <state.root>{!state.hidden && <state.button />}</state.root>;
};
