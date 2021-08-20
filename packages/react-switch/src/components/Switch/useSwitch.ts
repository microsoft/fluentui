import * as React from 'react';
import { resolveShorthand, useId } from '@fluentui/react-utilities';
import { Label } from '@fluentui/react-label';
import { SwitchProps, SwitchSlots, SwitchState } from './Switch.types';
import { useSwitchState } from './useSwitchState';

/**
 * Array of all shorthand properties listed in switchShorthandProps
 */
export const switchShorthandProps: Array<keyof SwitchSlots> = [
  'switchWrapper',
  'track',
  'thumbWrapper',
  'thumb',
  'input',
];

/**
 * Given user props, returns state and render function for a Switch.
 */
export const useSwitch = (props: SwitchProps, ref: React.Ref<HTMLElement>): SwitchState => {
  const state: SwitchState = {
    ref,
    id: useId('switch-'),
    labelPosition: 'after',
    ...props,
    components: {
      root: props.children !== undefined ? Label : 'div',
      input: 'input',
    },
    switchWrapper: resolveShorthand(props.switchWrapper, { required: true }),
    track: resolveShorthand(props.track, { required: true }),
    thumbWrapper: resolveShorthand(props.thumbWrapper, { required: true }),
    thumb: resolveShorthand(props.thumb, { required: true }),
    input: resolveShorthand(props.input, { required: true }),
  };

  useSwitchState(state);

  return state;
};
