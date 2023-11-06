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
 * @param options - values you can pass to alter the signature of a slot, those values are:
 *
 * * `elementType` - the base element type of a slot, defaults to `'div'`
 * * `defaultProps` - similar to a React component declaration, you can provide a slot default properties to be merged with the shorthand/properties provided.
 */
export function always<Props extends UnknownSlotProps>(
  value: Props | SlotShorthandValue | undefined,
  options: SlotOptions<Props>,
): SlotComponentType<Props> {
  const { defaultProps, elementType } = options;

  const props = resolveShorthand(value);

  /**
   * Casting is required here as SlotComponentType is a function, not an object.
   * Although SlotComponentType has a function signature, it is still just an object.
   * This is required to make a slot callable (JSX compatible), this is the exact same approach
   * that is used on `@types/react` components
   */
  const propsWithMetadata = {
    ...defaultProps,
    ...props,
    [SLOT_ELEMENT_TYPE_SYMBOL]: elementType,
  } as SlotComponentType<Props>;

  if (props && typeof props.children === 'function') {
    propsWithMetadata[SLOT_RENDER_FUNCTION_SYMBOL] = props.children as SlotRenderFunction<Props>;
    propsWithMetadata.children = defaultProps?.children;
  }

  return propsWithMetadata;
}

/**
 * Creates a slot from a slot shorthand or properties (`props.SLOT_NAME` or `props` itself)
 * @param value - the value of the slot, it can be a slot shorthand, a slot component or a slot properties
 * @param options - values you can pass to alter the signature of a slot, those values are:
 *
 * * `elementType` - the base element type of a slot, defaults to `'div'`
 * * `defaultProps` - similar to a React component declaration, you can provide a slot default properties to be merged with the shorthand/properties provided
 * * `renderByDefault` - a boolean that indicates if a slot will be rendered even if it's base value is `undefined`.
 * By default if `props.SLOT_NAME` is `undefined` then `state.SLOT_NAME` becomes `undefined`
 * and nothing will be rendered, but if `renderByDefault = true` then `state.SLOT_NAME` becomes an object
 * with the values provided by `options.defaultProps` (or `{}`). This is useful for cases such as providing a default content
 * in case no shorthand is provided, like the case of the `expandIcon` slot for the `AccordionHeader`
 */
export function optional<Props extends UnknownSlotProps>(
  value: Props | SlotShorthandValue | undefined | null,
  options: { renderByDefault?: boolean } & SlotOptions<Props>,
): SlotComponentType<Props> | undefined {
  if (value === null || (value === undefined && !options.renderByDefault)) {
    return undefined;
  }
  return always(value, options);
}

/**
 * Helper function that converts a slot shorthand or properties to a slot properties object
 * The main difference between this function and `slot` is that this function does not return the metadata required for a slot to be considered a properly renderable slot, it only converts the value to a slot properties object
 * @param value - the value of the slot, it can be a slot shorthand or a slot properties object
 */
export function resolveShorthand<Props extends UnknownSlotProps | null | undefined>(
  value: Props | SlotShorthandValue,
): Props {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    Array.isArray(value) ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    React.isValidElement<any>(value)
  ) {
    return { children: value } as Props;
  }
  if (value && typeof value !== 'object' && process.env.NODE_ENV !== 'production') {
    // TODO: would be nice to have a link to slot documentation in this error message
    // eslint-disable-next-line no-console
    console.error(/** #__DE-INDENT__ */ `
      @fluentui/react-utilities [slot.${resolveShorthand.name}]:
      A slot got an invalid value "${value}" (${typeof value}).
      A valid value for a slot is a slot shorthand or slot properties object.
      Slot shorthands can be strings, numbers, arrays or JSX elements
    `);
  }

  return value;
}
