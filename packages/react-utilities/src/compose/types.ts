import * as React from 'react';

export type SlotRenderFunction<Props> = (
  Component: React.ElementType<Props>,
  props: Omit<Props, 'children' | 'as'>,
) => React.ReactNode;

/**
 * Matches any component's Slots type (such as ButtonSlots).
 *
 * This should ONLY be used in type templates as in `extends SlotPropsRecord`;
 * it shouldn't be used as a component's Slots type.
 */
export type SlotPropsRecord = Record<string, UnknownSlotProps | SlotShorthandValue | null | undefined>;

/**
 * The shorthand value of a slot allows specifying its child
 */
export type SlotShorthandValue = React.ReactChild | React.ReactNodeArray | React.ReactPortal;

/**
 * Matches any slot props type.
 *
 * This should ONLY be used in type templates as in `extends UnknownSlotProps`;
 * it shouldn't be used as the type of a slot.
 */
export type UnknownSlotProps = Pick<React.HTMLAttributes<HTMLElement>, 'children' | 'className' | 'style'> & {
  as?: keyof JSX.IntrinsicElements;
};

/**
 * Helper type for {@link Slot}. Adds shorthand types that are assignable to the slot's `children`.
 */
type WithSlotShorthandValue<Props extends { children?: unknown }> =
  | Props
  | Extract<SlotShorthandValue, Props['children']>;

/**
 * Helper type for {@link Slot}. Takes the props we want to support for a slot and adds the ability for `children`
 * to be a render function that takes those props.
 */
type WithSlotRenderFunction<Props extends { children?: unknown }> = Props & {
  children?: Props['children'] | SlotRenderFunction<Props>;
};

/**
 * HTML element types that are not allowed to have children.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Glossary/Empty_element
 */
type EmptyIntrisicElements =
  | 'area'
  | 'base'
  | 'br'
  | 'col'
  | 'embed'
  | 'hr'
  | 'img'
  | 'input'
  | 'link'
  | 'meta'
  | 'param'
  | 'source'
  | 'track'
  | 'wbr';

/**
 * Helper type for {@link Slot}. Modifies `JSX.IntrinsicElements[Type]`:
 * * Removes legacy string ref.
 * * Disallows children for empty tags like 'img'.
 */
export type IntrisicElementProps<Type extends keyof JSX.IntrinsicElements> = React.PropsWithRef<
  JSX.IntrinsicElements[Type]
> &
  (Type extends EmptyIntrisicElements ? { children?: never } : {});

/**
 * The props type and shorthand value for a slot. Type is either a single intrinsic element like `'div'`,
 * or a component like `typeof Button`.
 *
 * If a slot needs to support multiple intrinsic element types, use the `AlternateAs` param (see examples below).
 *
 * By default, slots can be set to `null` to prevent them from being rendered. If a slot must always be rendered,
 * wrap with `NonNullable` (see examples below).
 *
 * @example
 * ```
 * // Intrinsic element examples:
 * Slot<'div'> // Slot is always div
 * (NonNullable<Slot<'button'>> | SlotAs<'a'>) | null // Defaults to button, but allows as="a" with anchor-specific props
 * (NonNullable<Slot<'span'>> | SlotAs<'div' | 'pre'>) | null // Defaults to span, but allows as="div" or as="pre"
 * NonNullable<Slot<'div'>> // Slot that will always be rendered (can't be set to null by the user)
 *
 * // Component examples:
 * Slot<typeof Button> // Slot is always a Button, and accepts all of Button's Props
 * NonNullable<Slot<typeof Label>> // Slot is a Label and will always be rendered (can't be set to null by the user)
 * ```
 */
export type Slot<
  Type extends keyof JSX.IntrinsicElements | React.ComponentType | UnknownSlotProps,
  /** @deprecated Use `| SlotAs<...>` instead */
  AlternateAs extends keyof JSX.IntrinsicElements = never
> = IsSingleton<Extract<Type, string>> extends true
  ? WithSlotShorthandValue<SlotProps<Type>> | SlotAs<AlternateAs> | null
  : 'Error: Slot type must not be not a union. Use SlotAs to support additional types.';

export type SlotAs<AlternateAs extends keyof JSX.IntrinsicElements> = {
  [As in AlternateAs]: { as: As } & WithSlotRenderFunction<IntrisicElementProps<As>>;
}[AlternateAs];

export type SlotProps<
  Type extends keyof JSX.IntrinsicElements | React.ComponentType | UnknownSlotProps
> = Type extends keyof JSX.IntrinsicElements // Intrinsic elements like `div`
  ? { as?: Type } & WithSlotRenderFunction<IntrisicElementProps<Type>>
  : Type extends React.ComponentType<infer Props> // Component types like `typeof Button`
  ? WithSlotRenderFunction<Props>
  : Type; // Props types like `ButtonProps`

export type RootSlot<Type extends keyof JSX.IntrinsicElements | React.ComponentType | UnknownSlotProps> =
  //
  IsSingleton<Extract<Type, string>> extends true
    ? SlotProps<Type>
    : 'Error: Slot type must not be not a union. Use SlotAs to support additional types.';

// The RootSlot and PrimarySlot are actually just props objects
export type { RootSlot as PrimarySlot };

