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

export interface ComponentProps extends GenericDictionary {
  as?: React.ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: React.Ref<any>;
  className?: string;
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
