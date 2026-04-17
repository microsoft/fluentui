'use client';

import type * as React from 'react';
import { useBadgeBase_unstable } from '@fluentui/react-badge';

import type { BadgeProps, BadgeState } from './Badge.types';

/**
 * Returns the state for a Badge component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderBadge`.
 */
export const useBadge = (props: BadgeProps, ref: React.Ref<HTMLDivElement>): BadgeState => {
  'use no memo';

  const state: BadgeState = useBadgeBase_unstable(props, ref);

  // Set data-icon-position only when an icon slot is present.
  state.root['data-icon-position'] = state.icon ? state.iconPosition : undefined;

  return state;
};
