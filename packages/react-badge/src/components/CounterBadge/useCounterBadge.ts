import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { CounterBadgeProps, CounterBadgeState } from './CounterBadge.types';

/**
 * Consts listing which props are shorthand props.
 */
export const counterBadgeShorthandProps: string[] = ['icon'];

const mergeProps = makeMergeProps<CounterBadgeState>({ deepMerge: counterBadgeShorthandProps });

/**
 * Returns the props and state required to render the component
 */
export const useCounterBadge = (
  props: CounterBadgeProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: CounterBadgeProps,
): CounterBadgeState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      shape: 'circular',
      size: 'medium',
      iconPosition: 'before',
      showZero: true,
      overflowCount: 99,
      count: 0,
    },
    defaultProps,
    resolveShorthandProps(props, counterBadgeShorthandProps),
  );

  return state;
};
