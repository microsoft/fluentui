import * as React from 'react';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { JSXElement, RefAttributes } from '@fluentui/react-utilities';

export type AnyProps = Record<string, unknown>;
export type AnyComponent = React.ComponentType<AnyProps & RefAttributes<HTMLElement>>;

/**
 * Recomposes a component exactly like its default export, but with the original Griffel style hook.
 *
 * `useContextValues` is passed for components whose render function takes context values as a second argument.
 * `customStyleHook` defaults to `use${name}Styles_unstable`.
 *
 * Kept free of Cypress APIs, so it also runs in the server rendering worker.
 */
export function griffel(
  name: string,
  useState: (props: never, ref: never) => unknown,
  useStyles: (state: never) => unknown,
  render: (state: never, contextValues: never) => JSXElement,
  useContextValues?: (state: never) => unknown,
  customStyleHook = `use${name}Styles_unstable`,
): AnyComponent {
  const Component = React.forwardRef<HTMLElement, AnyProps>((props, ref) => {
    const state = useState(props as never, ref as never);
    const contextValues = useContextValues?.(state as never);
    useStyles(state as never);
    useCustomStyleHook_unstable(customStyleHook as never)(state as never);
    return render(state as never, contextValues as never);
  });
  Component.displayName = `Griffel${name}`;
  return Component as unknown as AnyComponent;
}
