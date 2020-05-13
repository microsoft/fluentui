import * as React from 'react';

// ========================================================
// Utility types
// ========================================================

type Extendable<T, V = any> = T & {
  [key: string]: V;
};

//
// "as" type safety
//

export type PropsOfElement<
  // tslint:disable-next-line:no-any
  E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>;

// tslint:disable-next-line:interface-name
export interface ComponentWithAs<E extends React.ElementType = 'div', P = {}> extends React.FunctionComponent {
  <EE extends React.ElementType = E>(
    props: Omit<PropsOfElement<EE>, 'as' | keyof P> & { as?: EE } & P,
  ): JSX.Element | null;
  displayName?: string;

  defaultProps?: Partial<P & { as: E }>;
  propTypes?: React.WeakValidationMap<P> & {
    // tslint:disable-next-line:no-any
    as: React.Requireable<string | ((props: any, context?: any) => any) | (new (props: any, context?: any) => any)>;
  };
}

//
// Compose types
//

export type ComposedComponent<P = {}> = React.FunctionComponent<P> & {
  fluentComposeConfig: ComposePreparedOptions;
};

export type InputComposeComponent<P = {}> = React.FunctionComponent<P> & {
  fluentComposeConfig?: ComposePreparedOptions;
};

export type Input<T extends React.ElementType = 'div', P = {}> =
  | InputComposeComponent<P>
  | ComposeRenderFunction<T, P & { as?: React.ElementType }>;

export type ComposeRenderFunction<T extends React.ElementType = 'div', P = {}> = (
  props: P,
  ref: React.Ref<T>,
  composeOptions: ComposePreparedOptions,
) => React.ReactElement | null;

export type ComposeOptions<InputProps = {}, InputStylesProps = {}, ParentStylesProps = {}> = {
  className?: string;
  displayName?: string;

  mapPropsToStylesProps?: (props: ParentStylesProps & InputProps) => InputStylesProps;

  handledProps?: (keyof InputProps | 'as')[];
  overrideStyles?: boolean;

  slots?: Record<string, React.ElementType>;

  mapPropsToSlotProps?: (props: Extendable<InputProps>) => Record<string, object>;
};

export type ComposePreparedOptions<Props = {}> = {
  className: string;
  displayName: string;
  displayNames: string[];

  mapPropsToStylesPropsChain: ((props: object) => object)[];
  render: ComposeRenderFunction;

  handledProps: (keyof Props)[];
  overrideStyles: boolean;

  slots: Record<string, React.ElementType>;
  mapPropsToSlotPropsChain: ((props: Extendable<Props>) => Record<string, object>)[];

  resolveSlotProps: <P>(props: P) => Record<string, object>;
};
