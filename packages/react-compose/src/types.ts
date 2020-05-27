import * as React from 'react';

// tslint:disable-next-line:interface-name
export interface ShorthandConfig<TProps> {
  mappedProp?: keyof TProps;
  mappedArrayProp?: keyof TProps;
  allowsJSX?: boolean;
}

/**
 * Used for shorthand prop values.
 */
export type ShorthandValue<TProps = {}> = string | boolean | number | null | undefined | TProps | JSX.Element;

//
// "as" type safety
//

export type PropsOfElement<
  // tslint:disable-next-line:no-any
  E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>;

// tslint:disable-next-line:interface-name
export interface ComponentWithAs<TElementType extends React.ElementType = 'div', TProps = {}>
  extends React.FunctionComponent {
  <TExtendedElementType extends React.ElementType = TElementType>(
    props: Omit<PropsOfElement<TExtendedElementType>, 'as' | keyof TProps> & { as?: TExtendedElementType } & TProps,
  ): JSX.Element | null;
  displayName?: string;

  defaultProps?: Partial<TProps & { as: TElementType }>;
  propTypes?: React.WeakValidationMap<TProps> & {
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

export type ComposeOptions<TInputProps = {}, TInputStylesProps = {}, TParentProps = {}, TParentStylesProps = {}> = {
  className?: string;

  classes?: ClassDictionary | ((state: Dictionary, slots: Dictionary) => ClassDictionary);

  displayName?: string;

  defaultProps?: TInputProps;

  mapPropsToStylesProps?: (props: TParentStylesProps & TInputProps) => TInputStylesProps;

  handledProps?: (keyof TInputProps | 'as')[];
  overrideStyles?: boolean;

  slots?: Record<string, React.ElementType>;

  mapPropsToSlotProps?: (props: TParentProps & TInputProps) => Record<string, object>;

  shorthandConfig?: ShorthandConfig<TParentProps & TInputProps>;
};

export type ClassDictionary = Record<string, string>;

// tslint:disable-next-line:no-any
export type Dictionary = Record<string, any>;

export type ComposePreparedOptions<TElementType extends React.ElementType = 'div', TProps = {}, TState = TProps> = {
  className: string;
  classes: (undefined | ClassDictionary | ((state: Dictionary, slots: Dictionary) => ClassDictionary))[];
  displayName: string;
  displayNames: string[];

  mapPropsToStylesPropsChain: ((props: object) => object)[];
  render: ComposeRenderFunction<TElementType, TProps>;

  handledProps: (keyof TProps)[];
  overrideStyles: boolean;

  slots: Record<string, React.ElementType> & { __self: React.ElementType };
  mapPropsToSlotPropsChain: ((props: TProps) => Record<string, object>)[];
  resolveSlotProps: <P>(props: P) => Record<string, object>;

  shorthandConfig: ShorthandConfig<TProps>;

  resolve: (
    state: TState,
  ) => {
    state: TState;
    slotProps: Record<string, object>;
    slots: Record<string, React.ElementType>;
  };
};
