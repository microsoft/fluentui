import * as React from 'react';

export interface ShorthandConfig<TProps> {
  mappedProp?: keyof TProps;
  mappedArrayProp?: keyof TProps;
  allowsJSX?: boolean;
}

//
// "as" type safety
//

export type PropsOfElement<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any> | ComponentWithAs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = E extends { __PRIVATE_PROPS: any }
  ? E['__PRIVATE_PROPS']
  : JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>;

export type ComponentWithAs<TElementType extends keyof JSX.IntrinsicElements = 'div', TProps = {}> = (<
  TExtendedElementType extends React.ElementType = TElementType
>(
  props: Omit<PropsOfElement<TExtendedElementType>, 'as' | keyof TProps> & { as?: TExtendedElementType } & TProps,
) => JSX.Element) & {
  propTypes?: React.WeakValidationMap<TProps> & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    as: React.Requireable<string | ((props: any, context?: any) => any) | (new (props: any, context?: any) => any)>;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<TProps & { as: TElementType }>;
  displayName?: string;

  /**
   * A hack to simplify the resolution for ComponentWithAs.
   * @see https://github.com/microsoft/fluentui/pull/13841
   */
  readonly __PRIVATE_PROPS?: Omit<PropsOfElement<TElementType>, 'as' | keyof TProps> & { as?: TElementType } & TProps;
};

export type ForwardRefWithAs<
  TElementType extends keyof JSX.IntrinsicElements = 'div',
  TRef extends HTMLElement = HTMLElement,
  TProps = {}
> = (<TExtendedElementType extends React.ElementType = TElementType>(
  props: React.RefAttributes<TRef> &
    Omit<PropsOfElement<TExtendedElementType>, 'as' | keyof TProps> & { as?: TExtendedElementType } & TProps,
) => JSX.Element) & {
  propTypes?: React.WeakValidationMap<TProps> & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    as: React.Requireable<string | ((props: any, context?: any) => any) | (new (props: any, context?: any) => any)>;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<TProps & { as: TElementType }>;
  displayName?: string;

  /**
   * A hack to simplify the resolution for ComponentWithAs.
   * @see https://github.com/microsoft/fluentui/pull/13841
   */
  readonly __PRIVATE_PROPS?: React.RefAttributes<TRef> &
    Omit<PropsOfElement<TElementType>, 'as' | keyof TProps> & { as?: TElementType } & TProps;
};

//
// Compose types
//

export type ComposedComponent<TProps = {}> = React.FunctionComponent<TProps> & {
  fluentComposeConfig: Required<ComposePreparedOptions>;
};

export type InputComposeComponent<TProps = {}> = React.FunctionComponent<TProps> & {
  fluentComposeConfig?: Required<ComposePreparedOptions>;
};

export type Input<TElementType extends React.ElementType = 'div', TProps = {}> =
  | InputComposeComponent<TProps>
  | ComposeRenderFunction<TElementType, TProps & { as?: React.ElementType }>;

export type ComposeRenderFunction<
  TElementType extends React.ElementType = 'div',
  TProps = {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _TState = TProps
> = (
  props: TProps,
  ref: React.Ref<TElementType extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[TElementType] : TElementType>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: ComposePreparedOptions & { state: any },
) => React.ReactElement | null;

export type ComposeOptions<
  TInputProps = {},
  TInputStylesProps = {},
  TParentProps = {},
  TParentStylesProps = {},
  TState = TParentProps & TInputProps
> = {
  className?: string;

  classes?: ClassDictionary | ClassFunction | (ClassDictionary | ClassFunction)[];

  displayName?: string;

  mapPropsToStylesProps?: (props: TParentStylesProps & TInputProps) => TInputStylesProps;

  handledProps?: (keyof TInputProps | 'as')[];

  overrideStyles?: boolean;

  slots?: Record<string, React.ElementType>;

  slotProps?: (props: TParentProps & TInputProps) => Record<string, object>;

  shorthandConfig?: ShorthandConfig<TParentProps & TInputProps>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state?: (props: TState, ref: React.Ref<HTMLElement>, options: ComposePreparedOptions) => any;
};

export type MergePropsResult<
  TState extends GenericDictionary,
  TSlots = GenericDictionary,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TSlotProps = { [key in keyof TSlots]: any }
> = {
  state: TState;
  slots: TSlots;
  slotProps: TSlotProps;
};

/**
 * Generic name to any dictionary.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComposePreparedOptions<TProps = {}, TInputState = any, TParentState = TProps> = {
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

  state: (props: TParentState, ref: React.Ref<HTMLElement>, options: ComposePreparedOptions) => TInputState;

  resolveSlotProps: <TResolvedProps>(props: TResolvedProps) => Record<string, object>;
  shorthandConfig: ShorthandConfig<TProps>;
};

//
// Component types
//

export interface ComponentProps {
  as?: React.ElementType;

  className?: string;
}

export interface BaseSlots {
  root: React.ElementType;
}

export type SlotProps<TSlots extends BaseSlots, TProps, TRootProps extends React.HTMLAttributes<HTMLElement>> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in keyof Omit<TSlots, 'root'>]: key extends keyof TProps ? TProps[key] : any;
} & {
  root: TRootProps;
};

//
// Slot Prop / Shorthand types
//

export type SlotPropRenderFunction<TProps> = (Component: React.ElementType<TProps>, props: TProps) => React.ReactNode;

export type ObjectSlotProp<TProps extends GenericDictionary> = TProps & {
  children?: TProps['children'] | SlotPropRenderFunction<TProps>;
};

export type SlotProp<TProps> =
  | React.ReactChild
  | React.ReactNode[]
  | React.ReactPortal
  | boolean
  | null
  | undefined
  | ObjectSlotProp<TProps>;

//
//
//

export const defaultComposeOptions: Required<ComposePreparedOptions> = {
  className: process.env.NODE_ENV === 'production' ? '' : 'no-classname-🙉',
  classes: [],
  displayName: '',
  displayNames: [],
  mapPropsToStylesPropsChain: [],
  render: () => null,
  handledProps: [] as never[],
  overrideStyles: false,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  slots: { __self: () => null },
  slotProps: [],
  state: props => props,
  resolveSlotProps: () => ({}),
  shorthandConfig: {},
};

/**
 * A set of mapped props for intrinsic element types.
 */
export const defaultMappedProps: Record<string, string> = {
  iframe: 'src',
  img: 'src',
  input: 'type',
};

/**
 * React.ForwardRef with static props
 */
export type ForwardRefComponent<TProps> = React.ForwardRefExoticComponent<
  TProps & React.RefAttributes<HTMLInputElement>
> & {
  handledProps: (keyof TProps)[];
};
