import * as React from 'react';
import { CheckmarkCircle12Filled, ErrorCircle12Filled, Warning12Filled } from '@fluentui/react-icons';
import { Label } from '@fluentui/react-label';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import type { FieldConfig, FieldControl, FieldPropsWithOptionalComponentProps, FieldState } from './Field.types';

const validationMessageIcons = {
  error: <ErrorCircle12Filled />,
  warning: <Warning12Filled />,
  success: <CheckmarkCircle12Filled />,
} as const;

/**
 * Partition the props used by the Field itself, from the props that are passed to the underlying field component.
 */
export const getPartitionedFieldProps = (props: FieldPropsWithOptionalComponentProps<FieldControl>) => {
  const {
    className,
    control,
    hint,
    label,
    orientation,
    root,
    style,
    validationMessage,
    validationMessageIcon,
    validationState,
    ...restOfProps
  } = props;

  const fieldProps = {
    className,
    control,
    hint,
    label,
    orientation,
    root,
    style,
    validationMessage,
    validationMessageIcon,
    validationState,
  };

  return [fieldProps, restOfProps] as const;
};

/**
 * Create the state required to render Field.
 *
 * The returned state can be modified with hooks such as useFieldStyles_unstable,
 * before being passed to renderField_unstable.
 *
 * @param props - Props passed to this field
 * @param ref - Ref to the control slot (primary slot)
 * @param params - Configuration parameters for this Field
 */
export const useField_unstable = <T extends FieldControl>(
  props: FieldPropsWithOptionalComponentProps<T>,
  ref: React.Ref<HTMLElement>,
  params: FieldConfig<T>,
): FieldState<T> => {
  const [fieldProps, controlProps] = getPartitionedFieldProps(props);
  const { orientation = 'vertical', validationState } = fieldProps;
  const { labelConnection = 'htmlFor', ariaInvalidOnError = true } = params;

  const baseId = useId('field-');

  const root = resolveShorthand(fieldProps.root, {
    required: true,
    defaultProps: getNativeElementProps('div', fieldProps),
  });

  const label = resolveShorthand(fieldProps.label, {
    defaultProps: {
      id: baseId + '__label',
      required: controlProps.required,
      size: typeof controlProps.size === 'string' ? controlProps.size : undefined,
      // htmlFor is handled below
    },
  });

  const validationMessage = resolveShorthand(fieldProps.validationMessage, {
    defaultProps: {
      id: baseId + '__validationMessage',
      role: validationState === 'error' ? 'alert' : undefined,
    },
  });

  const hint = resolveShorthand(fieldProps.hint, {
    defaultProps: {
      id: baseId + '__hint',
    },
  });

  const validationMessageIcon = resolveShorthand(fieldProps.validationMessageIcon, {
    required: !!validationState,
    defaultProps: {
      children: validationState ? validationMessageIcons[validationState] : undefined,
    },
  });

  // Hook up aria props on the control
  if (label && labelConnection === 'aria-labelledby') {
    controlProps['aria-labelledby'] ??= label.id;
  }

  if (validationMessage || hint) {
    // The control is described by the validation message, or hint, or both
    // We also preserve and append any aria-describedby supplied by the user
    // For reference: https://github.com/microsoft/fluentui/pull/25580#discussion_r1017259933
    controlProps['aria-describedby'] = [validationMessage?.id, hint?.id, controlProps['aria-describedby']]
      .filter(Boolean)
      .join(' ');
  }

  if (validationState === 'error' && ariaInvalidOnError) {
    controlProps['aria-invalid'] ??= true;
  }

  const control = resolveShorthand(fieldProps.control, {
    required: true,
    defaultProps: {
      ref,
      id: baseId + '__control',
      ...controlProps,
    },
  });

  if (label && labelConnection === 'htmlFor') {
    label.htmlFor ??= control.id;
  }

  const state: FieldState<FieldControl> = {
    orientation,
    validationState,
    classNames: params.classNames,
    components: {
      root: 'div',
      control: params.component,
      label: Label,
      validationMessage: 'div',
      validationMessageIcon: 'span',
      hint: 'div',
    },
    root,
    control,
    label,
    validationMessageIcon,
    validationMessage,
    hint,
  };

  return state as FieldState<T>;
};
