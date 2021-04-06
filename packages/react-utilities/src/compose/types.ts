import * as React from 'react';

/**
 * Generic name to any dictionary.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericDictionary = Record<string, any>;

export interface ComponentProps {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}

// Shorthand types

export type ShorthandRenderFunction<TProps> = (Component: React.ElementType<TProps>, props: TProps) => React.ReactNode;

export type ShorthandProps<TProps extends ComponentProps = {}> =
  | React.ReactChild
  | React.ReactNodeArray
  | React.ReactPortal
  | boolean
  | number
  | null
  | undefined
  | ObjectShorthandProps<TProps>;

export type ObjectShorthandProps<TProps extends ComponentProps = {}> = TProps &
  Omit<ComponentProps, 'children'> & {
    children?: TProps['children'] | ShorthandRenderFunction<TProps>;
  };

export interface BaseSlots {
  root: React.ElementType;
}

export type SlotProps<TSlots extends BaseSlots, TProps, TRootProps extends React.HTMLAttributes<HTMLElement>> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in keyof Omit<TSlots, 'root'>]: key extends keyof TProps ? TProps[key] : any;
} & {
  root: TRootProps;
};

/**
 * Helper type to convert the given props of type ShorthandProps into ObjectShorthandProps
 */
export type ResolvedShorthandProps<T, K extends keyof T> = Omit<T, K> &
  { [P in K]: T[P] extends ShorthandProps<infer U> ? ObjectShorthandProps<U> : T[P] };

/**
 * Helper type to mark the given props as required.
 * Similar to Required<T> except it only requires a subset of the props.
 */
export type RequiredProps<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: T[P] };

/**
 * Converts a components Props type to a State type:
 * * Adds the 'ref' and 'as' props
 * * Ensures the specified ShorthandProps are of type ObjectShorthandProps<T>
 * * Marks the given DefaultedProps as required (-?)
 *
 * @param Props - The component's Props type
 * @param RefType - The type of the state.ref property; e.g. `React.Ref<HTMLElement>`
 * @param ShorthandProps - The keys of Props that correspond to ShorthandProps
 * @param DefaultedProps - The keys of Props that will always have a default value provided
 */
export type ComponentState<
  RefType,
  Props,
  ShorthandProps extends keyof Props = never,
  DefaultedProps extends keyof ResolvedShorthandProps<Props, ShorthandProps> = never
> = RequiredProps<ResolvedShorthandProps<Props, ShorthandProps>, DefaultedProps> & {
  as?: keyof JSX.IntrinsicElements;
  ref: RefType;
};
