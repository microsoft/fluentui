import * as React from 'react';
import { BadgeProps, BadgeState } from './Badge.types';
import { getSlots, resolveShorthandProps, mergeProps } from '@fluentui/react-compose/lib/next/index';
import { useMergedRefs } from '@uifabric/react-hooks';

export const badgeShorthandProps: (keyof BadgeProps)[] = ['icon'];

export const renderBadge = (state: BadgeState) => {
  const { slots, slotProps } = getSlots(state, badgeShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <slots.icon {...slotProps.icon} />
    </slots.root>
  );
};

export const useBadge = (props: BadgeProps, ref: React.Ref<HTMLElement>, defaultProps?: BadgeProps) => {
  const state = mergeProps(
    {
      as: 'span',
      ref: useMergedRefs(ref, React.useRef()),
      icon: { as: 'span' },
    },
    defaultProps,
    resolveShorthandProps(props, badgeShorthandProps),
    {
      state: props.state || props.children, // Treat children as state fallback
      children: undefined,
    },
  );

  return { state, render: renderBadge };
};
