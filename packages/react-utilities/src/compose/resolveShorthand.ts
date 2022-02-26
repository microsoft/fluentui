import { isValidElement } from 'react';
import type { ExtractSlotProps, SlotShorthandValue, UnknownSlotProps } from './types';

/**
 * If type T includes `null`, remove it and add `undefined` instead.
 */
type ReplaceNullWithUndefined<T> = T extends null ? undefined : T;

export type ResolveShorthandOptions<Props, Required extends boolean = false> = {
  required?: Required;
  defaultProps?: Props;
};

// export type ResolveShorthandFunction<Props extends UnknownSlotProps = UnknownSlotProps> = {
//   <P extends Props | null>(
//     value: P | SlotShorthandValue | undefined,
//     options?: ResolveShorthandOptions<P, true>,
//   ): ReplaceNullWithUndefined<P>;
//   <P extends Props | null>(value: P | SlotShorthandValue | undefined, options?: ResolveShorthandOptions<P, boolean>):
//     | ReplaceNullWithUndefined<P>
//     | undefined;
// };

export type ResolveShorthandFunction<SlotProps extends UnknownSlotProps = UnknownSlotProps> = {
  // These two overloads differ in their `required` param, and whether or not they return `undefined`:
  //  * If `required` is true, it can return `undefined` only if the slot is nullable
  //  * Otherwise, it can return `undefined` if the slot is nullable OR optional
  // In other words, required=true means a slot will always be given a default value if the prop is undefined.

  <Value extends SlotProps | SlotShorthandValue | null | undefined>(
    value: Value,
    options?: ResolveShorthandOptions<ExtractSlotProps<Value>, /*Required =*/ true>,
  ): ReplaceNullWithUndefined<Exclude<Value, SlotShorthandValue | undefined>>;

  <Value extends SlotProps | SlotShorthandValue | null | undefined>(
    value: Value,
    options?: ResolveShorthandOptions<ExtractSlotProps<Value>, /*Required =*/ boolean>,
  ): ReplaceNullWithUndefined<Exclude<Value, SlotShorthandValue>>;
};

/**
 * Resolves shorthands into a slot props object
 *
 * @param value - the base shorthand props
 * @param options - options to resolve shorthand props
 *
 * @returns The slot props object, which may be `undefined` unless the slot is `NonNullable` AND `required` is `true`.
 */
export const resolveShorthand: ResolveShorthandFunction = (value, options) => {
  const { required = false, defaultProps } = options || {};
  if (value === null || (value === undefined && !required)) {
    return undefined;
  }

  let resolvedShorthand = {} as UnknownSlotProps;

  if (typeof value === 'string' || typeof value === 'number' || Array.isArray(value) || isValidElement(value)) {
    resolvedShorthand.children = value;
  } else if (typeof value === 'object') {
    resolvedShorthand = value;
  }

  return defaultProps ? { ...defaultProps, ...resolvedShorthand } : resolvedShorthand;
};
