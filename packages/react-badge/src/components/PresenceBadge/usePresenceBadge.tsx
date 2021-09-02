import * as React from 'react';
import { makeMergePropsCompat } from '@fluentui/react-utilities';
import { useBadge } from '../Badge/index';
import {
  SkypeMinusIcon,
  SkypeClockIcon,
  SkypeArrowIcon,
  SkypeCheckIcon,
  CancelIcon,
} from './DefaultPresenceBadgeIcons';
import type { PresenceBadgeProps, PresenceBadgeState, PresenceBadgeStatus } from './PresenceBadge.types';
import type { BadgeProps } from '../Badge/index';

/**
 * Consts listing which props are shorthand props.
 */
export const presenceBadgeShorthandPropsCompat: (keyof PresenceBadgeProps)[] = ['icon'];

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<PresenceBadgeState>({ deepMerge: presenceBadgeShorthandPropsCompat });

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
export const usePresenceBadge = (
  props: PresenceBadgeProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: PresenceBadgeProps,
): PresenceBadgeState => {
  const state = useBadge(
    props,
    ref,
    mergeProps(
      {
        size: 'small',
        status: 'available',
        outOfOffice: false,
        icon: { as: 'span' },
      },
      defaultProps,
    ) as BadgeProps,
  ) as PresenceBadgeState;

  if (!state.icon?.children) {
    state.icon!.children = iconMap(state.outOfOffice)[state.status];
  }

  return state;
};
