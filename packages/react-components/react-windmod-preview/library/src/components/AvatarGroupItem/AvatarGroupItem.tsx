'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderAvatarGroupItem,
  useAvatarGroupContext,
  useAvatarGroupItem,
} from '@fluentui/react-headless-components-preview/avatar-group';

import { Avatar } from '../Avatar';
import type { AvatarGroupItemProps } from './AvatarGroupItem.types';
import { useAvatarGroupItemStyles } from './useAvatarGroupItemStyles';

/**
 * An AvatarGroupItem is one member of an AvatarGroup, rendered as a coin inline or as a named row
 * inside the overflow popover. Windmod AvatarGroupItem: the headless item decorated with the
 * Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const AvatarGroupItem: ForwardRefComponent<AvatarGroupItemProps> = React.forwardRef(
  // Look props belong to windmod — the headless hook neither accepts nor resolves them, and its
  // types explicitly omit these two. Defaults mirror @fluentui/react-avatar's styled
  // useAvatarGroupItem. `avatar` stays in `rest`: the headless base hook forwards it into the
  // avatar slot rather than onto the root, so lifting it out would drop a consumer's shorthand.
  ({ color = 'colorful', idForColor, ...rest }, ref) => {
    // The group publishes its size on the context; the fallback matches Griffel's own constant.
    const size = useAvatarGroupContext(ctx => ctx.size) ?? 32;
    const base = useAvatarGroupItem(rest, ref);

    // The avatar slot is re-created with the windmod element type — see Persona.tsx for what the
    // headless Avatar cannot carry, and Combobox.tsx for why the components swap alone is not
    // enough. The look defaults sit ahead of the resolved slot so consumer props still win.
    return renderAvatarGroupItem(
      useAvatarGroupItemStyles({
        ...base,
        // eslint-disable-next-line @typescript-eslint/no-deprecated -- reading base.components to keep every other slot's element type
        components: { ...base.components, avatar: Avatar },
        avatar: slot.always({ size, color, idForColor, ...base.avatar }, { elementType: Avatar }),
        size,
      }),
    );
  },
  // Casting is required due to lack of distributive union to support union on @types/react
) as ForwardRefComponent<AvatarGroupItemProps>;

AvatarGroupItem.displayName = 'AvatarGroupItem';
