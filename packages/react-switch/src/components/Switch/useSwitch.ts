import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { SwitchProps, SwitchShorthandProps, SwitchState } from './Switch.types';

/**
 * Array of all shorthand properties listed in SwitchShorthandProps
 */
export const switchShorthandProps: SwitchShorthandProps[] = [
  /* TODO add shorthand property names */
];

const mergeProps = makeMergeProps<SwitchState>({ deepMerge: switchShorthandProps });

/**
 * Create the state required to render Switch.
 *
 * The returned state can be modified with hooks such as useSwitchStyles,
 * before being passed to renderSwitch.
 *
 * @param props - props from this instance of Switch
 * @param ref - reference to root HTMLElement of Switch
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const useSwitch = (props: SwitchProps, ref: React.Ref<HTMLElement>, defaultProps?: SwitchProps): SwitchState => {
  const state = mergeProps(
    {
      ref,
    },
    defaultProps && resolveShorthandProps(defaultProps, switchShorthandProps),
    resolveShorthandProps(props, switchShorthandProps),
  );

  return state;
};
