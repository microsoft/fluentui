import * as React from 'react';

/**
 * Generic name to any dictionary.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericDictionary = Record<string, any>;

/**
 * Class dictionary.
 */
export type ClassDictionary = Record<string, string>;

export interface ComponentProps {
  as?: React.ElementType;
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
  | (TProps &
      ComponentProps & {
        children?: TProps['children'] | ShorthandRenderFunction<TProps>;
      });

export type ObjectShorthandProps<TProps extends ComponentProps = {}> = TProps &
  ComponentProps & {
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
export type ResolvedShorthandProps<Props, ShorthandPropNames extends keyof Props> = Omit<Props, ShorthandPropNames> &
  { [P in ShorthandPropNames]: Props[P] extends ShorthandProps<infer T> ? ObjectShorthandProps<T> : never };

/**
 * Helper type to mark the given props as required.
 * Similar to Required<T> except it only requires a subset of the props.
 */
export type RequiredProps<Props, RequiredProps extends keyof Props> = Omit<Props, RequiredProps> &
  { [P in RequiredProps]-?: Props[P] };

/**
 * Converts a components Props type to a State type:
 * * Adds the 'ref' and 'as' types as required values
 * * Ensures the specified ShorthandProps are of type ObjectShorthandProps<T>
 * * Marks the given DefaultedProps as required (-?)
 */
export type ComponentState<
  Props extends ComponentProps,
  ShorthandProps extends keyof Props = never,
  DefaultedProps extends keyof ResolvedShorthandProps<Props, ShorthandProps> = never
> = RequiredProps<ResolvedShorthandProps<Props, ShorthandProps>, DefaultedProps> & {
  as: React.ElementType;
  ref: React.Ref<HTMLElement>;
};
