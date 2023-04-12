/* eslint-disable deprecation/deprecation */
import * as React from 'react';
import { ForwardRefComponent } from '@fluentui/react-utilities';
import type { FieldProps } from '../Field';
import { Field, fieldClassNames } from '../Field';

/**
 * @deprecated Only for use to make deprecated [Control]Field shim components.
 * @internal
 */
export type DeprecatedFieldProps<ControlProps> = ControlProps & {
  root?: FieldProps;
  control?: ControlProps;
} & Pick<
    FieldProps,
    | 'className'
    | 'hint'
    | 'label'
    | 'orientation'
    | 'style'
    | 'validationMessage'
    | 'validationMessageIcon'
    | 'validationState'
  >;

/**
 * Partition the props used by the Field itself, from the props that are passed to the underlying field component.
 */
function getPartitionedFieldProps<ControlProps>(
  props: DeprecatedFieldProps<ControlProps> & Pick<FieldProps, 'required' | 'size'>,
) {
  const {
    className,
    control,
    hint,
    label,
    orientation,
    required,
    root,
    size,
    style,
    validationMessage,
    validationMessageIcon,
    validationState = 'none',
    ...restOfProps
  } = props;

  return [
    {
      className,
      hint,
      label,
      orientation,
      required,
      size,
      style,
      validationMessage,
      validationMessageIcon,
      validationState,
      ...root,
    },
    {
      required,
      size,
      ...restOfProps,
      ...control,
    },
  ];
}

/**
 * @deprecated Only for use to make deprecated [Control]Field shim components.
 * @internal
 */
export function makeDeprecatedField<ControlProps>(
  Control: React.ComponentType<ControlProps>,
  options: {
    mapProps?: (props: DeprecatedFieldProps<ControlProps>) => DeprecatedFieldProps<ControlProps>;
    displayName?: string;
  } = {},
) {
  const { mapProps = props => props, displayName = `${Control.displayName}Field` } = options;

  const DeprecatedField = React.forwardRef((props, ref) => {
    const [fieldProps, controlProps] = getPartitionedFieldProps(mapProps(props));
    return (
      <Field {...fieldProps}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Control {...(controlProps as any)} ref={ref as any} />
      </Field>
    );
  }) as ForwardRefComponent<DeprecatedFieldProps<ControlProps>>;

  DeprecatedField.displayName = displayName;

  return DeprecatedField;
}

/**
 * @deprecated Only for use to make deprecated [Control]Field shim components.
 * @internal
 */
export const getDeprecatedFieldClassNames = (controlRootClassName: string) => ({
  ...fieldClassNames,
  control: controlRootClassName,
});
