import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utils';
import { useMergedRefs } from '@fluentui/react-hooks';
import { BadgeProps, BadgeState } from './Badge.types';

/**
 * Consts listing which props are shorthand props.
 */
export const badgeShorthandProps: (keyof BadgeProps)[] = ['icon'];

const mergeProps = makeMergeProps<BadgeState>({ deepMerge: badgeShorthandProps });

/**
 * Given user props, returns state and render function for a Badge.
 */
export const useBadge = (props: BadgeProps, ref: React.Ref<HTMLElement>, defaultProps?: BadgeProps): BadgeState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      shape: 'circular',
      size: 'medium',
      icon: { size: props.size },
      iconPosition: 'before',
    },
    defaultProps,
    resolveShorthandProps(props, badgeShorthandProps),
  );

  return state;
};
