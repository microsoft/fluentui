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
  ref: React.Ref<T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : T>,
  composeOptions: ComposePreparedOptions,
) => React.ReactElement | null;

export type ComposeOptions<InputProps = {}, InputStylesProps = {}, ParentProps = {}, ParentStylesProps = {}> = {
  className?: string;
  classes?: ClassDictionary;
  displayName?: string;

  mapPropsToStylesProps?: (props: ParentStylesProps & InputProps) => InputStylesProps;

  handledProps?: (keyof InputProps | 'as')[];
  overrideStyles?: boolean;

  slots?: Record<string, React.ElementType>;

  mapPropsToSlotProps?: (props: ParentProps & InputProps) => Record<string, object>;

  shorthandConfig?: ShorthandConfig<ParentProps & InputProps>;
};

// tslint:disable-next-line:no-any
export type GenericDictionary = Record<string, any>;

export type ClassDictionary = Record<string, string>;

export type ComposePreparedOptions<Props = {}> = {
  className: string;
  classes: ClassDictionary;
  displayName: string;
  displayNames: string[];

  mapPropsToStylesPropsChain: ((props: object) => object)[];
  render: ComposeRenderFunction;

  handledProps: (keyof Props)[];
  overrideStyles: boolean;

  slots: Record<string, React.ElementType> & { __self: React.ElementType };
  mapPropsToSlotPropsChain: ((props: Props) => Record<string, object>)[];

  resolveSlotProps: <P>(props: P) => Record<string, object>;
  shorthandConfig: ShorthandConfig<Props>;
};
