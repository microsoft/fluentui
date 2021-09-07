import * as React from 'react';
import { useSwitchState } from './useSwitchState';
import { resolveShorthandProps, makeMergeProps } from '@fluentui/react-utilities';
import type { SwitchProps, SwitchState } from './Switch.types';

/**
 * Array of all shorthand properties listed in SwitchShorthandProps
 */
export const switchShorthandProps = [] as const;

const mergeProps = makeMergeProps<SwitchState>({ deepMerge: switchShorthandProps });

/**
 * Given user props, returns state and render function for a Switch.
 */
export const useSwitch = (props: SwitchProps, ref: React.Ref<HTMLElement>): SwitchState => {
  const state = mergeProps(
    {
      ref,
    },
    resolveShorthandProps(props, switchShorthandProps),
  );

  useSwitchState(state);

  return state;
};
