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
 * For intrinsic elements like 'div', use {@link ElementShorthandProps} instead.
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
 * ElementShorthandProps<'div'> // Slot is always a <div>
 * ElementShorthandProps<'a', 'button'> // Defaults to <a>, but allows { as: 'button' } to be a <button>
 * ElementShorthandProps<'label', 'span' | 'div'>; // Defaults to <label>, but allows { as: 'span' } or { as: 'div' }
 * ```
 */
export type ElementShorthandProps<
  DefaultElement extends keyof JSX.IntrinsicElements,
  AlternateElements extends keyof JSX.IntrinsicElements = never
> = IsSingleton<DefaultElement> extends false
  ? 'Error: first parameter to ElementShorthandProps must be a single element type, not a union of types'
  :
      | ({ as?: DefaultElement } & ObjectShorthandProps<NoLegacyRef<JSX.IntrinsicElements[DefaultElement]>>)
      | {
          [As in AlternateElements]: { as: As } & ObjectShorthandProps<NoLegacyRef<JSX.IntrinsicElements[As]>>;
        }[AlternateElements];

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
 * Excludes LegacyRef (string) from the ref prop of the given Props type
 */
export type NoLegacyRef<Props extends { ref?: unknown }> = Omit<Props, 'ref'> & { ref?: Exclude<Props['ref'], string> };

export type ComponentProps<
  Shorthands extends ObjectShorthandPropsRecord,
  Primary extends keyof Shorthands = 'root'
> = Omit<
  {
    [Key in keyof Shorthands]?: ShorthandProps<NonNullable<Shorthands[Key]>>;
  },
  Primary
> &
  Shorthands[Primary];

export type ComponentState<Shorthands extends ObjectShorthandPropsRecord> = {
  components?: {
    [Key in keyof Shorthands]-?:
      | React.ComponentType<NonNullable<Shorthands[Key]>>
      | (NonNullable<Shorthands[Key]> extends { as?: infer As } ? As : keyof JSX.IntrinsicElements);
  };
} & Shorthands;

/////////////////////////// COMPAT /////////////////////////////////////////////////////////////////////

export interface ComponentPropsCompat {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
}

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

export interface BaseSlotsCompat {
  root: React.ElementType;
}

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
