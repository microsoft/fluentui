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

export interface BaseSlots {
  root: React.ElementType;
}

export type SlotPropRenderFunction<TProps> = (Component: React.ElementType<TProps>, props: TProps) => React.ReactNode;

export type ObjectSlotProp<TProps extends GenericDictionary> = TProps & {
  children?: TProps['children'] | SlotPropRenderFunction<TProps>;
};

export type SlotProps<TSlots extends BaseSlots, TProps, TRootProps extends React.HTMLAttributes<HTMLElement>> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in keyof Omit<TSlots, 'root'>]: key extends keyof TProps ? TProps[key] : any;
} & {
  root: TRootProps;
};
