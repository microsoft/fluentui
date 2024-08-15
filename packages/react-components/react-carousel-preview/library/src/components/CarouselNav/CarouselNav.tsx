import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarouselNav_unstable } from './useCarouselNav';
import { renderCarouselNav_unstable } from './renderCarouselNav';
import { useCarouselNavStyles_unstable } from './useCarouselNavStyles.styles';
import type { CarouselNavProps } from './CarouselNav.types';

/**
 * Used to jump to a card based on index, using arrow navigation via Tabster.
 *
 * The children of this component will be wrapped in a context to
 * provide the appropriate value based on their index position.
 */
export const CarouselNav: ForwardRefComponent<CarouselNavProps> = React.forwardRef((props, ref) => {
  const state = useCarouselNav_unstable(props, ref);

  useCarouselNavStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useCarouselNavStyles_unstable')(state);
  return renderCarouselNav_unstable(state);
});

CarouselNav.displayName = 'CarouselNav';
