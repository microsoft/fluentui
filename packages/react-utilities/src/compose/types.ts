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
export type UnknownSlotProps = WithSlotRenderFunction<
  Pick<React.HTMLAttributes<HTMLElement>, 'children' | 'className' | 'style'> & {
    as?: keyof JSX.IntrinsicElements;
  }
>;

/**
 * Takes the props we want to support for a slot and adds the ability for `children` to be a render function that takes
 * those props.
 */
type WithSlotRenderFunction<Props extends { children?: React.ReactNode } = {}> = Props & {
  children?: Props['children'] | SlotRenderFunction<Props>;
};

/**
 * The props type and shorthand value for a slot.
 *
 * The slot type can be either an intrinsic element like `'div'`, or a component like `typeof Button`.
 *
 * For intrinsic elements:
 * * The first param is the slot's default type if no `as` prop is specified.
 * * The second param is an optional union of alternative types that can be specified for the `as` prop.
 *
 * For components:
 * * The first param is the component's type, like `typeof Button`
 * * The second param is ignored and should not be specified
 *
 * @example
 * ```
 * // Intrinsic element examples:
 * Slot<'div'> // Slot is always div
 * Slot<'button', 'a'> // Defaults to button, but allows as="a" with anchor-specific props
 * Slot<'label', 'span' | 'div'> // Defaults to label, but allows as="span" or as="div"
 * NonNullable<Slot<'div'>> // Slot that will always be rendered and can't be set to null by the user
 *
 * // Component examples:
 * Slot<typeof Button> // Slot is always a Button, and accepts all of Button's Props
 * NonNullable<Slot<typeof Label>> // Slot is a Label and will always be rendered (can't be set to null by the user)
 * ```
 */
export type Slot<
  Type extends keyof JSX.IntrinsicElements | React.ComponentType,
  AlternateAs extends keyof JSX.IntrinsicElements = never
> =
  | (Type extends keyof JSX.IntrinsicElements
      ? IntrinsicSlotProps<Type, AlternateAs>
      : Type extends React.ComponentType
      ? ComponentSlotProps<Type>
      : Type)
  | SlotShorthandValue
  | null;

/**
 * Similar to {@link Slot}, but doesn't allow children to be specified through shorthand or props.
 *
 * This is intended to be used for element types that don't allow children, like `'input'` or `'img'`.
 */
export type SlotNoChildren<
  Type extends keyof JSX.IntrinsicElements,
  AlternateAs extends keyof JSX.IntrinsicElements = never
> =
  | (Omit<IntrinsicSlotProps<Type, AlternateAs>, 'children'> & {
      children?: SlotRenderFunction<IntrinsicSlotProps<Type, AlternateAs>>;
    })
  | null;

/**
 * The props object type for a slot that is a Component type.
 *
 * This should not be used on its own. Use {@link Slot} instead, as it allows shorthand values.
 */
type ComponentSlotProps<Component extends React.ComponentType> = Component extends React.ComponentType<infer Props>
  ? WithSlotRenderFunction<Props>
  : never;

/**
 * The props object type for a slot that is an intrinsic element type.
 *
 * This should not be used on its own. Use {@link Slot} or {@link SlotNoChildren} instead,
 * as they allow shorthand values.
 */
type IntrinsicSlotProps<
  DefaultAs extends keyof JSX.IntrinsicElements,
  AlternateAs extends keyof JSX.IntrinsicElements = never
> = IsSingleton<DefaultAs> extends false
  ? 'Error: first parameter to IntrinsicSlotProps must be a single element type, not a union of types'
  :
      | ({ as?: DefaultAs } & WithSlotRenderFunction<React.PropsWithRef<JSX.IntrinsicElements[DefaultAs]>>)
      | {
          [As in AlternateAs]: { as: As } & WithSlotRenderFunction<React.PropsWithRef<JSX.IntrinsicElements[As]>>;
        }[AlternateAs];

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
  // Include a prop for each slot (see note below)
  Omit<Slots, Primary & 'root'> &
    // Include all of the props of the primary slot inline in the component's props
    PropsWithoutRef<ExtractSlotProps<Slots[Primary]>>;

// Note: the `Omit<Slots, Primary & 'root'>` above is a little tricky. Here's what it's doing:
// * If the Primary slot is 'root', then omit the `root` slot prop.
// * Otherwise, don't omit any props: include *both* the Primary and `root` props.
//   We need both props to allow the user to specify native props for either slot because the `root` slot is
//   special and always gets className and style props, per RFC https://github.com/microsoft/fluentui/pull/18983

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
  // Include a prop for each slot, with the shorthand resolved to a props object
  // The root slot can never be null, so also exclude null from it
  [Key in keyof Slots]: Exclude<Slots[Key], SlotShorthandValue | (Key extends 'root' ? null : never)>;
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
