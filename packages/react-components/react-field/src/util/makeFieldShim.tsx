import { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { Field, FieldProps } from '../Field';

/**
 * @internal
 */
export type FieldShimProps<ControlProps> = ControlProps & {
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
function getPartitionedFieldShimProps<ControlProps>(
  props: FieldShimProps<ControlProps> & Pick<FieldProps, 'required' | 'size'>,
) {
  const {
    className,
    control,
    hint,
    label,
    orientation,
    required,
    size,
    style,
    validationMessage,
    validationMessageIcon,
    validationState,
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
    },
    {
      required,
      size,
      ...restOfProps,
      ...control,
    },
  ] as const;
}

/**
 * @internal Only for use by the deprecated [Control]Field shim components.
 */
export function makeFieldShim<ControlProps>(Control: React.ComponentType<ControlProps>) {
  const FieldShim = React.forwardRef((props, ref) => {
    const [fieldProps, controlProps] = getPartitionedFieldShimProps(props);
    return (
      <Field {...fieldProps}>
        <Control {...((controlProps as unknown) as ControlProps)} ref={ref} />
      </Field>
    );
  }) as ForwardRefComponent<FieldShimProps<ControlProps>>;

  FieldShim.displayName = `${Control.displayName}Field`;

  return FieldShim;
}
