'use client';

import type * as React from 'react';
import { useCarouselDirectionButton } from '../CarouselDirectionButton/useCarouselDirectionButton';
import type { CarouselPreviousProps, CarouselPreviousState } from './CarouselPrevious.types';

/** Create the state required to render CarouselPrevious. */
export const useCarouselPrevious = (
  props: CarouselPreviousProps,
  ref: React.Ref<HTMLDivElement>,
): CarouselPreviousState => useCarouselDirectionButton(props, ref, 'previous');
