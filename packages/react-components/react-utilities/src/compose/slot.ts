import type {
  AsIntrinsicElement,
  SlotComponent,
  SlotComponentMetadata,
  SlotRenderFunction,
  SlotShorthandValue,
  UnknownSlotProps,
} from './types';
import { SLOT_COMPONENT_METADATA_SYMBOL } from './constants';
import * as React from 'react';
import { isSlot } from './isSlot';

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
  value: Props | SlotComponent<Props> | SlotShorthandValue | undefined,
  options: { required: true } & SlotOptions<Props>,
): SlotComponent<Props>;
export function slot<Props extends UnknownSlotProps>(
  value: Props | SlotComponent<Props> | SlotShorthandValue | undefined | null,
  options: { required?: boolean } & SlotOptions<Props>,
): SlotComponent<Props> | undefined;
export function slot<Props extends UnknownSlotProps>(
  value: SlotComponent<Props>,
  options?: { required: true } & Partial<SlotOptions<Props>>,
): SlotComponent<Props>;
export function slot<Props extends UnknownSlotProps>(
  value: Props | SlotComponent<Props> | SlotShorthandValue | undefined | null,
  options: { required?: boolean } & Partial<SlotOptions<Props>> = {},
): SlotComponent<Props> | undefined {
  const { required = false, defaultProps, elementType } = options;

  if (value === null || (value === undefined && !required)) {
    return undefined;
  }

  let metadata: SlotComponentMetadata<Props>;
  if (isSlot<Props>(value)) {
    metadata = value[SLOT_COMPONENT_METADATA_SYMBOL];
    if (elementType !== undefined) {
      metadata.elementType = elementType;
    }
  } else if (elementType !== undefined) {
    metadata = { elementType };
  } else if (process.env.NODE_ENV !== 'production') {
    throw new Error("[react-utilities]: slot options.elementType is required when value isn't a slot itself");
  } else {
    metadata = { elementType: 'div' as React.ElementType<Props> as React.ComponentType<Props> };
  }

  /**
   * Casting is required here as SlotComponent is a function, not an object.
   * Although SlotComponent has a function signature, it is still just an object.
   * This is required to make a slot callable (JSX compatible), this is the exact same approach
   * that is used on `@types/react` components
   */
  const propsWithMetadata = {
    ...defaultProps,
    [SLOT_COMPONENT_METADATA_SYMBOL]: metadata,
  } as SlotComponent<Props>;

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
      metadata.renderFunction = value.children as SlotRenderFunction<Props>;
      propsWithMetadata.children = defaultProps?.children;
    }
  }

  return propsWithMetadata;
}
