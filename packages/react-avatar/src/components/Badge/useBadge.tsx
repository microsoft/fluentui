import * as React from 'react';
import { StatusProps, StatusState } from './Status.types';
import { getSlots, resolveShorthandProps, mergeProps } from '@fluentui/react-compose/lib/next/index';
import { useMergedRefs } from '@uifabric/react-hooks';

export const statusShorthandProps: (keyof StatusProps)[] = ['icon'];

export const renderStatus = (state: StatusState) => {
  const { slots, slotProps } = getSlots(state, statusShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <slots.icon {...slotProps.icon} />
    </slots.root>
  );
};

export const useStatus = (props: StatusProps, ref: React.Ref<HTMLElement>, defaultProps?: StatusProps) => {
  const state = mergeProps(
    {
      as: 'span',
      ref: useMergedRefs(ref, React.useRef()),
      icon: { as: 'span' },
    },
    defaultProps,
    resolveShorthandProps(props, statusShorthandProps),
    {
      state: props.state || props.children, // Treat children as state fallback
      children: undefined,
    },
  );

  return { state, render: renderStatus };
};
