import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarouselAnnouncer_unstable } from './useCarouselAnnouncer';
import { renderCarouselAnnouncer_unstable } from './renderCarouselAnnouncer';
import { useCarouselAnnouncerStyles_unstable } from './useCarouselAnnouncerStyles.styles';
import type { CarouselAnnouncerProps } from './CarouselAnnouncer.types';

/**
 * CarouselAnnouncer component - This component will enable context for announcements of carousel page changes.
 *
 * It is recommended to provide a simple current out of total page index string.
 *
 * Slide group lists are also provided when multiple cards are present in a single slide.
 */
export const CarouselAnnouncer: ForwardRefComponent<CarouselAnnouncerProps> = React.forwardRef((props, ref) => {
  const state = useCarouselAnnouncer_unstable(props, ref);

  useCarouselAnnouncerStyles_unstable(state);

  /**
   * @see https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/custom-styling.md
   *
   * TODO: 💡 once package will become stable (PR which will be part of promoting PREVIEW package to STABLE),
   *      - uncomment this line
   *      - update types {@link file://./../../../../../../../packages/react-components/react-shared-contexts/library/src/CustomStyleHooksContext/CustomStyleHooksContext.ts#CustomStyleHooksContextValue}
   *      - verify that custom global style override works for your component
   */
  // useCustomStyleHook_unstable('useCarouselAnnouncerStyles_unstable')(state);

  return renderCarouselAnnouncer_unstable(state);
});

CarouselAnnouncer.displayName = 'CarouselAnnouncer';
