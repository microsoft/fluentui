'use client';

import type * as React from 'react';
import { useFieldControlProps_unstable, useFieldContext_unstable } from '@fluentui/react-field';
import { useControllableState, useEventCallback, slot } from '@fluentui/react-utilities';
import type { InputBaseProps, InputBaseState, InputProps, InputState } from './Input.types';
import { useOverrides_unstable as useOverrides } from '@fluentui/react-shared-contexts';

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
  const overrides = useOverrides();
  const fieldContext = useFieldContext_unstable();

  const {
    size = fieldContext?.size ?? 'medium',
    appearance = overrides.inputDefaultAppearance ?? 'outline',
    ...baseProps
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

  const state = useInputBase_unstable(baseProps, ref);

  return {
    size,
    appearance,
    ...state,
  };
};

/**
 * Base hook for Input component, which manages state related to controlled/uncontrolled value,
 * slot structure, and onChange handling. This hook excludes design-specific props (appearance, size).
 *
 * @param props - User provided props to the Input component.
 * @param ref - User provided ref to be passed to the Input component.
 */
export const useInputBase_unstable = (props: InputBaseProps, ref: React.Ref<HTMLInputElement>): InputBaseState => {
  const fieldControlProps = useFieldControlProps_unstable(props, {
    supportsLabelFor: true,
    supportsRequired: true,
  });

  // `className` and `style` go to the root slot, all other native props go to the primary `input` slot.
  const {
    className,
    style,
    root,
    input,
    contentBefore,
    contentAfter,
    value: valueFromProps,
    defaultValue,
    onChange,
    ...inputProps
  } = fieldControlProps;

  const [value, setValue] = useControllableState({
    state: valueFromProps,
    defaultState: defaultValue,
    initialState: '',
  });

  const state: InputBaseState = {
    components: {
      root: 'span',
      input: 'input',
      contentBefore: 'span',
      contentAfter: 'span',
    },
    input: slot.always(input, {
      defaultProps: {
        type: 'text',
        ref,
        ...inputProps,
      },
      elementType: 'input',
    }),
    contentAfter: slot.optional(contentAfter, { elementType: 'span' }),
    contentBefore: slot.optional(contentBefore, { elementType: 'span' }),
    root: slot.always(root, {
      defaultProps: { className, style },
      elementType: 'span',
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
