'use client';

import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { useCarouselContext, useCarouselPart } from '../carouselContext';
import { CarouselNavButton } from '../CarouselNavButton/CarouselNavButton';
import type { CarouselNavProps, CarouselNavState, NavButtonRenderFunction } from './CarouselNav.types';

/** Create the state required to render CarouselNav. */
export const useCarouselNav = (props: CarouselNavProps, ref: React.Ref<HTMLDivElement>): CarouselNavState => {
  useCarouselPart('nav');
  const { pageCount, nav } = useCarouselContext();
  const { children, ...rest } = props;
  return {
    components: { root: 'div' },
    root: slot.always(
      getIntrinsicElementProps('div', { 'aria-label': 'Choose a page', ...rest, ref, role: 'tablist' }),
      { elementType: 'div' },
    ),
    pageCount,
    rendered: nav,
    renderNavButton:
      typeof children === 'function'
        ? (children as NavButtonRenderFunction)
        : () => children ?? React.createElement(CarouselNavButton),
  };
};
