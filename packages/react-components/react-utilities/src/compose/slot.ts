import type {
  AsIntrinsicElement,
  SlotComponentType,
  SlotRenderFunction,
  SlotShorthandValue,
  UnknownSlotProps,
} from './types';
import * as React from 'react';
import { SLOT_ELEMENT_TYPE_SYMBOL, SLOT_RENDER_FUNCTION_SYMBOL } from './constants';

export type SlotOptions<Props extends UnknownSlotProps> = {
  elementType:
    | React.ComponentType<Props>
    | (Props extends AsIntrinsicElement<infer As> ? As : keyof JSX.IntrinsicElements);
  defaultProps?: Partial<Props>;
};

/**
 * Creates a slot from a slot shorthand or properties (`props.SLOT_NAME` or `props` itself)
 * @param value - the value of the slot, it can be a slot shorthand, a slot component or a slot properties
 * @param options - optional values you can pass to alter the signature of a slot, those values are:
 *
 * * `elementType` - the base element type of a slot, defaults to `'div'`
 * * `defaultProps` - similar to a React component declaration, you can provide a slot default properties to be merged with the shorthand/properties provided
 * * `required` - a boolean that indicates if a slot will be rendered even if it's base value is `undefined`.
 * By default if `props.SLOT_NAME` is `undefined` then `state.SLOT_NAME` becomes `undefined`
 * and nothing will be rendered, but if `required = true` then `state.SLOT_NAME` becomes an object
 * with the values provided by `options.defaultProps` (or `{}`). This is useful for cases such as providing a default content
 * in case no shorthand is provided, like the case of the `expandIcon` slot for the `AccordionHeader`
 *
 * @example of a required nullable slot
 * ```tsx
 * // AccordionHeader.types.ts
 * type AccordionHeaderSlots = {
 *    expandIcon?: Slot<'span'>
 * }
 * // useAccordionHeader.ts
 * const state = {
 *  expandIcon: slot(expandIconShorthand, {
 *    required: true,
 *    elementType: 'span',
 *    defaultProps: { children: <ChevronRight/>, 'aria-hidden': true}
 *  })
 * }
 * // renderAccordionHeader
 * state.expandIcon && <state.expandIcon/>
 * ```
 */
export function slot<Props extends UnknownSlotProps>(
  value: Props | SlotShorthandValue | undefined,
  options: { required: true } & SlotOptions<Props>,
): SlotComponentType<Props>;
export function slot<Props extends UnknownSlotProps>(
  value: Props | SlotShorthandValue | undefined | null,
  options: { required?: boolean } & SlotOptions<Props>,
): SlotComponentType<Props> | undefined;
export function slot<Props extends UnknownSlotProps>(
  value: Props | SlotShorthandValue | undefined | null,
  options: { required?: boolean } & SlotOptions<Props>,
): SlotComponentType<Props> | undefined {
  const { required = false, defaultProps, elementType } = options;

  if (value === null || (value === undefined && !required)) {
    return undefined;
  }

  let renderFunction: SlotRenderFunction<Props> | undefined;

  /**
   * Casting is required here as SlotComponentType is a function, not an object.
   * Although SlotComponentType has a function signature, it is still just an object.
   * This is required to make a slot callable (JSX compatible), this is the exact same approach
   * that is used on `@types/react` components
   */
  const propsWithMetadata = { ...defaultProps } as SlotComponentType<Props>;

  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    Array.isArray(value) ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    React.isValidElement<any>(value)
  ) {
    propsWithMetadata.children = value;
  } else if (typeof value === 'object') {
    Object.assign(propsWithMetadata, value);
    if (typeof value.children === 'function') {
      renderFunction = value.children as SlotRenderFunction<Props>;
      propsWithMetadata.children = defaultProps?.children;
    }
  }

  Object.assign(propsWithMetadata, {
    [SLOT_ELEMENT_TYPE_SYMBOL]: elementType,
    [SLOT_RENDER_FUNCTION_SYMBOL]: renderFunction,
  });

  return propsWithMetadata;
}
