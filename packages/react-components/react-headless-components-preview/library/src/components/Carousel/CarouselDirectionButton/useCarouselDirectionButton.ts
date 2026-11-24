'use client';

import * as React from 'react';
import { getIntrinsicElementProps, mergeCallbacks, slot, useMergedRefs } from '@fluentui/react-utilities';
import { Button } from '../../Button';
import { useCarouselContext, useCarouselPart } from '../carouselContext';
import type { CarouselDirectionButtonProps, CarouselDirectionButtonState } from './CarouselDirectionButton.types';

/**
 * Create the state required to render CarouselPrevious or CarouselNext.
 *
 * @param kind - which direction the button navigates
 */
export const useCarouselDirectionButton = (
  props: CarouselDirectionButtonProps,
  ref: React.Ref<HTMLDivElement>,
  kind: 'previous' | 'next',
): CarouselDirectionButtonState => {
  useCarouselPart('buttons');
  const context = useCarouselContext();
  const { button, tooltip, ...rest } = props;
  const unavailable = kind === 'previous' ? context.previousUnavailable : context.nextUnavailable;
  const hidden = kind === 'previous' ? context.previousHidden : context.nextHidden;
  const inertRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      node?.toggleAttribute('inert', hidden);
    },
    [hidden],
  );
  const rootRef = useMergedRefs(ref, inertRef);
  const tooltipSlot = slot.always(tooltip, {
    elementType: 'div',
    defaultProps: { children: kind === 'previous' ? 'Previous' : 'Next' },
  });
  const tooltipId = tooltipSlot.id ?? `${context.idPrefix}-${kind}-label`;
  const buttonSlot = slot.always(button, { elementType: Button });

  return {
    components: { root: 'div', button: Button, tooltip: 'div' },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ...rest,
        ref: rootRef,
        hidden,
        'data-carousel-button': kind,
      }),
      { elementType: 'div' },
    ),
    button: Object.assign(buttonSlot, {
      'aria-controls': context.viewportId,
      'aria-labelledby': tooltipId,
      'aria-label': undefined,
      'aria-describedby': undefined,
      'data-carousel-action': kind,
      disabled: unavailable,
      disabledFocusable: unavailable,
      onClick: mergeCallbacks(buttonSlot.onClick, kind === 'previous' ? context.previous : context.next),
    }),
    tooltip: Object.assign(tooltipSlot, { id: tooltipId }),
    kind,
    rendered: context.buttons,
    hidden,
    unavailable,
  };
};
