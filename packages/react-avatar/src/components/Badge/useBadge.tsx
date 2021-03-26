import * as React from 'react';
import { BadgeProps, badgeShorthandProps, BadgeState } from './Badge.types';
import { resolveShorthandProps, makeMergeProps } from '@fluentui/react-utilities';

const mergeProps = makeMergeProps<BadgeState>({ deepMerge: badgeShorthandProps });

export const useBadge = (props: BadgeProps, ref: React.Ref<HTMLElement>, defaultProps?: BadgeProps): BadgeState => {
  const state = mergeProps(
    {
      as: 'span',
      ref,
      icon: { as: 'span' },
    },
    defaultProps && resolveShorthandProps(defaultProps, badgeShorthandProps),
    resolveShorthandProps(props, badgeShorthandProps),
    {
      state: props.state || (props.children as BadgeProps['state']), // Treat children as state fallback
      children: undefined,
    },
  );

  return state;
};
