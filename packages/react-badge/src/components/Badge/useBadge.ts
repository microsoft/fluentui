import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { BadgeProps, BadgeState } from './Badge.types';

/**
 * Consts listing which props are shorthand props.
 */
export const badgeShorthandProps: (keyof BadgeProps)[] = ['icon'];

const mergeProps = makeMergeProps<BadgeState>({ deepMerge: badgeShorthandProps });

/**
 * Returns the props and state required to render the component
 */
export const useBadge = (props: BadgeProps, ref: React.Ref<HTMLElement>, defaultProps?: BadgeProps): BadgeState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      shape: 'circular',
      size: 'medium',
      iconPosition: 'before',
      'aria-hidden': true,
    },
    defaultProps,
    resolveShorthandProps(props, badgeShorthandProps),
  );

  return state;
};
