import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import {
  presenceAvailableFilled,
  presenceAvailableRegular,
  presenceAwayFilled,
  presenceBusyFilled,
  presenceDndFilled,
  presenceDndRegular,
  presenceOfflineRegular,
  presenceOofRegular,
  presenceUnknownRegular,
} from './presenceIcons';
import { useBadge_unstable, BadgeProps } from '../Badge/index';
import type { PresenceBadgeProps, PresenceBadgeState } from './PresenceBadge.types';

const iconMap = (
  status: PresenceBadgeState['status'],
  outOfOffice: boolean,
  size: PresenceBadgeState['size'],
): React.FunctionComponent | null => {
  switch (status) {
    case 'available':
      return outOfOffice ? presenceAvailableRegular[size] : presenceAvailableFilled[size];
    case 'away':
      return outOfOffice ? presenceOfflineRegular[size] : presenceAwayFilled[size];
    case 'busy':
      return outOfOffice ? presenceUnknownRegular[size] : presenceBusyFilled[size];
    case 'doNotDisturb':
      return outOfOffice ? presenceDndRegular[size] : presenceDndFilled[size];
    case 'offline':
      return presenceOfflineRegular[size];
    case 'outOfOffice':
      return presenceOofRegular[size];
    case 'unknown':
      return presenceUnknownRegular[size];
  }
};

/**
 * Returns the props and state required to render the component
 */
export const usePresenceBadge_unstable = (
  props: PresenceBadgeProps,
  ref: React.Ref<HTMLElement>,
): PresenceBadgeState => {
  const state: PresenceBadgeState = {
    ...useBadge_unstable(
      {
        size: 'medium',
        ...props,
        icon: resolveShorthand(undefined as BadgeProps['icon'], {
          required: true,
        }),
      },
      ref,
    ),
    status: props.status ?? 'available',
    outOfOffice: props.outOfOffice ?? false,
  };

  const IconElement = iconMap(state.status, state.outOfOffice, state.size);
  if (IconElement) {
    state.icon!.children = <IconElement />;
  }

  return state;
};
