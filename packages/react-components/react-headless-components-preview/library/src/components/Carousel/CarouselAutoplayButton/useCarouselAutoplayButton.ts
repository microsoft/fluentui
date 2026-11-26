'use client';

import type * as React from 'react';
import { mergeCallbacks, slot } from '@fluentui/react-utilities';
import { Button } from '../../Button';
import { isControlDisabled, useCarouselContext, useCarouselPart } from '../carouselContext';
import type {
  CarouselAutoplayButtonProps,
  CarouselAutoplayButtonSlots,
  CarouselAutoplayButtonState,
} from './CarouselAutoplayButton.types';

/**
 * Create the state required to render CarouselAutoplayButton.
 *
 * Rendering it enables autoplay for a paged collection, initially stopped. Render it first so it is the first
 * focus stop.
 */
export const useCarouselAutoplayButton = (
  props: CarouselAutoplayButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): CarouselAutoplayButtonState => {
  useCarouselPart('autoplay', !props.hidden, !isControlDisabled(props));
  const context = useCarouselContext();
  const {
    playLabel = 'Play',
    pauseLabel = 'Pause',
    reducedMotionLabel = 'Autoplay unavailable with reduced motion',
    ...rest
  } = props;
  const root = slot.always({ ...rest, ref } as NonNullable<CarouselAutoplayButtonSlots['root']>, {
    elementType: Button,
  });
  return {
    components: { root: Button },
    root: Object.assign(root, {
      'aria-controls': context.viewportId,
      'aria-label': undefined,
      'aria-labelledby': undefined,
      'aria-pressed': undefined,
      'data-carousel-action': 'autoplay',
      disabled: props.disabled || context.reducedMotion,
      disabledFocusable: props.disabledFocusable || (!props.disabled && context.reducedMotion),
      children: context.reducedMotion ? reducedMotionLabel : context.playing ? pauseLabel : playLabel,
      onClick: mergeCallbacks(root.onClick, context.toggleAutoplay),
    }),
    rendered: context.paged && !props.hidden,
  };
};
