import * as React from 'react';
import { SLOT_CLASS_NAME_PROP_SYMBOL, SLOT_ELEMENT_TYPE_SYMBOL, SLOT_RENDER_FUNCTION_SYMBOL } from './constants';
import type {
  ComponentType,
  FunctionComponent,
  NamedExoticComponent,
  PropsWithoutChildren,
  PropsWithoutRef,
  ReactNode,
  ReactVersionDependent,
  ReplaceNullWithUndefined,
  JSXIntrinsicElementKeys,
  JSXIntrinsicElement,
} from '../utils/types';

export type SlotRenderFunction<Props> = (Component: React.ElementType<Props>, props: Omit<Props, 'as'>) => ReactNode;

/**
 * Matches any component's Slots type (such as ButtonSlots).
 *
 * This should ONLY be used in type templates as in `extends SlotPropsRecord`;
 * it shouldn't be used as a component's Slots type.
 */
export type SlotPropsRecord = Record<string, UnknownSlotProps | SlotShorthandValue | null | undefined>;

/**
 * The shorthand value of a slot allows specifying its child
 */
export type SlotShorthandValue = React.ReactElement | string | number | Iterable<ReactNode> | React.ReactPortal;

/**
 * Matches any slot props type.
 *
 * This should ONLY be used in type templates as in `extends UnknownSlotProps`;
 * it shouldn't be used as the type of a slot.
 */
export type UnknownSlotProps = Pick<React.HTMLAttributes<HTMLElement>, 'className' | 'style'> & {
  as?: JSXIntrinsicElementKeys;
  children?: ReactNode;
};

/**
 * Helper type for {@link Slot}. Adds shorthand types that are assignable to the slot's `children`.
 */
type WithSlotShorthandValue<Props> =
  | Props
  | ('children' extends keyof Props ? Extract<SlotShorthandValue, Props['children']> : never);

/**
 * @internal
 * Helper type for {@link Slot}. Takes the props we want to support for a slot and adds the ability for `children`
 * to be a render function that takes those props.
 *
 * Notes: For React 17 and earlier, `children` can be a render function that returns a ReactNode.
 * For React 18 and later, `children` can be any value, as React.ReactNode is a more strict type and does not allow functions anymore.
 * This means that the render functions need to be asserted as `SlotRenderFunction<Props>` for React 18 and later.
 *
 * @example
 * ```tsx
 * // For React 17 and earlier:
 * <Component slot={{ children: (Component, props) => <Component {...props} /> }} />
 *
 * // For React 18 and later:
 * <Component slot={{ children: (Component, props) => <Component {...props} /> as SlotRenderFunction<SlotProps> }} />
 * ```
 */
export type WithSlotRenderFunction<Props> = PropsWithoutChildren<Props> & {
  children?: 'children' extends keyof Props
    ? ReactVersionDependent<ReactNode, Props['children'] | SlotRenderFunction<Props>>
    : never;
};

/**
 * @internal
 */
export type WithoutSlotRenderFunction<Props> = Props extends unknown
  ? 'children' extends keyof Props
    ? Omit<Props, 'children'> & { children?: Exclude<Props['children'], Function> }
    : Props
  : never;

/**
 * HTML element types that are not allowed to have children.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Glossary/Empty_element
 */
type EmptyIntrinsicElements =
  | 'area'
  | 'base'
  | 'br'
  | 'col'
  | 'embed'
  | 'hr'
  | 'img'
  | 'input'
  | 'link'
  | 'meta'
  | 'param'
  | 'source'
  | 'track'
  | 'wbr';

/**
 * Helper type for {@link Slot}. Modifies `JSXIntrinsicElements<Type>`:
 * * Removes legacy string ref.
 * * Disallows children for empty tags like 'img'.
 */
type IntrinsicElementProps<Type extends JSXIntrinsicElementKeys> = Type extends EmptyIntrinsicElements
  ? PropsWithoutChildren<React.PropsWithRef<JSXIntrinsicElement<Type>>>
  : React.PropsWithRef<JSXIntrinsicElement<Type>>;

/**
 * The props type and shorthand value for a slot. Type is either a single intrinsic element like `'div'`,
 * or a component like `typeof Button`.
 *
 * If a slot needs to support multiple intrinsic element types, use the `AlternateAs` param (see examples below).
 *
 * By default, slots can be set to `null` to prevent them from being rendered. If a slot must always be rendered,
 * wrap with `NonNullable` (see examples below).
 *
 * @example
 * ```
 * // Intrinsic element examples:
 * Slot<'div'> // Slot is always div
 * Slot<'button', 'a'> // Defaults to button, but allows as="a" with anchor-specific props
 * Slot<'span', 'div' | 'pre'> // Defaults to span, but allows as="div" or as="pre"
 * NonNullable<Slot<'div'>> // Slot that will always be rendered (can't be set to null by the user)
 *
 * // Component examples:
 * Slot<typeof Button> // Slot is always a Button, and accepts all of Button's Props
 * NonNullable<Slot<typeof Label>> // Slot is a Label and will always be rendered (can't be set to null by the user)
 * ```
 */
