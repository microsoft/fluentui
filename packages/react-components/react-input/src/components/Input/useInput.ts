import * as React from 'react';
import {
  getPartitionedNativeProps,
  resolveShorthand,
  useControllableState,
  useEventCallback,
} from '@fluentui/react-utilities';
import type { InputProps, InputState } from './Input.types';

/**
 * Create the state required to render Input.
 *
 * The returned state can be modified with hooks such as useInputStyles_unstable,
 * before being passed to renderInput_unstable.
 *
 * @param props - props from this instance of Input
 * @param ref - reference to `<input>` element of Input
 */
export const useInput_unstable = (props: InputProps, ref: React.Ref<HTMLInputElement>): InputState => {
  const { size = 'medium', appearance = 'outline', onChange } = props;

  const [value, setValue] = useControllableState({
    state: props.value,
    defaultState: props.defaultValue,
    initialState: undefined,
  });

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['size', 'onChange', 'value', 'defaultValue'],
  });

  const state: InputState = {
    size,
    appearance,
    components: {
      root: 'span',
      input: 'input',
      contentBefore: 'span',
      contentAfter: 'span',
    },
    input: resolveShorthand(props.input, {
      required: true,
      defaultProps: {
        type: 'text',
        ref,
        ...nativeProps.primary,
      },
    }),
    contentAfter: resolveShorthand(props.contentAfter),
    contentBefore: resolveShorthand(props.contentBefore),
    root: resolveShorthand(props.root, {
      required: true,
      defaultProps: nativeProps.root,
    }),
  };

  state.input.value = value;
  state.input.onChange = useEventCallback(ev => {
    const newValue = ev.target.value;
    onChange?.(ev, { value: newValue });
    setValue(newValue);
  });

  return state;
};
