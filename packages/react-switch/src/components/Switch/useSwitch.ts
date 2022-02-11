import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import { useSwitchState } from './useSwitchState';
import type { SwitchProps, SwitchState, SwitchRender } from './Switch.types';

/**
 * Given user props, returns state and render function for a Switch.
 */
export const useSwitch_unstable = (props: SwitchProps, ref: React.Ref<HTMLElement>): [SwitchState, SwitchRender] => {
  const { track, thumbWrapper, thumb, activeRail, input, defaultChecked, checked, disabled, onChange } = props;
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
      root: 'div',
      track: 'div',
      thumbWrapper: 'div',
      thumb: 'div',
      activeRail: 'div',
      input: 'input',
    },
    track: resolveShorthand(track, { required: true }),
    thumbWrapper: resolveShorthand(thumbWrapper, { required: true }),
    thumb: resolveShorthand(thumb, { required: true }),
    activeRail: resolveShorthand(activeRail, { required: true }),
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
