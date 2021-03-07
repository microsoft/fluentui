import * as React from 'react';
import { makeMergeProps } from '@fluentui/react-utilities';
import { PresenceBadgeProps, PresenceBadgeState } from './PresenceBadge.types';
import { useBadge, BadgeProps } from '../Badge/index';

/**
 * Consts listing which props are shorthand props.
 */
export const presenceBadgeShorthandProps: (keyof PresenceBadgeProps)[] = ['icon'];

const mergeProps = makeMergeProps<PresenceBadgeState>({ deepMerge: presenceBadgeShorthandProps });

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
      },
      defaultProps,
    ) as BadgeProps,
  ) as PresenceBadgeState;

  return state;
};
