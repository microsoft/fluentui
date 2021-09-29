import * as React from 'react';

export type ShorthandRenderFunction<Props> = (
  Component: React.ElementType<Props>,
  props: Omit<Props, 'children' | 'as'>,
) => React.ReactNode;

export type ObjectShorthandPropsRecord = Record<string, DefaultObjectShorthandProps | undefined>;

export type ShorthandProps<Props extends DefaultObjectShorthandProps> =
  | React.ReactChild
  | React.ReactNodeArray
  | React.ReactPortal
  | number
  | null // force null render
  | undefined // default render (or null render if no default provided)
  | Props;

/**
 * Matches any shorthand props type.
 *
 * This should ONLY be used in type templates as in `extends DefaultObjectShorthandProps`;
 * it shouldn't be used as the type of a slot.
 */
export type DefaultObjectShorthandProps = ObjectShorthandProps<{
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}>;

/**
 * Defines the slot props for a slot that supports a Component type.
 *
 * For intrinsic elements like 'div', use {@link IntrinsicShorthandProps} instead.
 */
export type ObjectShorthandProps<Props extends { children?: React.ReactNode } = {}> = Props & {
  children?: Props['children'] | ShorthandRenderFunction<Props>;
};

/**
 * Define the slot arguments for a slot that supports one or more intrinsic element types, such as 'div'.
 * For slots that support custom components, use {@link ObjectShorthandProps} instead.
 *
 * The first param is the slot's default type if no `as` prop is specified.
 * The second param is an optional union of alternative types that can be specified for the `as` prop.
 *
 * ```
 * IntrinsicShorthandProps<'div'> // Slot is always div
 * IntrinsicShorthandProps<'button', 'a'> // Defaults to button, but allows as="a" with anchor-specific props
 * IntrinsicShorthandProps<'label', 'span' | 'div'>; // Defaults to label, but allows as="span" or as="div"
 * ```
 */
export type IntrinsicShorthandProps<
  DefaultAs extends keyof JSX.IntrinsicElements,
  AlternateAs extends keyof JSX.IntrinsicElements = never
> = IsSingleton<DefaultAs> extends false
  ? 'Error: first parameter to IntrinsicShorthandProps must be a single element type, not a union of types'
  :
      | ({ as?: DefaultAs } & ObjectShorthandProps<React.PropsWithRef<JSX.IntrinsicElements[DefaultAs]>>)
      | {
          [As in AlternateAs]: { as: As } & ObjectShorthandProps<React.PropsWithRef<JSX.IntrinsicElements[As]>>;
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
 * IntrinsicShorthandProps). This allows IntrinsicShorthandProps to be used with React.forwardRef.
 *
 * The conditional "extends unknown" (always true) exploits a quirk in the way TypeScript handles conditional
 * types, to prevent unions from being expanded.
 */
export type PropsWithoutRef<P> = 'ref' extends keyof P ? (P extends unknown ? Omit<P, 'ref'> : P) : P;

export type ComponentProps<
  Shorthands extends ObjectShorthandPropsRecord,
  Primary extends keyof Shorthands = 'root'
> = Omit<
  {
    [Key in keyof Shorthands]?: ShorthandProps<NonNullable<Shorthands[Key]>>;
  },
  Primary
> &
  PropsWithoutRef<Shorthands[Primary]>;

export type ComponentState<Shorthands extends ObjectShorthandPropsRecord> = {
  components?: {
    [Key in keyof Shorthands]-?:
      | React.ComponentType<NonNullable<Shorthands[Key]>>
      | (NonNullable<Shorthands[Key]> extends AsIntrinsicElement<infer As> ? As : keyof JSX.IntrinsicElements);
  };
} & Shorthands;

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

/////////////////////////// COMPAT /////////////////////////////////////////////////////////////////////

export type ComponentPropsCompat = {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
};

// Shorthand types

export type ShorthandRenderFunctionCompat<TProps> = (
  Component: React.ElementType<TProps>,
  props: TProps,
) => React.ReactNode;

export type ShorthandPropsCompat<TProps extends ComponentPropsCompat = {}> =
  | React.ReactChild
  | React.ReactNodeArray
  | React.ReactPortal
  | number
  | null
  | undefined
  | ObjectShorthandPropsCompat<TProps>;

export type ObjectShorthandPropsCompat<TProps extends ComponentPropsCompat = {}> = TProps &
  Omit<ComponentPropsCompat, 'children'> & {
    children?: TProps['children'] | ShorthandRenderFunctionCompat<TProps>;
  };

export type BaseSlotsCompat = {
  root: React.ElementType;
};

export type SlotPropsCompat<
  TSlots extends BaseSlotsCompat,
  TProps,
  TRootProps extends React.HTMLAttributes<HTMLElement>
> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in keyof Omit<TSlots, 'root'>]: key extends keyof TProps ? TProps[key] : any;
} & {
  root: TRootProps;
};

/**
 * Helper type to convert the given props of type ShorthandProps into ObjectShorthandProps
 */
export type ResolvedShorthandPropsCompat<T, K extends keyof T> = Omit<T, K> &
  { [P in K]: T[P] extends ShorthandPropsCompat<infer U> ? ObjectShorthandPropsCompat<U> : T[P] };

/**
 * Helper type to mark the given props as required.
 * Similar to Required<T> except it only requires a subset of the props.
 */
export type RequiredPropsCompat<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: T[P] };

/**
 * Converts a components Props type to a State type:
 * * Ensures the specified ShorthandProps are of type ObjectShorthandProps<T>
 * * Marks the given defaulted props as required (-?)
 *
 * @template Props - The component's Props type
 * @template ShorthandPropNames - The keys of Props that correspond to ShorthandProps
 * @template DefaultedPropNames - The keys of Props that will always have a default value provided
 */
export type ComponentStateCompat<
  Props,
  ShorthandPropNames extends keyof Props = never,
  DefaultedPropNames extends keyof ResolvedShorthandPropsCompat<Props, ShorthandPropNames> = never
> = RequiredPropsCompat<ResolvedShorthandPropsCompat<Props, ShorthandPropNames>, DefaultedPropNames>;
