'use client';

import * as React from 'react';
import { mergeCallbacks, slot, useMergedRefs } from '@fluentui/react-utilities';
import { Button } from '../../Button';
import { isControlDisabled, isControlHidden, useCarouselContext, useCarouselPart } from '../carouselContext';
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
  const context = useCarouselContext();
  const rendered = context.paged && !isControlHidden(props);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const mergedRef = useMergedRefs(buttonRef, ref);
  useCarouselPart('autoplay', rendered, !isControlDisabled(props), buttonRef);
  const {
    playLabel = 'Play',
    pauseLabel = 'Pause',
    reducedMotionLabel = 'Autoplay unavailable with reduced motion',
    ...rest
  } = props;
  const root = slot.always({ ...rest, ref: mergedRef } as NonNullable<CarouselAutoplayButtonSlots['root']>, {
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
    rendered,
  };
};
