import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import {
  PresenceAvailableFilled,
  PresenceAvailableRegular,
  PresenceAwayFilled,
  PresenceBlockedRegular,
  PresenceBusyFilled,
  PresenceDndFilled,
  PresenceDndRegular,
  PresenceOfflineRegular,
  PresenceOofRegular,
  PresenceUnknownRegular,
} from '@fluentui/react-icons';

import { useBadge_unstable } from '../Badge/index';
import type { PresenceBadgeProps, PresenceBadgeState } from './PresenceBadge.types';

const iconMap = (status: PresenceBadgeState['status'], outOfOffice: boolean, size: PresenceBadgeState['size']) => {
  switch (status) {
    case 'available':
      return outOfOffice ? PresenceAvailableRegular : PresenceAvailableFilled;
    case 'away':
      return outOfOffice ? PresenceOofRegular : PresenceAwayFilled;
    case 'blocked':
      return PresenceBlockedRegular;
    case 'busy':
      return outOfOffice ? PresenceUnknownRegular : PresenceBusyFilled;
    case 'do-not-disturb':
      return outOfOffice ? PresenceDndRegular : PresenceDndFilled;
    case 'offline':
      return outOfOffice ? PresenceOofRegular : PresenceOfflineRegular;
    case 'out-of-office':
      return PresenceOofRegular;
    case 'unknown':
      return PresenceUnknownRegular;
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
