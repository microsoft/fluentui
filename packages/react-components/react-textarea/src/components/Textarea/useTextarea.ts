import * as React from 'react';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { getPartitionedNativeProps, useControllableState, useEventCallback, slot } from '@fluentui/react-utilities';
import type { TextareaProps, TextareaState } from './Textarea.types';
import { useOverrides_unstable as useOverrides } from '@fluentui/react-shared-contexts';

/**
 * Create the state required to render Textarea.
 *
 * The returned state can be modified with hooks such as useTextareaStyles_unstable,
 * before being passed to renderTextarea_unstable.
 *
 * @param props - props from this instance of Textarea
 * @param ref - reference to root HTMLElement of Textarea
 */
export const useTextarea_unstable = (props: TextareaProps, ref: React.Ref<HTMLTextAreaElement>): TextareaState => {
  // Merge props from surrounding <Field>, if any
  props = useFieldControlProps_unstable(props, { supportsLabelFor: true, supportsRequired: true, supportsSize: true });

  const overrides = useOverrides();

  const {
    size = 'medium',
    appearance = overrides.inputDefaultAppearance ?? 'outline',
    resize = 'none',
    onChange,
  } = props;

  if (
    process.env.NODE_ENV !== 'production' &&
    (appearance === 'filled-darker-shadow' || appearance === 'filled-lighter-shadow')
  ) {
    // eslint-disable-next-line no-console
    console.error(
      "The 'filled-darker-shadow' and 'filled-lighter-shadow' appearances are deprecated and will be removed in the" +
        ' future.',
    );
  }

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

  const state: TextareaState = {
    size,
    appearance,
    resize,
    components: {
      root: 'span',
      textarea: 'textarea',
    },
    textarea: slot.always(props.textarea, {
      defaultProps: {
        ref,
        ...nativeProps.primary,
      },
      elementType: 'textarea',
    }),
    root: slot.always(props.root, {
      defaultProps: nativeProps.root,
      elementType: 'span',
    }),
  };

  state.textarea.value = value;
  state.textarea.onChange = useEventCallback(ev => {
    const newValue = ev.target.value;
    onChange?.(ev, { value: newValue });
    setValue(newValue);
  });

  return state;
};
