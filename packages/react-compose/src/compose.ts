import * as React from 'react';

import { ComponentWithAs, ComposedComponent, ComposeOptions, Input, InputComposeComponent } from './types';
import { mergeComposeOptions, wasComposedPreviously } from './utils';

function compose<ElementType extends React.ElementType, InputProps, InputStylesProps, ParentProps, ParentStylesProps>(
  input: Input<ElementType, InputProps>,
  inputOptions: ComposeOptions<InputProps, InputStylesProps, ParentProps, ParentStylesProps> = {},
) {
  const composeOptions = mergeComposeOptions(
    input as Input,
    (inputOptions as unknown) as ComposeOptions,
    wasComposedPreviously(input) ? input.fluentComposeConfig : undefined,
  );

  const Component = (React.forwardRef<ElementType, InputProps & ParentProps & { as?: React.ElementType }>(
    (props, ref) => {
      return composeOptions.render(props, (ref as unknown) as React.Ref<HTMLDivElement>, {
        ...composeOptions,
        slots: {
          ...composeOptions.slots,
          __self: Component,
        },
      });
    },
  ) as unknown) as ComponentWithAs<ElementType, InputProps & ParentProps>;

  Component.displayName = composeOptions.displayName;

  if ((input as InputComposeComponent).defaultProps) {
    Component.defaultProps = (input as InputComposeComponent).defaultProps;
  }

  ((Component as unknown) as ComposedComponent).fluentComposeConfig = composeOptions;

  return Component;
}

export default compose;
