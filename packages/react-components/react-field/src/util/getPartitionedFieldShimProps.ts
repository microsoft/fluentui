import { FieldProps } from '../Field';

/**
 * @internal
 */
export type FieldShimProps = Pick<
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
 *
 * @deprecated Only for use by the deprecated [Component]Field shim components.
 * @internal
 */
export function getPartitionedFieldShimProps<ComponentProps>(
  props: FieldShimProps & ComponentProps,
): [FieldShimProps, ComponentProps] {
  const {
    className,
    hint,
    label,
    orientation,
    style,
    validationMessage,
    validationMessageIcon,
    validationState,
    ...componentProps
  } = props;

  return [
    {
      className,
      hint,
      label,
      orientation,
      style,
      validationMessage,
      validationMessageIcon,
      validationState,
    },
    componentProps as ComponentProps,
  ];
}
