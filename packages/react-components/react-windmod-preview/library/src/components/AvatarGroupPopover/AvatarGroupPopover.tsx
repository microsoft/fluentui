'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import {
  renderAvatarGroupPopover,
  useAvatarGroupContext,
  useAvatarGroupPopover,
} from '@fluentui/react-headless-components-preview/avatar-group';
import { MoreHorizontalRegular } from '@fluentui/react-icons/headless/svg/more-horizontal';

import { PopoverLookProvider } from '../Popover/PopoverContext';
import { resolvePopoverArrow } from '../Popover/popoverArrow';
import { PopoverSurface } from '../PopoverSurface';
import { Tooltip } from '../Tooltip';
import type { AvatarGroupPopoverProps } from './AvatarGroupPopover.types';
import { useAvatarGroupPopoverStyles } from './useAvatarGroupPopoverStyles';

/** Griffel pins the overflowed items to a single size regardless of the group's own. */
const OVERFLOW_ITEM_SIZE = 24;

/**
 * An AvatarGroupPopover holds the members of an AvatarGroup that do not fit inline, behind a
 * counting trigger button. Windmod AvatarGroupPopover: the headless popover decorated with the
 * Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const AvatarGroupPopover = (props: AvatarGroupPopoverProps): JSXElement => {
  // Not wrapped in forwardRef, so the parameter list is part of the emitted public signature —
  // see Popover.tsx.
  const size = useAvatarGroupContext(ctx => ctx.size) ?? 32;
  const layout = useAvatarGroupContext(ctx => ctx.layout);

  // The indicator default is size-keyed and the headless base defaults to `count` unconditionally,
  // so the resolved value is passed in rather than corrected afterwards.
  const indicator = props.indicator ?? (size < 24 ? 'icon' : 'count');

  // The headless hook ASSIGNS the string '...' to the trigger's children when it finds them
  // nullish, so the default glyph has to be materialised before the hook rather than restored
  // after it. Gated on the state actually wanting a glyph: an unconditional materialisation would
  // put an empty slot in front of the count.
  const supplied = slot.resolveShorthand(props.triggerButton);
  const triggerButton =
    layout !== 'pie' && indicator === 'icon'
      ? { ...supplied, children: supplied?.children ?? <MoreHorizontalRegular /> }
      : props.triggerButton;

  const base = useAvatarGroupPopover({ ...props, indicator, triggerButton });

  // renderAvatarGroupPopover hardcodes the headless Popover, which is not a slot and cannot be
  // swapped; the two things the windmod Popover adds are recovered instead. The look context is
  // the only channel by which the surface learns its size, and the arrow geometry is the shared
  // helper the windmod Popover itself calls.
  const look = React.useMemo(() => ({ size: 'small' as const }), []);

  // The headless popover context publishes `isOverflow` alone. Griffel also pins the overflowed
  // items' size, and without it every overflow row would fall back to the group default.
  const avatarGroup = React.useMemo(() => ({ isOverflow: true, size: OVERFLOW_ITEM_SIZE }) as const, []);

  return (
    <PopoverLookProvider value={look}>
      {renderAvatarGroupPopover(
        useAvatarGroupPopoverStyles({
          ...base,
          // eslint-disable-next-line @typescript-eslint/no-deprecated -- reading base.components to keep every other slot's element type
          components: { ...base.components, popoverSurface: PopoverSurface, tooltip: Tooltip },
          // Both slots are re-created with the windmod element types rather than swapped in
          // `components` alone — see Combobox.tsx.
          popoverSurface: slot.always({ ...base.popoverSurface }, { elementType: PopoverSurface }),
          tooltip: slot.always({ ...base.tooltip }, { elementType: Tooltip }),
          popover: {
            ...base.popover,
            ...resolvePopoverArrow(base.popover.positioning, base.popover.withArrow ?? false, 'small'),
          },
          size,
        }),
        { avatarGroup },
      )}
    </PopoverLookProvider>
  );
};

AvatarGroupPopover.displayName = 'AvatarGroupPopover';
