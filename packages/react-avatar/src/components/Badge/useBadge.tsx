import * as React from 'react';
import { BadgeProps, BadgeState } from './Badge.types';
import { resolveShorthandProps, makeMergeProps, useMergedRefs } from '@fluentui/react-utilities';

export const badgeShorthandProps: (keyof BadgeProps)[] = ['icon'];

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
