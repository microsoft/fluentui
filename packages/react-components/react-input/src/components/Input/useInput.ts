import * as React from 'react';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { slotFromProps, slotFromShorthand, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import type { InputProps, InputSlots, InputState } from './Input.types';
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
  props = useFieldControlProps_unstable(props, { supportsLabelFor: true, supportsRequired: true, supportsSize: true });

  const overrides = useOverrides();

  const {
    size = 'medium',
    appearance = overrides.inputDefaultAppearance ?? 'outline',
    onChange,
    style,
    className,
    value,
    defaultValue,
    as = 'input',
    contentAfter,
    contentBefore,
    root,
    ...rest
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

  const [internalValue, setInternalValue] = useControllableState({
    state: value,
    defaultState: defaultValue,
    initialState: '',
  });

  return {
    components: {
      root: 'span',
      input: 'input',
      contentBefore: 'span',
      contentAfter: 'span',
    },
    size,
    appearance,
    input: slotFromProps<InputSlots, 'input'>(
      {
        ...rest,
        value: internalValue,
        onChange: useEventCallback(ev => {
          const newValue = ev.target.value;
          onChange?.(ev, { value: newValue });
          setInternalValue(newValue);
        }),
      },
      {
        ref,
        elementType: as,
        defaultProps: { type: 'text' },
      },
    ),
    contentAfter: slotFromShorthand(contentAfter, {
      elementType: 'span',
    }),
    contentBefore: slotFromShorthand(contentBefore, {
      elementType: 'span',
    }),
    root: slotFromShorthand(root, {
      required: true,
      elementType: 'span',
      defaultProps: { style, className },
    }),
  };
};
