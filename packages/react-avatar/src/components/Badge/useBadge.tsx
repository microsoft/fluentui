import * as React from 'react';
import { BadgeProps } from './Badge.types';
import { resolveShorthandProps, makeMergeProps } from '@fluentui/react-compose/lib/next/index';
import { useMergedRefs } from '@uifabric/react-hooks';

export const badgeShorthandProps: (keyof BadgeProps)[] = ['icon'];

const mergeProps = makeMergeProps({ deepMerge: badgeShorthandProps });

export const useBadge = (props: BadgeProps, ref: React.Ref<HTMLElement>, defaultProps?: BadgeProps) => {
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
