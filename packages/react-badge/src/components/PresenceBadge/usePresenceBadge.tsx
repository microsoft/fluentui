import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import { useBadge } from '../Badge/index';
import {
  SkypeMinusIcon,
  SkypeClockIcon,
  SkypeArrowIcon,
  SkypeCheckIcon,
  CancelIcon,
} from './DefaultPresenceBadgeIcons';
import type { PresenceBadgeProps, PresenceBadgeState, PresenceBadgeStatus } from './PresenceBadge.types';

const iconMap: (outOfOffice: boolean) => Record<PresenceBadgeStatus, JSX.Element | null> = outOfOffice => ({
  busy: null,
  available: outOfOffice ? <SkypeArrowIcon /> : <SkypeCheckIcon />,
  away: outOfOffice ? <SkypeArrowIcon /> : <SkypeClockIcon />,
  offline: <CancelIcon />,
  outOfOffice: <SkypeArrowIcon />,
  doNotDisturb: <SkypeMinusIcon />,
});

/**
 * Returns the props and state required to render the component
 */
export const usePresenceBadge = (props: PresenceBadgeProps, ref: React.Ref<HTMLElement>): PresenceBadgeState => {
  const state: PresenceBadgeState = {
    ...useBadge(
      {
        size: 'small',
        ...props,
        icon: resolveShorthand(props.icon, {
          required: true,
        }),
      },
      ref,
    ),
    status: props.status ?? 'available',
    outOfOffice: props.outOfOffice ?? false,
  };

  if (!state.icon?.children) {
    state.icon!.children = iconMap(state.outOfOffice)[state.status];
  }

  return state;
};
