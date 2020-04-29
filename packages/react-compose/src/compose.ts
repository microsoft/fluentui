import * as React from 'react';

import { ComponentWithAs, ComposedComponent, ComposeOptions, Input, InputComposeComponent } from './types';
import { mergeComposeOptions, wasComposedPreviously } from './utils';
import { useStylesheet } from './StylesheetProvider';

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
    // Register styles as needed.
    if (composeOptions.stylesheet) {
      const { register, hasRegistered } = useStylesheet();

      if (inputOptions.stylesheet && !hasRegistered(inputOptions.stylesheet)) {
        register(composeOptions.stylesheets || []);
      }
    }

    return composeOptions.render(props, ref as React.Ref<'div'>, composeOptions);
  }) as unknown) as ComponentWithAs<T, InputProps & ParentProps>;

  Component.displayName = composeOptions.displayName;

  if ((input as InputComposeComponent).defaultProps) {
    Component.defaultProps = (input as InputComposeComponent).defaultProps;
  }

  if (inputOptions.stylesheet) {
    // tslint:disable-next-line:no-any
    (Component as any).stylesheets = composeOptions.stylesheets;
  }

  ((Component as unknown) as ComposedComponent).fluentComposeConfig = composeOptions;

  return Component;
}

export default compose;
