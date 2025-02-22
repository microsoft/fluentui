import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';

import type { CarouselNavProps } from './CarouselNav.types';
import { useCarouselNavContextValues_unstable } from './CarouselNavContext';
import { renderCarouselNav_unstable } from './renderCarouselNav';
import { useCarouselNav_unstable } from './useCarouselNav';
import { useCarouselNavStyles_unstable } from './useCarouselNavStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Used to jump to a card based on index, using arrow navigation via Tabster.
 *
 * The children of this component will be wrapped in a context to
 * provide the appropriate value based on their index position.
 */
export const CarouselNav: ForwardRefComponent<CarouselNavProps> = React.forwardRef((props, ref) => {
  const state = useCarouselNav_unstable(props, ref);
  const contextValues = useCarouselNavContextValues_unstable(state);

  useCarouselNavStyles_unstable(state);
  useCustomStyleHook_unstable('useCarouselNavStyles_unstable')(state);

  return renderCarouselNav_unstable(state, contextValues);
});

CarouselNav.displayName = 'CarouselNav';
