import * as React from 'react';
import { getPartitionedNativeProps, resolveShorthand, useControllableState } from '@fluentui/react-utilities';
import type { SwitchProps, SwitchState } from './Switch.types';

/**
 * Create the state required to render Switch.
 *
 * The returned state can be modified with hooks such as useSwitchStyles_unstable,
 * before being passed to renderSwitch_unstable.
 *
 * @param props - props from this instance of Switch
 * @param ref - reference to `<input>` element of Switch
 */
export const useSwitch_unstable = (props: SwitchProps, ref: React.Ref<HTMLInputElement>): SwitchState => {
  const { checked: controlledChecked, defaultChecked, input, onChange, root, thumb, track } = props;

  const [checked, setChecked] = useControllableState({
    defaultState: defaultChecked,
    state: controlledChecked,
    initialState: false,
  });

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['checked', 'defaultChecked', 'onChange'],
  });

  const rootShorthand = resolveShorthand(root, {
    defaultProps: nativeProps.root,
    required: true,
  });
  const inputShorthand = resolveShorthand(input, {
    defaultProps: {
      checked,
      onChange: React.useCallback(
        ev => {
          const newChecked = ev.currentTarget.checked;
          onChange?.(ev, { checked: newChecked });
          setChecked(newChecked);
        },
        [onChange, setChecked],
      ),
      ref,
      type: 'checkbox',
      ...nativeProps.primary,
    },
    required: true,
  });
  const thumbShorthand = resolveShorthand(thumb, { required: true });
  const trackShorthand = resolveShorthand(track, { required: true });

  return {
    // State calculated from a set of props
    checked,

    //Slots definition
    components: {
      root: 'div',
      input: 'input',
      thumb: 'div',
      track: 'div',
    },

    root: rootShorthand,
    input: inputShorthand,
    thumb: thumbShorthand,
    track: trackShorthand,
  };
};
