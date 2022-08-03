import { FieldProps } from '../Field';

export const filterFieldSize = <SupportedSizes extends NonNullable<FieldProps['size']>>(
  size: FieldProps['size'],
  supportedSizes: SupportedSizes[],
): SupportedSizes | undefined => {
  return size && supportedSizes.includes(size as SupportedSizes) ? (size as SupportedSizes) : undefined;
};
