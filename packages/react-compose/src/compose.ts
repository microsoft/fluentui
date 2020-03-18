import * as React from 'react';
import { ComposedComponent, ComposeOptions, ComposePreparedOptions } from './types';

const defaultComposeOptions: ComposePreparedOptions = {
  className: process.env.NODE_ENV === 'production' ? '' : 'no-classname-🙉',
  displayNames: [],

  mapPropsToStylesPropsChain: [],

  handledProps: [],
  overrideStyles: false
};

function computeDisplayNames<InputProps, InputStylesProps, ParentProps, ParentStylesProps>(
  options: ComposeOptions<InputProps, InputStylesProps, ParentStylesProps>,
  inputDisplayName?: string,
  inputOptions?: ComposePreparedOptions
): string[] {
  if (options.overrideStyles) {
    return [options.displayName || inputDisplayName].filter(Boolean) as string[];
  }

  // To support styles composition we need to properly pick up display names
  if (inputOptions) {
    return options.displayName ? inputOptions.displayNames.concat(options.displayName) : inputOptions.displayNames;
  }

  return [inputDisplayName, options.displayName].filter(Boolean) as string[];
}

function compose<InputProps, InputStylesProps, ParentProps, ParentStylesProps>(
  InputComponent: React.FunctionComponent<ParentProps> & { fluentComposeConfig?: ComposePreparedOptions },
  composeOptions: ComposeOptions<InputProps, InputStylesProps, ParentStylesProps> = {}
): ComposedComponent<InputProps, InputStylesProps, ParentProps, ParentStylesProps> {
  const Component = (InputComponent.bind(null) as unknown) as ComposedComponent<
    InputProps,
    InputStylesProps,
    ParentProps,
    ParentStylesProps
  >;

  const inputOptions: ComposePreparedOptions = InputComponent.fluentComposeConfig || defaultComposeOptions;
  const { handledProps = [], mapPropsToStylesProps } = composeOptions;

  Component.displayName = composeOptions.displayName || InputComponent.displayName;
  Component.fluentComposeConfig = {
    className: composeOptions.className || inputOptions.className,
    displayNames: computeDisplayNames(composeOptions, InputComponent.displayName, inputOptions),

    mapPropsToStylesPropsChain: (mapPropsToStylesProps
      ? [...inputOptions.mapPropsToStylesPropsChain, mapPropsToStylesProps]
      : inputOptions.mapPropsToStylesPropsChain) as ((props: ParentStylesProps & InputProps) => InputStylesProps)[],

    handledProps: [...inputOptions.handledProps, ...handledProps],
    overrideStyles: composeOptions.overrideStyles || false
  };

  return Component;
}

export default compose;
