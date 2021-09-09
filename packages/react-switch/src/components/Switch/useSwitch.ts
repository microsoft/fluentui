import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import { useSwitchState } from './useSwitchState';
import type { SwitchProps, SwitchSlots, SwitchState } from './Switch.types';

/**
 * Array of all shorthand properties listed in SwitchSlots
 */
export const switchShorthandProps: (keyof SwitchSlots)[] = ['root', 'track', 'thumbWrapper', 'thumb', 'input'];

/**
 * Given user props, returns state and render function for a Switch.
 */
export const useSwitch = (props: SwitchProps, ref: React.Ref<HTMLElement>): SwitchState => {
  const { track, thumbWrapper, thumb, input, defaultChecked, checked, disabled, onChange } = props;
  const state: SwitchState = {
    defaultChecked,
    checked,
    disabled,
    onChange,
    root: getNativeElementProps('span', {
      ref,
      ...props,
      id: useId('switch-', props.id),
    }),
    components: {
      input: 'input',
    },
    track: resolveShorthand(track, { required: true }),
    thumbWrapper: resolveShorthand(thumbWrapper, { required: true }),
    thumb: resolveShorthand(thumb, { required: true }),
    input: resolveShorthand(input, {
      required: true,
      defaultProps: {
        type: 'checkbox',
      },
    }),
  };

  useSwitchState(state);

  return state;
};