export type Slot<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Type extends JSXIntrinsicElementKeys | ComponentType<any> | UnknownSlotProps,
  AlternateAs extends JSXIntrinsicElementKeys = never,
> = IsSingleton<Extract<Type, string>> extends true
  ?
      | WithSlotShorthandValue<
          Type extends JSXIntrinsicElementKeys // Intrinsic elements like `div`
            ? { as?: Type } & WithSlotRenderFunction<IntrinsicElementProps<Type>>
            : Type extends ComponentType<infer Props> // Component types like `typeof Button`
            ? Props extends UnknownSlotProps
              ? Props
              : WithSlotRenderFunction<Props>
            : Type // Props types like `ButtonProps`
        >
      | (AlternateAs extends unknown
          ? { as: AlternateAs } & WithSlotRenderFunction<IntrinsicElementProps<AlternateAs>>
          : never)
      | null
  : 'Error: First parameter to Slot must not be not a union of types. See documentation of Slot type.';

/**
 * Evaluates to true if the given type contains exactly one string, or false if it is a union of strings.
 *
 * ```
 * IsSingleton<'a'> // true
 * IsSingleton<'a' | 'b' | 'c'> // false
 * ```
 */
export type IsSingleton<T extends string> = { [K in T]: Exclude<T, K> extends never ? true : false }[T];

/**
 * Helper type for inferring the type of the as prop from a Props type.
 *
 * For example:
 * ```
 * type Example<T> = T extends AsIntrinsicElement<infer As> ? As : never;
 * ```
 */
export type AsIntrinsicElement<As extends JSXIntrinsicElementKeys> = { as?: As };

/**
 * Removes SlotShorthandValue and null from the slot type, extracting just the slot's Props object.
 */
export type ExtractSlotProps<S> = Exclude<S, SlotShorthandValue | null | undefined>;

/**
 * Defines the Props type for a component given its slots and the definition of which one is the primary slot,
 * defaulting to root if one is not provided.
 */
export type ComponentProps<Slots extends SlotPropsRecord, Primary extends keyof Slots = 'root'> =
  // Include a prop for each slot (see note below about the Omit)
  // Note: the `Omit<Slots, Primary & 'root'>` here is a little tricky. Here's what it's doing:
  // * If the Primary slot is 'root', then omit the `root` slot prop.
  // * Otherwise, don't omit any props: include *both* the Primary and `root` props.
  //   We need both props to allow the user to specify native props for either slot because the `root` slot is
  //   special and always gets className and style props, per RFC https://github.com/microsoft/fluentui/pull/18983
  Omit<Slots, Primary & 'root'> &
    // Include all of the props of the primary slot inline in the component's props
    PropsWithoutRef<ExtractSlotProps<Slots[Primary]>>;

/**
 * Defines the State object of a component given its slots.
 */
export type ComponentState<Slots extends SlotPropsRecord> = {
  /**
   * @deprecated
   * The base element type for each slot.
   * This property is deprecated and will be removed in a future version.
   * The slot base element type is declared through `slot.*(slotShorthand, {elementType: ElementType})` instead.
   */
  components: {
    [Key in keyof Slots]-?: React.ElementType;
  };
} & {
  // Include a prop for each slot, with the shorthand resolved to a props object
  // The root slot can never be null, so also exclude null from it
  [Key in keyof Slots]: ReplaceNullWithUndefined<
    WithoutSlotRenderFunction<Exclude<Slots[Key], SlotShorthandValue | (Key extends 'root' ? null : never)>>
  >;
};

/**
 * This is part of a hack to infer the element type from a native element *props* type.
 * The only place the original element is found in a native props type (at least that's workable
 * for inference) is in the event handlers, so some of the helper types use this event handler
 * name to infer the original element type.
 *
 * Notes:
 * - Using an extremely obscure event handler reduces the likelihood that its signature will be
 *   modified in any component's props.
 * - Inferring based on a single prop name instead of a larger type like `DOMAttributes<T>` should be
 *   less expensive for typescript to evaluate and is less likely to result in type expansion in .d.ts.
 */
type ObscureEventName = 'onLostPointerCaptureCapture';

