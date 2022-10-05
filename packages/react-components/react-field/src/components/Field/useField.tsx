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
 * Merge two possibly-undefined IDs for aria-describedby. If both IDs are defined, combines
 * them into a string separated by a space. Otherwise, returns just the defined ID (if any).
 */
const mergeAriaDescribedBy = (a?: string, b?: string) => (a && b ? `${a} ${b}` : a || b);

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
  const { labelConnection = 'htmlFor' } = params;

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
  if (labelConnection === 'aria-labelledby') {
    control['aria-labelledby'] ??= label?.id;
  }
  if (validationState === 'error') {
    control['aria-invalid'] ??= true;
    control['aria-errormessage'] ??= validationMessage?.id;
    control['aria-describedby'] ??= hint?.id;
  } else {
    control['aria-describedby'] ??= mergeAriaDescribedBy(validationMessage?.id, hint?.id);
  }

  const state: FieldState<FieldComponent> = {
    orientation,
    validationState,
    classNames: params.classNames,
    components: {
      root: 'div',
      control: params.component,
      label: Label,
      validationMessage: 'span',
      validationMessageIcon: 'span',
      hint: 'span',
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
