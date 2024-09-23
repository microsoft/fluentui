import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarouselNavContainer_unstable } from './useCarouselNavContainer';
import { renderCarouselNavContainer_unstable } from './renderCarouselNavContainer';
import { useCarouselNavContainerStyles_unstable } from './useCarouselNavContainerStyles.styles';
import type { CarouselNavContainerProps } from './CarouselNavContainer.types';

/**
 * CarouselNavContainer component - This container will provide multiple valid layout options for the underlying carousel controls
 */
export const CarouselNavContainer: ForwardRefComponent<CarouselNavContainerProps> = React.forwardRef((props, ref) => {
  const state = useCarouselNavContainer_unstable(props, ref);

  useCarouselNavContainerStyles_unstable(state);

  /**
   * @see https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/custom-styling.md
   *
   * TODO: 💡 once package will become stable (PR which will be part of promoting PREVIEW package to STABLE),
   *      - uncomment this line
   *      - update types {@link file://./../../../../../../../packages/react-components/react-shared-contexts/library/src/CustomStyleHooksContext/CustomStyleHooksContext.ts#CustomStyleHooksContextValue}
   *      - verify that custom global style override works for your component
   */
  // useCustomStyleHook_unstable('useCarouselNavContainerStyles_unstable')(state);

  return renderCarouselNavContainer_unstable(state);
});

CarouselNavContainer.displayName = 'CarouselNavContainer';
