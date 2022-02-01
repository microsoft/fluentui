import * as React from 'react';

export type SlotRenderFunction<Props> = (
  Component: React.ElementType<Props>,
  props: Omit<Props, 'children' | 'as'>,
) => React.ReactNode;

export type SlotPropsRecord = Record<string, UnknownSlotProps | ShorthandValue | null | undefined>;

export type ShorthandValue = React.ReactChild | React.ReactNodeArray | React.ReactPortal;

/**
 * Matches any slot props type.
 *
 * This should ONLY be used in type templates as in `extends DefaultObjectSlotProps`;
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
export type WithSlotRenderFunction<Props extends { children?: React.ReactNode } = {}> = Props & {
  children?: Props['children'] | SlotRenderFunction<Props>;
};

export type SlotPropsObject<
  Type extends keyof JSX.IntrinsicElements | React.ComponentType,
  AlternateAs extends keyof JSX.IntrinsicElements = never
> = Type extends keyof JSX.IntrinsicElements
  ? IntrinsicSlotPropsObject<Type, AlternateAs>
  : Type extends React.ComponentType<infer Props>
  ? Props
  : never;

export type Slot<
  Type extends keyof JSX.IntrinsicElements | React.ComponentType,
  AlternateAs extends keyof JSX.IntrinsicElements = never
> = WithSlotRenderFunction<SlotPropsObject<Type, AlternateAs>> | ShorthandValue | null;

export type SlotNoChildren<
  Type extends keyof JSX.IntrinsicElements,
  AlternateAs extends keyof JSX.IntrinsicElements = never
> = WithSlotRenderFunction<IntrinsicSlotPropsObject<Type, AlternateAs> & { children?: never }> | null;

/**
 * Defines the slot props for a slot that supports a Component type.
 *
 * For intrinsic/native elements like 'div', use {@link IntrinsicSlotPropsObject} instead.
 *
 * The generic param is the type of a control, i.e. a React component. For example:
 *
 * @example
 * ```
 * type Props = {...}
 * const Button: React.FC<Props> = () => {...}
 * // $ExpectType ...
 * type SlotProps = ComponentSlotPropsObject<typeof Button>
 * ```
 */
export type ComponentSlotPropsObject<Component extends React.ComponentType> = Component extends React.ComponentType<
  infer Props
>
  ? WithSlotRenderFunction<Props>
  : never;

/**
 * Define the slot arguments for a slot that supports one or more intrinsic element types, such as 'div'.
 * For slots that support custom components, use {@link ComponentSlotPropsObject} instead.
 *
 * The first param is the slot's default type if no `as` prop is specified.
 * The second param is an optional union of alternative types that can be specified for the `as` prop.
 *
 * ```
 * IntrinsicSlotPropsObject<'div'> // Slot is always div
 * IntrinsicSlotPropsObject<'button', 'a'> // Defaults to button, but allows as="a" with anchor-specific props
 * IntrinsicSlotPropsObject<'label', 'span' | 'div'>; // Defaults to label, but allows as="span" or as="div"
 * ```
 */
export type IntrinsicSlotPropsObject<
  DefaultAs extends keyof JSX.IntrinsicElements,
  AlternateAs extends keyof JSX.IntrinsicElements = never
> =
  | ({ as?: DefaultAs } & React.PropsWithRef<JSX.IntrinsicElements[DefaultAs]>)
  | {
      [As in AlternateAs]: { as: As } & React.PropsWithRef<JSX.IntrinsicElements[As]>;
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
 * IntrinsicSlotPropsObject). This allows IntrinsicSlotPropsObject to be used with React.forwardRef.
 *
 * The conditional "extends unknown" (always true) exploits a quirk in the way TypeScript handles conditional
 * types, to prevent unions from being expanded.
 */
export type PropsWithoutRef<P> = 'ref' extends keyof P ? (P extends unknown ? Omit<P, 'ref'> : P) : P;

/**
 * Given a Slot with shorthand values, extracts the SlotPropsObject type.
 */
export type ExtractSlotProps<TSlot> = Exclude<TSlot, ShorthandValue | null | undefined>;

/**
 * Defines the Props type for a component given its slots and the definition of which one is the primary slot,
 * defaulting to root if one is not provided.
 */
export type ComponentProps<Slots extends SlotPropsRecord, Primary extends keyof Slots = 'root'> =
  // Include shorthand slot props for each of the component's slots.
  // This `Omit<..., Primary & 'root'>` is a little tricky. Here's what it's doing:
  // * If the Primary slot is 'root', then omit the `root` slot prop.
  // * Otherwise, don't omit any props: include *both* the Primary and `root` props.
  //   We need both props to allow the user to specify native props for either slot because the `root` slot is
  //   special and always gets className and style props, per RFC https://github.com/microsoft/fluentui/pull/18983
  Omit<Slots, Primary & 'root'> & PropsWithoutRef<ExtractSlotProps<Slots[Primary]>>;

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
  [Key in keyof Slots]: Exclude<Slots[Key], ShorthandValue | (Key extends 'root' ? null : never)>;
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
