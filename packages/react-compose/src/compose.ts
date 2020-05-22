import * as React from 'react';
import {
  ComponentWithAs,
  ComposedComponent,
  ComposeOptions,
  Input,
  InputComposeComponent,
  ComposePreparedOptions,
} from './types';
import { mergeComposeOptions } from './mergeComposeOptions';

/**
 * The `compose` utility allows React components to be created using a set of default config settings. Resulting
 * component can be "recomposed" by calling `compose` with them as the first argument, attaching config overrides
 * in the second argument. Settings are merged correctly and provided to the component render function.
 *
 * @param input - render function `(props, ref, config) => JSX.Element` or previously composed component.
 * @param inputOptions - options for rendering the component.
 */
function compose<
  TElementType extends React.ElementType<TProps>,
  TProps = {},
  TInputStylesProps = {},
  TParentProps = {},
  TParentStylesProps = {},
  TState = TProps
>(
  input: Input<TElementType, TProps>,
  inputOptions: ComposeOptions<TProps, TInputStylesProps, TParentStylesProps> = {},
) {
  // Merge the options as needed.
  const composeOptions = mergeComposeOptions<TElementType, TProps, TState>(
    input as Input,
    (inputOptions as unknown) as ComposeOptions,
    // tslint:disable-next-line: no-any
    (input as any).fluentComposeConfig,
  );

  // Create the new component, passing along the options.
  const Component = (React.forwardRef<TElementType, TProps & TParentProps & { as?: React.ElementType }>(
    (props, ref) => {
      // tslint:disable-next-line:no-any
      return composeOptions.render(props, ref as any, (composeOptions as unknown) as ComposePreparedOptions);
    },
  ) as unknown) as ComponentWithAs<TElementType, TProps & TParentProps>;

  // Set the display name.
  Component.displayName = composeOptions.displayName;

  // BUG: This replaces previous default props rather than a merge. Even a shallow merge would be fine.
  if ((input as InputComposeComponent).defaultProps) {
    Component.defaultProps = (input as InputComposeComponent).defaultProps;
  }

  // Cache the options on the component for later reference in recompose scenarios.
  ((Component as unknown) as ComposedComponent<TElementType, TProps, TState>).fluentComposeConfig = composeOptions;

  return Component;
}

export default compose;
