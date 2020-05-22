import * as React from 'react';

// tslint:disable-next-line:interface-name
export interface ShorthandConfig<P> {
  mappedProp?: keyof P;
  mappedArrayProp?: keyof P;
  allowsJSX?: boolean;
}

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

export type ComposedComponent<
  // tslint:disable-next-line:no-any
  TElementType extends React.ElementType<any> = 'div',
  TProps = {},
  TState = TProps
> = React.FunctionComponent<TProps> & {
  fluentComposeConfig: ComposePreparedOptions<TElementType, TProps, TState>;
};

export type InputComposeComponent<TProps = {}> = React.FunctionComponent<TProps> & {
  fluentComposeConfig?: ComposePreparedOptions;
};

export type Input<TElementType extends React.ElementType = 'div', TProps = {}> =
  | InputComposeComponent<TProps>
  | ComposeRenderFunction<TElementType, TProps & { as?: React.ElementType }>;

export type ComposeRenderFunction<TElementType extends React.ElementType = 'div', TProps = {}> = (
  props: TProps,
  ref: React.Ref<TElementType extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[TElementType] : TElementType>,
  composeOptions: ComposePreparedOptions,
) => React.ReactElement | null;

export type ComposeOptions<
  TInputProps = {},
  TInputStylesProps = {},
  TParentStylesProps = {},
  TInputState = TInputProps
> = {
  className?: string;
  classes?: ClassDictionary | ((state: TInputState) => ClassDictionary);

  displayName?: string;

  defaultProps?: TInputProps;

  mapPropsToStylesProps?: (props: TParentStylesProps & TInputProps) => TInputStylesProps;

  handledProps?: (keyof TInputProps | 'as')[];
  overrideStyles?: boolean;

  slots?: Record<string, React.ElementType>;

  mapPropsToSlotProps?: (props: TInputProps) => Record<string, object>;

  shorthandConfig?: ShorthandConfig<TInputProps>;
};

export type ClassDictionary = {
  [key: string]: string;
};

export type Dictionary = {
  // tslint:disable-next-line: no-any
  [key: string]: any;
};

export type ComposePreparedOptions<TElementType extends React.ElementType = 'div', TProps = {}, TState = TProps> = {
  className: string;
  classes: (
    | undefined
    | ClassDictionary
    | ((state: TState, slots: ComposePreparedOptions['slots']) => ClassDictionary)
  )[];
  displayName: string;
  displayNames: string[];

  mapPropsToStylesPropsChain: ((props: object) => object)[];
  render: ComposeRenderFunction<TElementType, TProps>;

  handledProps: (keyof TProps)[];
  overrideStyles: boolean;

  slots: Record<string, React.ElementType> & { __self: React.ElementType };
  mapPropsToSlotPropsChain: ((props: TProps) => Record<string, object>)[];

  // deprecate in favor of "resolve"
  resolveSlotProps: <P>(props: P) => Record<string, object>;

  resolve: (
    state: TState,
  ) => {
    state: TState;
    slotProps: Record<string, object>;
    slots: Record<string, React.ElementType>;
  };

  shorthandConfig: ShorthandConfig<TProps>;
};
