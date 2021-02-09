import * as React from 'react';
import { BadgeProps, BadgeState } from './Badge.types';
import { resolveShorthandProps, makeMergeProps } from '@fluentui/react-utils';
import { useMergedRefs } from '@fluentui/react-hooks';

export const badgeShorthandProps = ['icon'];

const mergeProps = makeMergeProps<BadgeState>({ deepMerge: badgeShorthandProps });

export const useBadge = (props: BadgeProps, ref: React.Ref<HTMLElement>, defaultProps?: BadgeProps): BadgeState => {
  const state = mergeProps(
    {
      as: 'span',
      ref: useMergedRefs(ref, React.useRef<HTMLElement>(null)),
      icon: { as: 'span' },
    },
    defaultProps,
    resolveShorthandProps(props, badgeShorthandProps),
    {
      state: props.state || props.children, // Treat children as state fallback
      children: undefined,
    },
  );

  return state;
};
