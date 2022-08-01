import { useFieldContext_unstable } from './FieldContext';

export type UseFieldChildPropsOptions<SizeValues extends string> = {
  supportedSizes: SizeValues[];
};

export type FieldChildProps<SizeValues extends string> = {
  id?: string;
  required?: boolean;
  'aria-labelledby'?: string;
  size?: SizeValues;
};

export const useFieldChildProps = <SizeValues extends string = never>(
  options: UseFieldChildPropsOptions<SizeValues>,
) => {
  const props: FieldChildProps<SizeValues> = {};

  const inputId = useFieldContext_unstable(context => context?.inputId);
  if (inputId) {
    props.id = inputId;
  }

  const labelId = useFieldContext_unstable(context => context?.labelId);
  if (labelId) {
    props['aria-labelledby'] = labelId;
  }

  const required = useFieldContext_unstable(context => context?.required);
  if (required) {
    props.required = required;
  }

  const size = useFieldContext_unstable(context => context?.size);
  if (size && options.supportedSizes.includes(size as SizeValues)) {
    props.size = size as SizeValues;
  }

  return props;
};
