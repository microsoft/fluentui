import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { CounterBadgeProps, CounterBadgeState } from './CounterBadge.types';
import { useBadge } from '../Badge/index';

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
  const count = 0;
  const overflowCount = 99;
  const state = mergeProps(
    useBadge(props, ref),
    {
      showZero: false,
      overflowCount,
      count,
      dot: false,
      ...(!props.dot && {
        children:
          (props.count || count) > (props.overflowCount || overflowCount) ? `${props.count}+` : `${props.count}`,
      }),
    },

    defaultProps,
    resolveShorthandProps(props, counterBadgeShorthandProps),
  );

  return state;
};
