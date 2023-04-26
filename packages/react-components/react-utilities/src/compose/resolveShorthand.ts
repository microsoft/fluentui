import { isValidElement } from 'react';
import type { SlotRenderFunction, SlotShorthandValue, UnknownSlotProps } from './types';
import { SLOT_RENDER_FUNCTION_SYMBOL } from './constants';

export type ResolveShorthandOptions<Props, Required extends boolean = false> = Required extends true
  ? { required: true; defaultProps?: Props }
  : { required?: Required; defaultProps?: Props };

export type ResolveShorthandFunction<Props extends UnknownSlotProps = UnknownSlotProps> = {
  <P extends Props>(value: P | SlotShorthandValue | undefined, options: ResolveShorthandOptions<P, true>): P;
  <P extends Props>(value: P | SlotShorthandValue | null | undefined, options?: ResolveShorthandOptions<P, boolean>):
    | P
    | undefined;
};

/**
 * Resolves shorthands into slot props, to ensure normalization of the signature
 * being passed down to getSlots method
 * @param value - the base shorthand props
 * @param options - options to resolve shorthand props
 */
export const resolveShorthand: ResolveShorthandFunction = (value, options) => {
  const { required = false, defaultProps } = options || {};
  if (value === null || (value === undefined && !required)) {
    return undefined;
  }

  let resolvedShorthand: UnknownSlotProps & {
    [SLOT_RENDER_FUNCTION_SYMBOL]?: SlotRenderFunction<UnknownSlotProps>;
  } = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof value === 'string' || typeof value === 'number' || Array.isArray(value) || isValidElement<any>(value)) {
    resolvedShorthand.children = value;
  } else if (typeof value === 'object') {
    resolvedShorthand = value;
  }

  resolvedShorthand = {
    ...defaultProps,
    ...resolvedShorthand,
  };

  if (typeof resolvedShorthand.children === 'function') {
    resolvedShorthand[SLOT_RENDER_FUNCTION_SYMBOL] = resolvedShorthand.children as SlotRenderFunction<UnknownSlotProps>;
    resolvedShorthand.children = defaultProps?.children;
  }

  return resolvedShorthand;
};
