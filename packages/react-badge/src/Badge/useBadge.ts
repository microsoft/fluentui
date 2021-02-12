import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utils';
import { useMergedRefs } from '@fluentui/react-hooks';
import { BadgeProps, BadgeState } from './Badge.types';

export const badgeShorthandProps = ['icon'];

const mergeProps = makeMergeProps<BadgeState>({ deepMerge: badgeShorthandProps });

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