/**
 * Infers the element type from props that are declared using ComponentProps.
 */
export type InferredElementRefType<Props> = ObscureEventName extends keyof Props
  ? Required<Props>[ObscureEventName] extends React.PointerEventHandler<infer Element>
    ? Element
    : never
  : never;

/**
 * Return type for `React.forwardRef`, including inference of the proper typing for the ref.
 *
 * @remarks
 * {@link React.RefAttributes} is {@link https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/69756 | leaking string references} into `forwardRef` components
 *  after introducing {@link https://github.com/DefinitelyTyped/DefinitelyTyped/pull/68720 | RefAttributes Type Extension}, which shipped in `@types/react@18.2.61`
 * - `forwardRef` component do not support string refs.
 * - uses custom `RefAttributes` which is compatible with all React versions enforcing no `string` allowance.
 */
export type ForwardRefComponent<Props> = NamedExoticComponent<Props & RefAttributes<InferredElementRefType<Props>>>;

/**
 * Helper type to correctly define the slot class names object.
 */
export type SlotClassNames<Slots> = {
  [SlotName in keyof Slots]-?: string;
};

/**
 * A definition of a slot, as a component, very similar to how a React component is declared,
 * but with some additional metadata that is used to determine how to render the slot.
 */
export type SlotComponentType<Props> = WithoutSlotRenderFunction<Props> &
  FunctionComponent<{ children?: ReactNode }> & {
    /**
     * @internal
     */
    [SLOT_RENDER_FUNCTION_SYMBOL]?: SlotRenderFunction<Props>;
    /**
     * @internal
     */
    [SLOT_ELEMENT_TYPE_SYMBOL]:
      | ComponentType<Props>
      | (Props extends AsIntrinsicElement<infer As> ? As : JSXIntrinsicElementKeys);
    /**
     * @internal
     * The original className prop for the slot, before being modified by the useStyles hook.
     */
    [SLOT_CLASS_NAME_PROP_SYMBOL]?: string;
  };

/**
 * Data type for event handlers. It makes data a discriminated union, where each object requires `event` and `type` property.
 * - `event` is the specific event type
 * - `type` is a string literal. It serves as a clear identifier of the event type that reflects the component's state when the event occurred.
 *    For example, the Tree component's `onNavigation` event handler has different `type` for different key presses: `{ event: React.KeyboardEvent<HTMLElement>; type: typeof ArrowRight } | { event: React.KeyboardEvent<HTMLElement>; type: typeof ArrowLeft }`.
 *    Developers can use the `type` property to identify and filter events of interest.
 * See RFC event-handlers-event-type.md for more details.
 *
 * Example usage:
 * type OnOpenChangeData = (
 *   | EventData\<'click', React.MouseEvent\<MyComponentElement\>\>
 *   | EventData\<'keydown', React.KeyboardEvent\<MyComponentElement\>\>
 * ) & \{ open: boolean; \};
 */
export type EventData<Type extends string, TEvent> =
  | { type: undefined; event: React.SyntheticEvent | Event }
  | { type: Type; event: TEvent };

/**
 * Type for props that are event handlers.
 * See RFC event-handlers-event-type.md for more details.
 *
 * Example usage:
 * type OnSomeEventData = EventData\<'click', React.MouseEvent\<MyComponentElement\>\> & \{ open: boolean; \};
 * type SomeProps = \{ onSomeEvent?: EventHandler\<OnSomeEventData\>; \};
 */
export type EventHandler<TData extends EventData<string, unknown>> = (
  ev: React.SyntheticEvent | Event,
  data: TData,
) => void;

/**
 * This type should be used in place of `React.RefAttributes<T>` in all components that specify `ref` prop.
 *
 * If user is using React 18 types `>=18.2.61`, they will run into type issues of incompatible refs, using this type mitigates this issues across react type versions.
 *
 * @remarks
 *
 * React 18 types introduced Type Expansion Change to the `RefAttributes` interface as patch release.
 * These changes were released in `@types/react@18.2.61` (replacing ref with `LegacyRef`, which leaks `string` into the union type, causing breaking changes between v8/v9 libraries):
 *  - {@link https://github.com/DefinitelyTyped/DefinitelyTyped/pull/68720 | PR }
 *  - {@link https://app.unpkg.com/@types/react@18.2.61/files/index.d.ts | shipped definitions }
 *
 *
 * In React 19 types this was "reverted" back to the original `Ref<T>` type.
 * In order to maintain compatibility with React 17,18,19, we are forced to use our own version of `RefAttributes`.
 *
 */
export interface RefAttributes<T> extends React.Attributes {
  ref?: React.Ref<T> | undefined;
}
