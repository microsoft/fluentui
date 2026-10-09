import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type {
  AvatarGroupPopoverPopoverProps,
  AvatarGroupPopoverProps as AvatarGroupPopoverHeadlessProps,
  AvatarGroupPopoverSlots as AvatarGroupPopoverHeadlessSlots,
  AvatarGroupPopoverState as AvatarGroupPopoverHeadlessState,
} from '@fluentui/react-headless-components-preview/avatar-group';

import type { AvatarSize } from '../Avatar';
import type { PopoverSurface } from '../PopoverSurface';
import type { Tooltip } from '../Tooltip';

export type { AvatarGroupPopoverPopoverProps };

/**
 * The headless slots type the surface and the tooltip against the headless components, which
 * carry none of the look props windmod's add — see PersonaSlots.
 */
export type AvatarGroupPopoverSlots = Omit<AvatarGroupPopoverHeadlessSlots, 'popoverSurface' | 'tooltip'> & {
  popoverSurface: NonNullable<Slot<typeof PopoverSurface>>;
  tooltip: NonNullable<Slot<typeof Tooltip>>;
};

/**
 * Windmod AvatarGroupPopover props: the slot props re-derived from the swapped slots, plus the
 * headless behaviour props unchanged. The overflow trigger's look is selected entirely by the
 * group's size, which arrives on the context, so no new look prop is declared here. Re-exporting
 * the headless props instead would type the tooltip shorthand against the headless Tooltip, which
 * omits `appearance` — see PersonaProps.
 */
export type AvatarGroupPopoverProps = Omit<ComponentProps<Partial<AvatarGroupPopoverSlots>>, 'children'> &
  AvatarGroupPopoverPopoverProps &
  Pick<AvatarGroupPopoverHeadlessProps, 'children' | 'count' | 'indicator'>;

/** Windmod AvatarGroupPopover state: headless state plus the size read off the group context. */
export type AvatarGroupPopoverState = ComponentState<AvatarGroupPopoverSlots> &
  Pick<AvatarGroupPopoverHeadlessState, 'count' | 'indicator' | 'layout' | 'popover' | 'popoverOpen'> & {
    size: AvatarSize;
  };
