import * as React from 'react';
import { ComponentWithAs, ComposedComponent, ComposeOptions, Input, InputComposeComponent } from './types';
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
  TElementType extends React.ElementType,
  TInputProps,
  TInputStylesProps,
  TParentProps,
  TParentStylesProps
>(
  input: Input<TElementType, TInputProps>,
  inputOptions: ComposeOptions<TInputProps, TInputStylesProps, TParentStylesProps> = {},
) {
  // Merge the options as needed.
  const composeOptions = mergeComposeOptions(
    input as Input,
    (inputOptions as unknown) as ComposeOptions,
    // tslint:disable-next-line: no-any
    (input as any).fluentComposeConfig,
  );

  // Create the new component, passing along the options.
  const Component = (React.forwardRef<TElementType, TInputProps & TParentProps & { as?: React.ElementType }>(
    (props, ref) => {
      return composeOptions.render(props, (ref as unknown) as React.Ref<HTMLDivElement>, composeOptions);
    },
  ) as unknown) as ComponentWithAs<TElementType, TInputProps & TParentProps>;

  // Set the display name.
  Component.displayName = composeOptions.displayName;

  // Set defaultProps (TODO: remove these.)
  if ((input as InputComposeComponent).defaultProps) {
    Component.defaultProps = (input as InputComposeComponent).defaultProps;
  }

  // Cache the options on the component for later reference in recompose scenarios.
  ((Component as unknown) as ComposedComponent).fluentComposeConfig = composeOptions;

  return Component;
}

export default compose;
