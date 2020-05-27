import * as React from 'react';

import { ComponentWithAs, ComposedComponent, ComposeOptions, Input, InputComposeComponent } from './types';
import { wasComposedPreviously } from './wasComposedPreviously';
import { mergeComposeOptions } from './mergeComposeOptions';

function compose<
  TElementType extends React.ElementType,
  TInputProps,
  TInputStylesProps,
  TParentProps,
  TParentStylesProps
>(
  input: Input<TElementType, TInputProps>,
  inputOptions: ComposeOptions<TInputProps, TInputStylesProps, TParentProps, TParentStylesProps> = {},
) {
  const composeOptions = mergeComposeOptions(
    input as Input,
    (inputOptions as unknown) as ComposeOptions,
    wasComposedPreviously(input) ? input.fluentComposeConfig : undefined,
  );

  const Component = (React.forwardRef<TElementType, TInputProps & TParentProps & { as?: React.ElementType }>(
    (props, ref) => {
      return composeOptions.render(props, (ref as unknown) as React.Ref<HTMLDivElement>, {
        ...composeOptions,
        slots: {
          ...composeOptions.slots,
          __self: Component,
        },
      });
    },
  ) as unknown) as ComponentWithAs<TElementType, TInputProps & TParentProps>;

  Component.displayName = composeOptions.displayName;

  if ((input as InputComposeComponent).defaultProps) {
    Component.defaultProps = (input as InputComposeComponent).defaultProps;
  }

  ((Component as unknown) as ComposedComponent).fluentComposeConfig = composeOptions;

  return Component;
}

export default compose;
