import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarouselFooter_unstable } from './useCarouselFooter';
import { renderCarouselFooter_unstable } from './renderCarouselFooter';
import { useCarouselFooterStyles_unstable } from './useCarouselFooterStyles.styles';
import type { CarouselFooterProps } from './CarouselFooter.types';

/**
 * CarouselFooter component - TODO: add more docs
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
