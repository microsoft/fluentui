import * as React from 'react';
import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverCarouselNavSlots = {
  /**
   * The element wrapping the carousel pagination. By default this is a div,
   * it may contain icons or text depending on TeachingPopoverCarouselNavStyle
   */
  root: NonNullable<Slot<'div'>>;
};

export type NavButtonRenderFunction = (value: string) => React.ReactNode;

export type TeachingPopoverCarouselNavState = ComponentState<TeachingPopoverCarouselNavSlots> & {
  values: string[];

  renderNavButton: NavButtonRenderFunction;
};

export type TeachingPopoverCarouselNavProps = Omit<
  ComponentProps<Partial<TeachingPopoverCarouselNavSlots>>,
  'children'
> & {
  children: NavButtonRenderFunction;
};
