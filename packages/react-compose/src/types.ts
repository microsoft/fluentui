import * as React from 'react';

// tslint:disable-next-line:interface-name
export interface ShorthandConfig<TProps> {
  mappedProp?: keyof TProps;
  mappedArrayProp?: keyof TProps;
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

export type ComposedComponent<TProps = {}> = React.FunctionComponent<TProps> & {
  fluentComposeConfig: ComposePreparedOptions;
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

  classes?: ClassDictionary | ClassFunction | (ClassDictionary | ClassFunction)[];

  displayName?: string;

  mapPropsToStylesProps?: (props: TParentStylesProps & TInputProps) => TInputStylesProps;

  handledProps?: (keyof TInputProps | 'as')[];

  overrideStyles?: boolean;

  slots?: Record<string, React.ElementType>;

  slotProps?: (props: TParentProps & TInputProps) => Record<string, object>;

  shorthandConfig?: ShorthandConfig<TParentProps & TInputProps>;
};

/**
 * Generic name to any dictionary.
 */
// tslint:disable-next-line:no-any
export type GenericDictionary = Record<string, any>;

/**
 * Generic set of module to class name map.
 */
export type ClassDictionary = Record<string, string>;

/**
 * Generic class resolver function type.
 */
export type ClassFunction = (state: GenericDictionary, slots: GenericDictionary) => ClassDictionary;

/**
 * Merged ComposeOptions.
 */
export type ComposePreparedOptions<TProps = {}, TState = TProps> = {
  className: string;
  classes: (undefined | ClassDictionary | ClassFunction)[];

  displayName: string;
  displayNames: string[];

  mapPropsToStylesPropsChain: ((props: object) => object)[];
  render: ComposeRenderFunction;

  handledProps: (keyof TProps | 'as')[];

  overrideStyles: boolean;

  slots: Record<string, React.ElementType> & { __self: React.ElementType };
  slotProps: ((props: TProps) => Record<string, object>)[];

  resolveSlotProps: <TResolvedProps>(props: TResolvedProps) => Record<string, object>;
  shorthandConfig: ShorthandConfig<TProps>;
};
