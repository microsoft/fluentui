import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import * as React from 'react';

export type CarouselNavSlots = {
  /**
   * The element wrapping the carousel pagination. By default, this is a div.
   */
  root: NonNullable<Slot<'div'>>;
};

export type NavButtonRenderFunction = (index: number) => React.ReactNode;

export type CarouselNavState = ComponentState<CarouselNavSlots> & {
  /**
   * Enables an alternate brand style when set to 'brand'
   */
  appearance?: 'brand';

  /**
   * The function that will render nav items based on total slides and their index.
   */
  renderNavButton: NavButtonRenderFunction;

  /**
   * The total number of slides available.
   * Users may override if using the component without a Carousel wrapper or implementing custom functionality.
   */
  totalSlides: number;
};

export type CarouselNavProps = Omit<ComponentProps<Partial<CarouselNavSlots>>, 'children'> & {
  children: NavButtonRenderFunction;
} & Partial<Pick<CarouselNavState, 'appearance' | 'totalSlides'>>;

export type CarouselNavContextValue = Pick<CarouselNavState, 'appearance'>;
