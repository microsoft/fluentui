'use client';

import * as React from 'react';
import type { JSXElement, RefAttributes } from '@fluentui/react-utilities';

/**
 * Hook creating the state of a component from its props and ref.
 */
export type StateHook<Props, State, RefType> = (props: Props, ref: React.Ref<RefType>) => State;

/**
 * Hook mapping the state of a component to the context values its render function passes down.
 */
export type ContextValuesHook<State, ContextValues> = (state: State) => ContextValues;

/**
 * Function rendering a component from its state.
 */
export type RenderFn<State> = (state: State) => JSXElement | null;

/**
 * Function rendering a component from its state and the context values returned by its `ContextValuesHook`.
 */
export type RenderWithContextValuesFn<State, ContextValues> = (
  state: State,
  contextValues: ContextValues,
) => JSXElement | null;

/**
 * Composes a headless component from its state hook and render function, with an optional hook that maps the state
 * to context values.
 *
 * Every headless component has the same shape: `state = useX(props, ref)`,
 * `contextValues = useXContextValues(state)` and `renderX(state, contextValues)`. Sharing the `forwardRef` wrapper
 * keeps that boilerplate out of each component, which adds up across the whole library.
 *
 * The component function is picked once, when the component is composed, from whether `useGetContextValues` is
 * provided. A component therefore always calls the same hooks in the same order, and never checks for an optional
 * hook while rendering.
 *
 * Arguments are positional on purpose: an options object would repeat its property names in every component, and
 * minifiers don't mangle property names.
 *
 * ```ts
 * export const Foo: ForwardRefComponent<FooProps> = composeComponent(
 *   'Foo',
 *   useFoo,
 *   renderFoo,
 *   useFooContextValues,
 * );
 * ```
 *
 * Components annotate the call as pure (the `__PURE__` annotation comment), so that unused components can be
 * tree-shaken by bundlers that don't honor `sideEffects: false`.
 *
 * @param displayName - display name of the component, always set so it is available in production as well
 * @param useState - state hook of the component
 * @param render - render function of the component. It receives the context values as the second argument when
 * `useGetContextValues` is provided.
 * @param useGetContextValues - optional hook mapping the state to the context values passed to `render`
 *
 * @internal
 */
export function composeComponent<Props, State, RefType>(
  displayName: string,
  useState: StateHook<Props, State, RefType>,
  render: RenderFn<State>,
): React.ForwardRefExoticComponent<React.PropsWithoutRef<Props> & RefAttributes<RefType>>;
export function composeComponent<Props, State, RefType, ContextValues>(
  displayName: string,
  useState: StateHook<Props, State, RefType>,
  render: RenderWithContextValuesFn<State, ContextValues>,
  useGetContextValues: ContextValuesHook<State, ContextValues>,
): React.ForwardRefExoticComponent<React.PropsWithoutRef<Props> & RefAttributes<RefType>>;
export function composeComponent<Props, State, RefType, ContextValues>(
  displayName: string,
  useState: StateHook<Props, State, RefType>,
  render: RenderFn<State> | RenderWithContextValuesFn<State, ContextValues>,
  useGetContextValues?: ContextValuesHook<State, ContextValues>,
): React.ForwardRefExoticComponent<React.PropsWithoutRef<Props> & RefAttributes<RefType>> {
  const Component = useGetContextValues
    ? React.forwardRef<RefType, Props>((props, ref) => {
        const state = useState(props as Props, ref);
        return (render as RenderWithContextValuesFn<State, ContextValues>)(state, useGetContextValues(state));
      })
    : React.forwardRef<RefType, Props>((props, ref) => (render as RenderFn<State>)(useState(props as Props, ref)));

  Component.displayName = displayName;

  return Component;
}
