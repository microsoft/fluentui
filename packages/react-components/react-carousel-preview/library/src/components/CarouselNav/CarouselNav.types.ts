import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import * as React from 'react';

export type CarouselNavSlots = {
  /**
   * The element wrapping the carousel pagination. By default this is a div.
   */
  root: NonNullable<Slot<'div'>>;
};

export type NavButtonRenderFunction = (value: number) => React.ReactNode;

export type CarouselNavState = ComponentState<CarouselNavSlots> & {
  /**
   * The total number of slides available.
   */
  totalSlides: number;

  /**
   * The function that will render nav items based on total slides and their index.
   */
  renderNavButton: NavButtonRenderFunction;
};

export type CarouselNavProps = Omit<ComponentProps<Partial<CarouselNavSlots>>, 'children'> & {
  children: NavButtonRenderFunction;
};
