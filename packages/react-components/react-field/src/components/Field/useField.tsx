import * as React from 'react';
import { CheckmarkCircle12Filled, ErrorCircle12Filled, Warning12Filled } from '@fluentui/react-icons';
import { Label } from '@fluentui/react-label';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import type {
  FieldComponent,
  FieldConfig,
  FieldProps,
  FieldPropsWithOptionalComponentProps,
  FieldState,
} from './Field.types';

const validationMessageIcons = {
  error: <ErrorCircle12Filled />,
  warning: <Warning12Filled />,
  success: <CheckmarkCircle12Filled />,
} as const;

/**
 * Partition the props used by the Field itself, from the props that are passed to the underlying field component.
 */
export const getPartitionedFieldProps = <Props extends FieldProps<FieldComponent>>(props: Props) => {
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
export const useField_unstable = <T extends FieldComponent>(
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

  const control = resolveShorthand(fieldProps.control, {
    required: true,
    defaultProps: {
      ref,
      id: baseId + '__control',
      ...controlProps,
    },
  });

  const label = resolveShorthand(fieldProps.label, {
    defaultProps: {
      id: baseId + '__label',
      required: controlProps.required,
      size: typeof controlProps.size === 'string' ? controlProps.size : undefined,
      htmlFor: labelConnection === 'htmlFor' ? control.id : undefined,
    },
  });

  const validationMessage = resolveShorthand(fieldProps.validationMessage, {
    defaultProps: {
      id: baseId + '__validationMessage',
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
    control['aria-labelledby'] ??= label.id;
  }

  if (validationState === 'error' && ariaInvalidOnError) {
    control['aria-invalid'] ??= true;
    if (validationMessage) {
      control['aria-errormessage'] ??= validationMessage.id;
    }
    if (hint) {
      control['aria-describedby'] ??= hint.id;
    }
  } else {
    // If the state is not an error, then the control is described by the validation message, or hint, or both
    const describedby = validationMessage || hint;
    if (describedby) {
      control['aria-describedby'] ??= validationMessage && hint ? `${validationMessage.id} ${hint.id}` : describedby.id;
    }
  }

  const state: FieldState<FieldComponent> = {
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
