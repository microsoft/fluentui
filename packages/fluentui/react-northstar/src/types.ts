import { ShorthandConfig } from '@fluentui/react-bindings';
import * as React from 'react';

import { ShorthandFactory } from './utils/factories';

// ========================================================
// Utilities
// ========================================================

export type ResultOf<T> = T extends (...arg: any[]) => infer TResult ? TResult : never;

export type ObjectOf<T> = { [key: string]: T };

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// ========================================================
// Components
// ========================================================

export type FluentComponentStaticProps<P = {}> = {
  handledProps: (keyof P)[];
  create?: ShorthandFactory<P>;
  shorthandConfig?: ShorthandConfig<P>;
};

// ========================================================
// Props
// ========================================================

export type Props<T = {}> = T & ObjectOf<any>;
export type ReactChildren = React.ReactNode[] | React.ReactNode;

export type ComponentEventHandler<TProps> = (event: React.SyntheticEvent<HTMLElement>, data?: TProps) => void;

export type ComponentKeyboardEventHandler<TProps> = (event: React.KeyboardEvent<any>, data?: TProps) => void;

export type InstanceOf<T> = T extends { new (...args: any[]): infer TInstance } ? TInstance : never;

export type PropsOf<T> = T extends React.Component<infer TProps>
  ? TProps
  : T extends React.FunctionComponent<infer TProps>
  ? TProps
  : T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T]
  : never;

// ========================================================
// Shorthand Factories
// ========================================================

export type ShorthandRenderFunction<P> = (Component: React.ElementType<P>, props: P) => React.ReactNode;

// The ReactFragment here is replaced from the original typings with React.ReactNode[] because of incorrect inheriting of the type when it is defined as {}
type ReactNode = React.ReactChild | React.ReactNode[] | React.ReactPortal | boolean | null | undefined;

export type ShorthandValue<P extends Props> = ReactNode | ObjectShorthandValue<P>;

type KindSelector<T> = {
  [P in keyof T]: { kind?: P } & T[P];
}[keyof T];

export type ShorthandCollection<Props, Kinds = Record<string, {}>> = ShorthandValue<
  Props | (KindSelector<Kinds> & Props)
>[];

export type ObjectShorthandValue<P extends Props> = Props<P> & {
  children?: P['children'] | ShorthandRenderFunction<P>;
};

export type ObjectShorthandCollection<P, K = never> = ObjectShorthandValue<P & { kind?: K }>[];
