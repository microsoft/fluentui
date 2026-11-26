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
   * element. Supply exactly one visible, enabled `CarouselNavButton` (or its hook and renderer)
   * for each group. An incomplete tablist is not a navigation route. Defaults to `<CarouselNavButton />`.
   */
  children?: NavButtonRenderFunction | React.ReactNode;
};

export type CarouselNavState = ComponentState<CarouselNavSlots> & {
  pageCount: number;
  /** False with fewer than two groups. */
  rendered: boolean;
  /** Tracks the group's operable tab, including tabs rendered by a custom template. */
  registerTab: (index: number) => () => void;
  /** Renders the item for one group. */
  renderNavButton: NavButtonRenderFunction;
};
