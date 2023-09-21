import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
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
import { useBadge_unstable } from '../Badge/index';
import type { PresenceBadgeProps, PresenceBadgeState } from './PresenceBadge.types';

const iconMap = (status: PresenceBadgeState['status'], outOfOffice: boolean, size: PresenceBadgeState['size']) => {
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

const DEFAULT_STRINGS = {
  busy: 'busy',
  'out-of-office': 'out of office',
  away: 'away',
  available: 'available',
  offline: 'offline',
  'do-not-disturb': 'do not disturb',
  unknown: 'unknown',
  blocked: 'blocked',
};

/**
 * Returns the props and state required to render the component
 */
export const usePresenceBadge_unstable = (
  props: PresenceBadgeProps,
  ref: React.Ref<HTMLElement>,
): PresenceBadgeState => {
  const { size = 'medium', status = 'available', outOfOffice = false } = props;

  const statusText = DEFAULT_STRINGS[status];
  const oofText = props.outOfOffice && props.status !== 'out-of-office' ? ` ${DEFAULT_STRINGS['out-of-office']}` : '';

  const IconElement = iconMap(status, outOfOffice, size);

  const state: PresenceBadgeState = {
    ...useBadge_unstable(
      {
        'aria-label': statusText + oofText,
        role: 'img',
        ...props,
        size,
        icon: slot.optional(props.icon, {
          defaultProps: {
            children: IconElement ? <IconElement /> : null,
          },
          renderByDefault: true,
          elementType: 'span',
        }),
      },
      ref,
    ),
    status,
    outOfOffice,
  };

  return state;
};
