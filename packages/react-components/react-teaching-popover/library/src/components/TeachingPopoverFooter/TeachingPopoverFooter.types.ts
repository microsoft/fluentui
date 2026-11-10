import type * as React from 'react';
import type { Button } from '@fluentui/react-button';
import type { ComponentProps, ComponentState, DistributiveOmit, Slot } from '@fluentui/react-utilities';
import type { PopoverContextValue } from '@fluentui/react-popover';

export type TeachingPopoverFooterSlots = {
  /**
   * The element wrapping the buttons.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * The primary button slot.
   */
  primary: NonNullable<Slot<typeof Button>>;

  /**
   * The secondary button slot.
   */
  secondary?: Slot<typeof Button>;
};

export type TeachingPopoverFooterState = ComponentState<TeachingPopoverFooterSlots> &
  Pick<PopoverContextValue, 'appearance'> & {
    /**
     * Enables stylization to a horizontal or vertical stack of button layouts.
     * Defaults to horizontal
     */
    footerLayout?: 'horizontal' | 'vertical';
  };

export type TeachingPopoverFooterProps = ComponentProps<TeachingPopoverFooterSlots> &
  Pick<TeachingPopoverFooterState, 'footerLayout'>;

/**
 * Base props omit the `primary` and `secondary` Button slots — those are styling
 * concerns. The headless variant composes buttons as children of the root.
 */
export type TeachingPopoverFooterBaseProps = DistributiveOmit<TeachingPopoverFooterProps, 'primary' | 'secondary'>;

/**
 * Base state intentionally omits the `primary` / `secondary` slot and `appearance` —
 * those are Button-styling concerns layered on by the styled hook.
 */
export type TeachingPopoverFooterBaseState = ComponentState<Pick<TeachingPopoverFooterSlots, 'root'>> & {
  footerLayout?: 'horizontal' | 'vertical';
  handleButtonClick: (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => void;
};
