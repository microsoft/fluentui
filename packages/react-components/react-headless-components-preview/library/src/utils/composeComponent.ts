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

type ComposeComponentFnArgs<State, ContextValues, UseState> =
  | [useState: UseState, render: RenderFn<State>]
  | [
      useState: UseState,
      useGetContextValues: ContextValuesHook<State, ContextValues>,
      render: RenderWithContextValuesFn<State, ContextValues>,
    ];

type ComposeComponentReturn<Props, RefType> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<Props> & RefAttributes<RefType>
>;

/**
 * Composes a headless component from its state hook and render function, optionally deriving context values
 * before rendering.
 *
 * Every headless component has the same shape: `state = useX(props, ref)`,
 * `contextValues = useXContextValues(state)` and `renderX(state, contextValues)`. Sharing the `forwardRef` wrapper
 * keeps that boilerplate out of each component, which adds up across the whole library.
 *
 * Supports `useState, render` and `useState, useGetContextValues, render` after the display name.
 * The component function is picked once, when the component is composed, based on the number of arguments.
 * A component therefore always calls the same hooks in the same order.
 *
 * Arguments are positional on purpose: an options object would repeat its property names in every component, and
 * minifiers don't mangle property names.
 *
 * ```ts
 * export const Foo: ForwardRefComponent<FooProps> = composeComponent(
 *   'Foo',
 *   useFoo,
 *   useFooContextValues,
 *   renderFoo,
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
 *
 * @internal
 */
export function composeComponent<Props, State, RefType>(
  displayName: string,
  useState: StateHook<Props, State, RefType>,
  render: RenderFn<State>,
): ComposeComponentReturn<Props, RefType>;
export function composeComponent<Props, State, RefType, ContextValues>(
  displayName: string,
  useState: StateHook<Props, State, RefType>,
  useGetContextValues: ContextValuesHook<State, ContextValues>,
  render: RenderWithContextValuesFn<State, ContextValues>,
): ComposeComponentReturn<Props, RefType>;
export function composeComponent<Props, State, RefType, ContextValues>(
  displayName: string,
  ...args: ComposeComponentFnArgs<State, ContextValues, StateHook<React.PropsWithoutRef<Props>, State, RefType>>
): ComposeComponentReturn<Props, RefType> {
  const Component = React.forwardRef<RefType, Props>(createRender(...args));

  Component.displayName = displayName;

  return Component;
}

/**
 * Composes a plain function component using the same pipelines as {@link composeComponent}, without a
 * `forwardRef` wrapper. The state hook accepts props only, and the result does not add a ref prop.
 *
 * Pass the display name and state hook, then an optional context hook, with the renderer last.
 * Annotate calls as pure for tree-shaking.
 *
 * @internal
 */
export function composeComponentWithoutRef<Props, State>(
  displayName: string,
  useState: (props: Props) => State,
  render: RenderFn<State>,
): React.FC<Props>;
export function composeComponentWithoutRef<Props, State, ContextValues>(
  displayName: string,
  useState: (props: Props) => State,
  useGetContextValues: ContextValuesHook<State, ContextValues>,
  render: RenderWithContextValuesFn<State, ContextValues>,
): React.FC<Props>;
export function composeComponentWithoutRef<Props, State, ContextValues>(
  displayName: string,
  ...args: ComposeComponentFnArgs<State, ContextValues, (props: Props) => State>
): React.FC<Props> {
  const Component = createRender<Props, State, never, ContextValues>(...args) as React.FC<Props>;

  Component.displayName = displayName;

  return Component;
}

/**
 * Creates a render function for a composed component based on the provided hooks and renderer.
 * Handles state, optional context values, and render functions.
 */
function createRender<Props, State, RefType, ContextValues>(
  ...args: ComposeComponentFnArgs<State, ContextValues, StateHook<Props, State, RefType>>
): (props: Props, ref: React.Ref<RefType>) => JSXElement | null {
  if (args.length === 2) {
    const [useState, render] = args;

    return (...params) => render(useState(...params));
  } else {
    const [useState, useGetContextValues, render] = args;

    return (...params) => {
      const state = useState(...params);
      return render(state, useGetContextValues(state));
    };
  }
}