/**
 * Evaluates to true if the given type contains exactly one string, or false if it is a union of strings.
 *
 * ```
 * IsSingleton<'a'> // true
 * IsSingleton<'a' | 'b' | 'c'> // false
 * ```
 */
export type IsSingleton<T extends string> = { [K in T]: Exclude<T, K> extends never ? true : false }[T];

/**
 * Helper type for inferring the type of the as prop from a Props type.
 *
 * For example:
 * ```
 * type Example<T> = T extends AsIntrinsicElement<infer As> ? As : never;
 * ```
 */
export type AsIntrinsicElement<As extends keyof JSX.IntrinsicElements> = { as?: As };

/**
 * Converts a union type (`A | B | C`) to an intersection type (`A & B & C`)
 */
export type UnionToIntersection<U> = (U extends unknown ? (x: U) => U : never) extends (x: infer I) => U ? I : never;

/**
 * Removes the 'ref' prop from the given Props type, leaving unions intact (such as the discriminated union created by
 * IntrinsicSlotProps). This allows IntrinsicSlotProps to be used with React.forwardRef.
 *
 * The conditional "extends unknown" (always true) exploits a quirk in the way TypeScript handles conditional
 * types, to prevent unions from being expanded.
 */
export type PropsWithoutRef<P> = 'ref' extends keyof P ? (P extends unknown ? Omit<P, 'ref'> : P) : P;

/**
 * Removes SlotShorthandValue and null from the slot type, extracting just the slot's Props object.
 */
export type ExtractSlotProps<S> = Exclude<S, SlotShorthandValue | null | undefined>;

/**
 * Defines the Props type for a component given its slots and the definition of which one is the primary slot,
 * defaulting to root if one is not provided.
 */
export type ComponentProps<Slots extends SlotPropsRecord, Primary extends keyof Slots = 'root'> =
  // Include a prop for each slot, except root if the primary slot is root
  // For more info, see the primary slot RFC: https://github.com/microsoft/fluentui/pull/18983
  (Primary extends 'root' ? Omit<Slots, 'root'> : Slots) &
    // Include all of the props of the primary slot inline in the component's props
    PropsWithoutRef<ExtractSlotProps<Slots[Primary]>>;

// TODO remove
// export type ComponentProps<Slots extends SlotPropsRecord, Primary extends keyof Slots = 'root'> =
//   // Include a prop for each slot except the primary and root slots
//   Omit<Slots, Primary | 'root'> &
//     (Primary extends 'root'
//       ? {}
//       : // If the primary slot is NOT 'root', include a prop for both primary and root
//         // For more info, see the primary slot RFC: https://github.com/microsoft/fluentui/pull/18983
//         // Use ExtractSlotProps because these slots don't allow shorthand
//         { [S in Extract<keyof Slots, Primary | 'root'>]: Exclude<Slots[S], SlotShorthandValue> }) &
//     // Include all of the props of the primary slot inline in the component's props
//     PropsWithoutRef<ExtractSlotProps<Slots[Primary]>>;

/**
 * Defines the State object of a component given its slots.
 */
export type ComponentState<Slots extends SlotPropsRecord> = {
  components: {
    [Key in keyof Slots]-?:
      | React.ComponentType<ExtractSlotProps<Slots[Key]>>
      | (ExtractSlotProps<Slots[Key]> extends AsIntrinsicElement<infer As> ? As : keyof JSX.IntrinsicElements);
  };
} & {
  // Include a prop for each slot. If the slot is nullable, then its slot props could potentially be undefined.
  [Key in keyof Required<Slots>]: ExtractSlotProps<Slots[Key]> | (null extends Slots[Key] ? undefined : never);

  // TODO remove:
  // The root and primary slots must be a props object (never null or undefined)
  // | (Slots[Key] extends null ? (Key extends Primary | 'root' ? undefined : never) : never);
  // ReplaceNullWithUndefined<Exclude<Slots[Key], SlotShorthandValue | undefined>>
};

/**
 * This is part of a hack to infer the element type from a native element *props* type.
 * The only place the original element is found in a native props type (at least that's workable
 * for inference) is in the event handlers, so some of the helper types use this event handler
 * name to infer the original element type.
 *
 * Notes:
 * - Using an extremely obscure event handler reduces the likelihood that its signature will be
 *   modified in any component's props.
 * - Inferring based on a single prop name instead of a larger type like `DOMAttributes<T>` should be
 *   less expensive for typescript to evaluate and is less likely to result in type expansion in .d.ts.
 */
type ObscureEventName = 'onLostPointerCaptureCapture';

/**
 * Return type for `React.forwardRef`, including inference of the proper typing for the ref.
 */
export type ForwardRefComponent<Props> = ObscureEventName extends keyof Props
  ? Required<Props>[ObscureEventName] extends React.PointerEventHandler<infer Element>
    ? React.ForwardRefExoticComponent<Props & React.RefAttributes<Element>>
    : never
  : never;
// A definition like this would also work, but typescript is more likely to unnecessarily expand
// the props type with this version (and it's likely much more expensive to evaluate)
// export type ForwardRefComponent<Props> = Props extends React.DOMAttributes<infer Element>
//   ? React.ForwardRefExoticComponent<Props> & React.RefAttributes<Element>
//   : never;
