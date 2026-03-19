'use client';

import * as React from 'react';
import type { ForwardRefComponent } from './types';
import type { JSXElement } from '../utils/types';

/**
 * Options for creating a composed component via {@link composeComponent}.
 *
 * @template Element
 * @template Props
 * @template State
 * @template ContextValues
 * `Element` is the underlying DOM element type (for example, `HTMLButtonElement`).
 * `Props` is the public props accepted by the component.
 * `State` is the internal state derived from props by `useState`.
 * `ContextValues` is the shape of values passed via React context. It defaults to `never`
 * (no context) when omitted.
 *
 * @example
 * ```tsx
 * type BadgeOptions = ComposeComponentOptions<
 *   HTMLSpanElement,
 *   BadgeProps,
 *   BadgeState
 * >;
 * ```
 */
export type ComposeComponentOptions<Element, Props, State, ContextValues = never> = {
  /**
   * The `displayName` set on the resulting React component — visible in React DevTools
   * and error messages.
   */
  displayName: string;

  /**
   * Hook that derives internal `State` from the component's public `Props` and forwarded `ref`.
   * Called on every render. Must follow the Rules of Hooks.
   *
   * @param props - The props passed to the component.
   * @param ref - The forwarded ref.
   * @returns The resolved internal state object.
   */
  useState: (props: Props, ref: React.Ref<Element>) => State;

  /**
   * Optional hook that applies CSS-in-JS styles by mutating the state in place
   * (e.g. setting `className` on slot objects).
   * Called after `useState` on every render. Must follow the Rules of Hooks.
   * When omitted, no styles are applied.
   *
   * @param state - The state returned by `useState`.
   */
  useStyles?: (state: State) => void;

  /**
   * Optional hook that derives context values from state and passes them to
   * child components via React context providers set up inside `render`.
   * Called after `useStyles` on every render. Must follow the Rules of Hooks.
   * When omitted, an empty object is used.
   *
   * @param state - The state returned by `useState`.
   * @returns An object whose values are distributed to context consumers.
   */
  useContextValues?: (state: State) => ContextValues;

  /**
   * Pure render function that converts `State` (and optional `ContextValues`) into JSX.
   * Must NOT call hooks — all hook calls belong in `useState`, `useStyles`, or `useContextValues`.
   *
   * @param state - The state returned by `useState`.
   * @param contextValues - The values returned by `useContextValues`, if provided.
   * @returns The rendered JSX element, or `null` to render nothing.
   */
  render: (state: State, contextValues?: ContextValues) => JSXElement | null;
};

/**
 * Creates a strongly-typed, `forwardRef`-wrapped React component from a set of
 * composable hooks and a render function.
 *
 * The component lifecycle runs in this order on every render:
 * 1. `useState` — derives internal state from props and the forwarded ref.
 * 2. `useContextValues` — derives context values from state *(optional)*.
 * 3. `useStyles` — applies styles by mutating the state *(optional)*.
 * 4. `render` — converts state and context values into JSX.
 *
 * @template Element
 * @template Props
 * @template State
 * @template ContextValues
 * `Element` is the underlying DOM element type the ref will point to.
 * `Props` is the public prop surface of the component.
 * `State` is the internal state shape produced by `useState`.
 * `ContextValues` contains values passed down via React context and defaults to `never`.
 *
 * @param options - {@link ComposeComponentOptions} that define the component's behavior.
 * @returns A `ForwardRefComponent<Props>` with `displayName` set.
 *
 * @example Basic usage — unstyled, no context values
 * ```tsx
 * import { useBadgeBase_unstable, renderBadge_unstable } from '@fluentui/react-components';
 *
 *  const UnstyledBadge = composeComponent({
 *   displayName: 'UnstyledBadge',
 *   useState: useBadgeBase_unstable,
 *   render: renderBadge_unstable,
 * });
 * ```
 *
 * @example With custom styles
 * ```tsx
 * import { useBadgeBase_unstable, useBadgeStyles_unstable, renderBadge_unstable } from '@fluentui/react-components';
 *
 *  const CustomBadge = composeComponent({
 *   displayName: 'CustomBadge',
 *   useState: useBadgeBase_unstable,
 *   useStyles(state) {
 *      state.root.className = `CustomBadge CustomBadge--${state.variant}`;
 *   },
 *   render: renderBadge_unstable,
 * });
 * ```
 *
 * @example With context values passed to child slots
 * ```tsx
 * import { useMenuBase_unstable, useMenuStyles_unstable, useMenuContextValues_unstable, renderMenu_unstable } from '@fluentui/react-components';
 *
 * const Menu = composeComponent({
 *   displayName: 'Menu',
 *   useState: useMenuBase_unstable,
 *   useContextValues: useMenuContextValues_unstable,
 *   useStyles: useMenuStyles_unstable,
 *   render: renderMenu_unstable,
 * });
 * ```
 */
export function composeComponent<Element, Props, State, ContextValues = never>(
  options: ComposeComponentOptions<Element, Props, State, ContextValues>,
): ForwardRefComponent<Props> {
  const {
    displayName,
    useState,
    useContextValues = () => ({} as ContextValues),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    useStyles = () => {},
    render,
  } = options;

  const Component = React.forwardRef<Element, Props>((props, ref) => {
    const state = useState(props as Props, ref as React.Ref<Element>);
    const contextValues = useContextValues(state);

    useStyles(state);

    return render(state, contextValues);
  });

  Component.displayName = displayName;

  return Component as ForwardRefComponent<Props>;
}
