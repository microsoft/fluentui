'use client';

import type * as React from 'react';
import { mergeCallbacks, slot, useMergedRefs } from '@fluentui/react-utilities';
import { Button } from '../../Button';
import {
  isControlDisabled,
  isControlHidden,
  useCarouselContext,
  useCarouselPartRegistration,
} from '../carouselContext';
import { useFieldsetRegistration } from '../useFieldsetRegistration';
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
  const register = useCarouselPartRegistration('autoplay', rendered, !isControlDisabled(props));
  const mergedRef = useMergedRefs(ref, useFieldsetRegistration<HTMLButtonElement>(register));
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
