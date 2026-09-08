'use client';

import type * as React from 'react';
import { usePresenceBadgeBase_unstable } from '@fluentui/react-badge';

import { toDataAttributeValue } from '../../../utils';
import type { PresenceBadgeProps, PresenceBadgeState } from './PresenceBadge.types';

/**
 * Returns the state for a PresenceBadge component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderPresenceBadge`.
 */
export const usePresenceBadge = (props: PresenceBadgeProps, ref: React.Ref<HTMLDivElement>): PresenceBadgeState => {
  const state = usePresenceBadgeBase_unstable(props, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-status': state.status,
      'data-out-of-office': toDataAttributeValue(state.outOfOffice),
    },
  };
};
