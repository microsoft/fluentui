'use client';

import type * as React from 'react';
import { useCarouselDirectionButton } from '../CarouselDirectionButton/useCarouselDirectionButton';
import type { CarouselNextProps, CarouselNextState } from './CarouselNext.types';

/** Create the state required to render CarouselNext. */
export const useCarouselNext = (props: CarouselNextProps, ref: React.Ref<HTMLDivElement>): CarouselNextState =>
  useCarouselDirectionButton(props, ref, 'next');
