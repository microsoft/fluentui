'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderAvatarGroup, useAvatarGroup } from '@fluentui/react-headless-components-preview/avatar-group';

import type { AvatarGroupProps } from './AvatarGroup.types';
import { useAvatarGroupStyles } from './useAvatarGroupStyles';

/**
 * An AvatarGroup displays a set of people or entities as a spread, stack or pie of Avatars.
 * Windmod AvatarGroup: the headless avatar group decorated with the Fluent visual contract
 * (Tailwind v4 + CSS Modules).
 */
export const AvatarGroup: ForwardRefComponent<AvatarGroupProps> = React.forwardRef(
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-avatar's styled useAvatarGroup.
  ({ size = 32, ...rest }, ref) => {
    const state = useAvatarGroup(rest, ref);

    // The headless context value carries `layout` alone; both the items and the overflow trigger
    // pick their whole size ladder off `size`, so windmod publishes its own value in place of
    // useAvatarGroupContextValues.
    const avatarGroup = React.useMemo(() => ({ layout: state.layout, size }), [state.layout, size]);

    const styled = useAvatarGroupStyles({ ...state, size });

    return renderAvatarGroup(styled, { avatarGroup });
  },
);

AvatarGroup.displayName = 'AvatarGroup';
