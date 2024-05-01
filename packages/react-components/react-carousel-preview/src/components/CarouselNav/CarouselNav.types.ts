import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import * as React from 'react';

export type CarouselNavSlots = {
  /**
   * The element wrapping the carousel pagination. By default this is a div.
   */
  root: NonNullable<Slot<'div'>>;
};

export type NavButtonRenderFunction = (value: string) => React.ReactNode;

export type CarouselNavState = ComponentState<CarouselNavSlots> & {
  values: string[];

  renderNavButton: NavButtonRenderFunction;
};

export type CarouselNavProps = Omit<ComponentProps<Partial<CarouselNavSlots>>, 'children'> & {
  children: NavButtonRenderFunction;
};
