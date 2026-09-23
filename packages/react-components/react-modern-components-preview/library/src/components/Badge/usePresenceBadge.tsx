'use client';

import * as React from 'react';
import { usePresenceBadge as usePresenceBadgeBase } from '@fluentui/react-headless-components-preview/badge';
import type { PresenceBadgeProps, PresenceBadgeState } from './PresenceBadge.types';
import {
  presenceAvailableFilled,
  presenceAvailableRegular,
  presenceAwayFilled,
  presenceBlockedRegular,
  presenceBusyFilled,
  presenceDndFilled,
  presenceDndRegular,
  presenceOfflineRegular,
  presenceOofRegular,
  presenceUnknownRegular,
} from './presenceIcons';

const getIcon = (state: Pick<PresenceBadgeState, 'outOfOffice' | 'size' | 'status'>) => {
  const { outOfOffice, size, status } = state;

  switch (status) {
    case 'available':
      return outOfOffice ? presenceAvailableRegular[size] : presenceAvailableFilled[size];
    case 'away':
      return outOfOffice ? presenceOofRegular[size] : presenceAwayFilled[size];
    case 'blocked':
      return presenceBlockedRegular[size];
    case 'busy':
      return outOfOffice ? presenceUnknownRegular[size] : presenceBusyFilled[size];
    case 'do-not-disturb':
      return outOfOffice ? presenceDndRegular[size] : presenceDndFilled[size];
    case 'offline':
      return outOfOffice ? presenceOofRegular[size] : presenceOfflineRegular[size];
    case 'out-of-office':
      return presenceOofRegular[size];
    case 'unknown':
      return presenceUnknownRegular[size];
  }
};

export const usePresenceBadge = (props: PresenceBadgeProps, ref: React.Ref<HTMLDivElement>): PresenceBadgeState => {
  const { size = 'medium', ...rest } = props;
  const state = usePresenceBadgeBase(rest, ref);
  const Icon = getIcon({ ...state, size });

  if (state.icon) {
    state.icon.children ??= <Icon />;
  }

  return {
    ...state,
    root: {
      ...state.root,
      'data-size': size,
    },
    size,
  };
};
