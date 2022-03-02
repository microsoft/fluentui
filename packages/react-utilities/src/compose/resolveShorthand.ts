import { isValidElement } from 'react';
import type { ExtractSlotProps, ReplaceNullWithUndefined, SlotShorthandValue, UnknownSlotProps } from './types';

export type ResolveShorthandOptions<Props, Required extends boolean = false> = (Required extends true
  ? { required: true }
  : { required?: boolean }) & {
  defaultProps?: Props;
};

export type ResolveShorthandFunction<Props extends UnknownSlotProps = UnknownSlotProps> = {
  // These two overloads differ in their `required` param, and whether or not they return `undefined`:
  //  * If `required` is true, its return type includes `undefined` only if the slot is nullable
  //  * Otherwise, its return type includes `undefined` if the slot is optional (`?`)

  <P extends Props | null | undefined>(
    value: P | SlotShorthandValue,
    options?: ResolveShorthandOptions<ExtractSlotProps<P>, true>,
  ): ReplaceNullWithUndefined<Exclude<P, undefined>>;

  <P extends Props | null | undefined>(
    value: P | SlotShorthandValue,
    options?: ResolveShorthandOptions<ExtractSlotProps<P>, boolean>,
  ): ReplaceNullWithUndefined<P>;
};

/**
 * Resolves shorthands into a slot props object
 *
 * @param value - the base shorthand props
 * @param options - options to resolve shorthand props
 *
 * @returns The slot props object, which may be `undefined` unless required is true AND the slot is not nullable
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
