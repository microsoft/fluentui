import type * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselNavSlots = {
  /** Labeled `role="tablist"` below the viewport. */
  root: Slot<'div'>;
};

/** Renders the nav item for a zero-based group index. */
export type NavButtonRenderFunction = (index: number) => React.ReactNode;

export type CarouselNavProps = Omit<ComponentProps<CarouselNavSlots>, 'children'> & {
  /**
   * Rendered once per group: either a render function that receives the group index, or a template
   * element. Defaults to `<CarouselNavButton />`.
   */
  children?: NavButtonRenderFunction | React.ReactNode;
};

export type CarouselNavState = ComponentState<CarouselNavSlots> & {
  pageCount: number;
  /** False with fewer than two groups. */
  rendered: boolean;
  /** Renders the item for one group. */
  renderNavButton: NavButtonRenderFunction;
};
