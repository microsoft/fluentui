export {};
// import { FieldProps } from '../Field';
// import { filterFieldSize } from '../util/filterFieldSize';
// import { useFieldContext } from './FieldContext';

// export type UseFieldChildPropsOptions<Props extends FieldChildProps<unknown>> = {
//   supportedSizes: (NonNullable<Props['size']> & NonNullable<FieldProps['size']>)[];
// };

// export type FieldChildProps<SizeValues> = {
//   id?: string;
//   required?: boolean;
//   'aria-labelledby'?: string;
//   size?: SizeValues;
// };

// export const useFieldChildProps_unstable = <SizeValues>(
//   options: UseFieldChildPropsOptions<FieldChildProps<SizeValues>>,
// ) => {
//   const props: FieldChildProps<SizeValues> = {
//     id: useFieldContext(ctx => ctx?.childId),
//     'aria-labelledby': useFieldContext(ctx => ctx?.labelId),
//     required: useFieldContext(ctx => ctx?.required),
//     size: useFieldContext(ctx => filterFieldSize(ctx?.size, options.supportedSizes)),
//   };

//   if (useFieldContext(ctx => ctx === undefined)) {
//     return undefined;
//   }

//   return props;
// };

// export const useMergedFieldProps_unstable = <Props extends FieldChildProps<unknown>>(
//   props: Props,
//   options: UseFieldChildPropsOptions<Props>,
// ): Props => {
//   const propsFromField = {
//     id: useFieldContext(ctx => ctx?.childId),
//     'aria-labelledby': useFieldContext(ctx => ctx?.labelId),
//     required: useFieldContext(ctx => ctx?.required),
//     size: useFieldContext(ctx => filterFieldSize(ctx?.size, options.supportedSizes)),
//   };

//   const hasFieldContext = useFieldContext(ctx => ctx !== undefined);
//   return hasFieldContext ? { ...propsFromField, ...props } : props;
// };
