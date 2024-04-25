import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarouselFooter_unstable } from './useCarouselFooter';
import { renderCarouselFooter_unstable } from './renderCarouselFooter';
import { useCarouselFooterStyles_unstable } from './useCarouselFooterStyles.styles';
import type { CarouselFooterProps } from './CarouselFooter.types';

/**
 * A unified navigation footer with all Carousel navigation components as slots,
 * with the CarouselNav intended to be placed within the root children.
 *
 * The footer will have variant layouts that are condensed or extended,
 * as well as options to null out slots if not required or placed externally.
 */
export const CarouselFooter: ForwardRefComponent<CarouselFooterProps> = React.forwardRef((props, ref) => {
  const state = useCarouselFooter_unstable(props, ref);

  useCarouselFooterStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useCarouselFooterStyles_unstable')(state);
  return renderCarouselFooter_unstable(state);
});

CarouselFooter.displayName = 'CarouselFooter';
