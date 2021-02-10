import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utils';
import { useMergedRefs } from '@fluentui/react-hooks';
import { BadgeProps } from './Badge.types';

export const badgeShorthandProps = [];

const mergeProps = makeMergeProps({ deepMerge: badgeShorthandProps });

export const useBadge = (props: BadgeProps, ref: React.Ref<HTMLElement>, defaultProps?: BadgeProps) => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      circular: true,
      size: 'medium',
    },
    defaultProps,
    resolveShorthandProps(props, badgeShorthandProps),
  );

  return state;
};
