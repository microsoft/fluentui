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

export type DefaultObjectShorthandProps = ObjectShorthandProps<{}, unknown, keyof JSX.IntrinsicElements>;

export type ObjectShorthandProps<
  Props extends { children?: React.ReactNode } = {},
  Ref = unknown,
  As extends keyof JSX.IntrinsicElements = never
> = Props &
  React.RefAttributes<Ref> & {
    as?: As;
    children?: Props['children'] | ShorthandRenderFunction<Props>;
  };

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
    [Key in keyof Shorthands]?: React.ElementType<NonNullable<Shorthands[Key]>> | keyof JSX.IntrinsicElements;
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
