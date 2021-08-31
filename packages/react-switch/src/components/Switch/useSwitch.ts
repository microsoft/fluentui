import * as React from 'react';
import { resolveShorthandProps, makeMergeProps, useId } from '@fluentui/react-utilities';
import { useSwitchState } from './useSwitchState';
import type { SwitchProps, SwitchShorthandProps, SwitchState } from './Switch.types';

/**
 * Array of all shorthand properties listed in switchShorthandProps
 */
export const switchShorthandProps: SwitchShorthandProps[] = ['track', 'thumbWrapper', 'thumb', 'input'];

/**
 * Given user props, returns state and render function for a Switch.
 */
export const useSwitch = (props: SwitchProps, ref: React.Ref<HTMLElement>, defaultProps?: SwitchProps): SwitchState => {
  const mergeProps = makeMergeProps<SwitchState>({
    deepMerge: switchShorthandProps,
  });

  const state: SwitchState = mergeProps(
    {
      ref,
      id: useId('switch-'),
      as: 'span',
      track: { as: 'div', children: null },
      thumbWrapper: { as: 'div', children: null },
      thumb: { as: 'div', children: null },
      input: { as: 'input', type: 'checkbox', children: null },
    },
    defaultProps && resolveShorthandProps(defaultProps, switchShorthandProps),
    resolveShorthandProps(props, switchShorthandProps),
  );

  useSwitchState(state);

  return state;
};
