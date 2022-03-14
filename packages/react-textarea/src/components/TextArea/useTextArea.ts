import * as React from 'react';
import {
  getPartitionedNativeProps,
  resolveShorthand,
  useControllableState,
  useEventCallback,
} from '@fluentui/react-utilities';
import type { TextAreaProps, TextAreaState } from './TextArea.types';

/**
 * Create the state required to render TextArea.
 *
 * The returned state can be modified with hooks such as useTextAreaStyles_unstable,
 * before being passed to renderTextArea_unstable.
 *
 * @param props - props from this instance of TextArea
 * @param ref - reference to root HTMLElement of TextArea
 */
export const useTextArea_unstable = (props: TextAreaProps, ref: React.Ref<HTMLTextAreaElement>): TextAreaState => {
  const { size = 'medium', appearance = 'outline', resize = 'none', onChange } = props;

  const [value, setValue] = useControllableState({
    state: props.value,
    defaultState: props.defaultValue,
    initialState: undefined,
  });

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'textarea',
    excludedPropNames: ['onChange', 'value', 'defaultValue'],
  });

  const state: TextAreaState = {
    size,
    appearance,
    resize,
    components: {
      root: 'span',
      textArea: 'textarea',
    },
    textArea: resolveShorthand(props.textArea, {
      required: true,
      defaultProps: {
        ref,
        ...nativeProps.primary,
      },
    }),
    root: resolveShorthand(props.root, {
      required: true,
      defaultProps: nativeProps.root,
    }),
  };

  state.textArea.value = value;
  state.textArea.onChange = useEventCallback(ev => {
    const newValue = ev.target.value;
    onChange?.(ev, { value: newValue });
    setValue(newValue);
  });

  return state;
};
