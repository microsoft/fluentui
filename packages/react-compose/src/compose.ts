import * as React from 'react';

import { ComponentWithAs, ComposedComponent, ComposeOptions, Input, InputComposeComponent } from './types';
import { mergeComposeOptions, wasComposedPreviously } from './utils';

function compose<T extends React.ElementType, InputProps, InputStylesProps, ParentProps, ParentStylesProps>(
  input: Input<T, InputProps>,
  inputOptions: ComposeOptions<InputProps, InputStylesProps, ParentStylesProps> = {},
) {
  const composeOptions = mergeComposeOptions(
    input as Input,
    (inputOptions as unknown) as ComposeOptions,
    wasComposedPreviously(input) ? input.fluentComposeConfig : undefined,
  );

  const Component = (React.forwardRef<T, InputProps & ParentProps & { as?: React.ElementType }>((props, ref) => {
    return composeOptions.render(props, ref as React.Ref<'div'>, composeOptions);
  }) as unknown) as ComponentWithAs<T, InputProps & ParentProps>;

  Component.displayName = composeOptions.displayName;

  if ((input as InputComposeComponent).defaultProps) {
    Component.defaultProps = (input as InputComposeComponent).defaultProps;
  }

  (Component as ComposedComponent).fluentComposeConfig = composeOptions;

  return Component;
}

export default compose;
