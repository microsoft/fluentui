import * as React from 'react';
import type { FieldComponent, FieldProps, FieldSlots, FieldState, OptionalFieldComponentProps } from './Field.types';
import { CheckmarkCircle12Filled, ErrorCircle12Filled, Warning12Filled } from '@fluentui/react-icons';
import { Label } from '@fluentui/react-label';
import { getNativeElementProps, resolveShorthand, SlotClassNames, useId } from '@fluentui/react-utilities';

const statusIcons = {
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
    fieldComponent,
    helperText,
    label,
    orientation,
    root,
    status,
    statusIcon,
    statusText,
    style,
    ...restOfProps
  } = props;

  const fieldProps = {
    className,
    fieldComponent,
    helperText,
    label,
    orientation,
    root,
    status,
    statusIcon,
    statusText,
    style,
  };

  return [fieldProps, restOfProps] as const;
};

export type UseFieldParams<T extends FieldComponent> = {
  /**
   * Props passed to this Field
   */
  props: FieldProps<T> & OptionalFieldComponentProps;

  /**
   * Ref to the underlying fieldComponent
   */
  ref: React.Ref<HTMLElement>;

  /**
   * The underlying input component that this field is wrapping.
   */
  fieldComponent: T;

  /**
   * Class names for this component, created by `getFieldClassNames`.
   */
  classNames: SlotClassNames<FieldSlots<T>>;

  /**
   * How the label be connected to the fieldComponent.
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
  const [fieldProps, componentProps] = getPartitionedFieldProps(params.props);

  const baseId = useId('field-');

  const { orientation = 'vertical', status } = fieldProps;

  const root = resolveShorthand(fieldProps.root, {
    required: true,
    defaultProps: getNativeElementProps('div', fieldProps),
  });

  const label = resolveShorthand(fieldProps.label, {
    defaultProps: {
      id: baseId + '__label',
      required: componentProps.required,
      size: typeof componentProps.size === 'string' ? componentProps.size : undefined,
      // htmlFor is set below
    },
  });

  const statusText = resolveShorthand(fieldProps.statusText, {
    defaultProps: {
      id: baseId + '__statusText',
    },
  });

  const helperText = resolveShorthand(fieldProps.helperText, {
    defaultProps: {
      id: baseId + '__helperText',
    },
  });

  const statusIcon = resolveShorthand(fieldProps.statusIcon, {
    required: !!status,
    defaultProps: {
      children: status ? statusIcons[status] : undefined,
    },
  });

  const { labelConnection = 'htmlFor' } = params;

  const fieldComponent = resolveShorthand(fieldProps.fieldComponent, {
    required: true,
    defaultProps: {
      ref: params.ref,
      // Add a default ID only if required for label's htmlFor prop
      id: label && labelConnection === 'htmlFor' ? baseId + '__fieldComponent' : undefined,
      // Add aria-labelledby only if not using the label's htmlFor
      'aria-labelledby': labelConnection !== 'htmlFor' ? label?.id : undefined,
      'aria-describedby': status !== 'error' ? mergeAriaDescribedBy(statusText?.id, helperText?.id) : helperText?.id,
      'aria-errormessage': status === 'error' ? statusText?.id : undefined,
      'aria-invalid': status === 'error' ? true : undefined,
      ...componentProps,
    },
  });

  if (labelConnection === 'htmlFor' && label && !label.htmlFor) {
    label.htmlFor = fieldComponent.id;
  }

  const state: FieldState<FieldComponent> = {
    orientation,
    status,
    classNames: params.classNames,
    components: {
      root: 'div',
      fieldComponent: params.fieldComponent,
      label: Label,
      statusText: 'span',
      statusIcon: 'span',
      helperText: 'span',
    },
    root,
    fieldComponent,
    label,
    statusIcon,
    statusText,
    helperText,
  };

  return state as FieldState<T>;
};
