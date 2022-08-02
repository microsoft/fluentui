import { useFieldContext } from './FieldContext';

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

  const labelFor = useFieldContext(ctx => ctx?.labelFor);
  if (labelFor) {
    props.id = labelFor;
  }

  const labelId = useFieldContext(ctx => ctx?.labelId);
  if (labelId) {
    props['aria-labelledby'] = labelId;
  }

  const required = useFieldContext(ctx => ctx?.required);
  if (required) {
    props.required = required;
  }

  const size = useFieldContext(ctx => ctx?.size);
  if (size && options.supportedSizes.includes(size as SizeValues)) {
    props.size = size as SizeValues;
  }

  return props;
};
