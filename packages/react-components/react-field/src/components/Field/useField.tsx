import * as React from 'react';
import type { FieldComponent, FieldProps, FieldSlots, FieldState, OptionalFieldComponentProps } from './Field.types';
import { CheckmarkCircle12Filled, ErrorCircle12Filled, Warning12Filled } from '@fluentui/react-icons';
import { Label } from '@fluentui/react-label';
import { getNativeElementProps, resolveShorthand, SlotClassNames, useId } from '@fluentui/react-utilities';

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

export type UseFieldParams<T extends FieldComponent> = {
  /**
   * Props passed to this Field
   */
  props: FieldProps<T> & OptionalFieldComponentProps;

  /**
   * Ref to be passed to the control slot (primary slot)
   */
  ref: React.Ref<HTMLElement>;

  /**
   * The underlying input component that this field is wrapping.
   */
  component: T;

  /**
   * Class names for this component, created by `getFieldClassNames`.
   */
  classNames: SlotClassNames<FieldSlots<T>>;

  /**
   * How the label be connected to the control.
   * * htmlFor - Set the Label's htmlFor prop to the component's ID (and generate an ID if not provided).
   *   This is the preferred method for components that use the underlying <input> tag.
   * * aria-labelledby - Set the component's aria-labelledby prop to the Label's ID. Use this for components
   *   that are not directly <input> elements (such as RadioGroup).
   *
   * @default htmlFor
   */
  labelConnection?: 'htmlFor' | 'aria-labelledby';
};

/**
 * Create the state required to render Field.
 *
 * The returned state can be modified with hooks such as useFieldStyles_unstable,
 * before being passed to renderField_unstable.
 *
 * @param params - Configuration parameters for this Field
 */
export const useField_unstable = <T extends FieldComponent>(params: UseFieldParams<T>): FieldState<T> => {
  const [props, controlProps] = getPartitionedFieldProps(params.props);

  const baseId = useId('field-');

  const { orientation = 'vertical', validationState } = props;

  const root = resolveShorthand(props.root, {
    required: true,
    defaultProps: getNativeElementProps('div', props),
  });

  const label = resolveShorthand(props.label, {
    defaultProps: {
      id: baseId + '__label',
      required: controlProps.required,
      size: typeof controlProps.size === 'string' ? controlProps.size : undefined,
      // htmlFor is set below
    },
  });

  const validationMessage = resolveShorthand(props.validationMessage, {
    defaultProps: {
      id: baseId + '__validationMessage',
    },
  });

  const hint = resolveShorthand(props.hint, {
    defaultProps: {
      id: baseId + '__hint',
    },
  });

  const validationMessageIcon = resolveShorthand(props.validationMessageIcon, {
    required: !!validationState,
    defaultProps: {
      children: validationState ? validationMessageIcons[validationState] : undefined,
    },
  });

  const { labelConnection = 'htmlFor' } = params;
  const hasError = validationState === 'error';

  const control = resolveShorthand(props.control, {
    required: true,
    defaultProps: {
      ref: params.ref,
      // Add a default ID only if required for label's htmlFor prop
      id: label && labelConnection === 'htmlFor' ? baseId + '__control' : undefined,
      // Add aria-labelledby only if not using the label's htmlFor
      'aria-labelledby': labelConnection !== 'htmlFor' ? label?.id : undefined,
      'aria-describedby': hasError ? hint?.id : mergeAriaDescribedBy(validationMessage?.id, hint?.id),
      'aria-errormessage': hasError ? validationMessage?.id : undefined,
      'aria-invalid': hasError ? true : undefined,
      ...controlProps,
    },
  });

  if (labelConnection === 'htmlFor' && label && !label.htmlFor) {
    label.htmlFor = control.id;
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
