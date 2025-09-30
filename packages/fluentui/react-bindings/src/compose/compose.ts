import * as React from 'react';
import * as _ from 'lodash';

import { ComponentWithAs, ComposedComponent, ComposeOptions, Input } from './consts';
import { wasComposedPreviously } from './wasComposedPreviously';
import { mergeComposeOptions } from './mergeComposeOptions';

function compose<
  TElementType extends keyof JSX.IntrinsicElements,
  TInputProps,
  TInputStylesProps,
  TParentProps,
  TParentStylesProps,
>(
  input: Input<TElementType, TInputProps>,
  inputOptions: ComposeOptions<TInputProps, TInputStylesProps, TParentProps, TParentStylesProps> = {},
) {
  const composeOptions = mergeComposeOptions(
    input as Input,
    inputOptions as unknown as ComposeOptions,
    wasComposedPreviously(input) ? input.fluentComposeConfig : undefined,
  );

  const Component = React.forwardRef<HTMLElement, TInputProps & TParentProps & { as?: React.ElementType }>(
    (componentProps, ref) => {
      const allProps = _.defaults({}, componentProps, composeOptions.defaultProps);

      return composeOptions.render(allProps, ref as React.Ref<HTMLDivElement>, {
        ...composeOptions,
        state: composeOptions.state(allProps, ref, composeOptions),
        slots: {
          ...composeOptions.slots,
          __self: Component,
        },
      });
    },
  ) as unknown as ComponentWithAs<TElementType, TInputProps & TParentProps>;

  Component.displayName = composeOptions.displayName;

  (Component as unknown as ComposedComponent).fluentComposeConfig = composeOptions;

  return Component;
}

// eslint-disable-next-line import/no-default-export
export default compose;
