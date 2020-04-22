import * as React from 'react';
import { ComposedComponent, ComposeOptions, ComposePreparedOptions } from './types';

const defaultComposeOptions: ComposePreparedOptions = {
  className: process.env.NODE_ENV === 'production' ? '' : 'no-classname-🙉',
  displayNames: [],

  mapPropsToStylesPropsChain: [],

  handledProps: [] as never[],
  overrideStyles: false,
};

function computeDisplayNames<InputProps, InputStylesProps, ParentProps, ParentStylesProps>(
  inputOptions: ComposePreparedOptions,
  composeOptions: ComposeOptions<InputProps, InputStylesProps, ParentStylesProps>,
): string[] {
  if (composeOptions.overrideStyles) {
    return [composeOptions.displayName].filter(Boolean) as string[];
  }

  // To support styles composition we need to properly pick up display names
  return composeOptions.displayName
    ? inputOptions.displayNames.concat(composeOptions.displayName)
    : inputOptions.displayNames;
}

function compose<InputProps, InputStylesProps, ParentProps, ParentStylesProps>(
  InputComponent: React.FunctionComponent<ParentProps> & {
    fluentComposeConfig?: ComposePreparedOptions;
    handledProps?: (keyof ParentProps)[];
  },
  composeOptions: ComposeOptions<InputProps, InputStylesProps, ParentStylesProps> = {},
): ComposedComponent<InputProps, InputStylesProps, ParentProps, ParentStylesProps> {
  const Component = (InputComponent.bind(null) as unknown) as ComposedComponent<
    InputProps,
    InputStylesProps,
    ParentProps,
    ParentStylesProps
  >;

  const inputOptions: ComposePreparedOptions = InputComponent.fluentComposeConfig || {
    ...defaultComposeOptions,
    ...(InputComponent.displayName && { displayNames: [InputComponent.displayName] }),
  };

  Component.displayName = composeOptions.displayName || InputComponent.displayName;

  Component.fluentComposeConfig = {
    className: composeOptions.className || inputOptions.className,
    displayNames: computeDisplayNames(inputOptions, composeOptions),

    mapPropsToStylesPropsChain: (composeOptions.mapPropsToStylesProps
      ? [...inputOptions.mapPropsToStylesPropsChain, composeOptions.mapPropsToStylesProps]
      : inputOptions.mapPropsToStylesPropsChain) as ((props: ParentStylesProps & InputProps) => InputStylesProps)[],

    handledProps: [
      ...(InputComponent.handledProps || []),
      ...inputOptions.handledProps,
      ...(composeOptions.handledProps || []),
    ],
    overrideStyles: composeOptions.overrideStyles || false,
  };

  return Component;
}

export default compose;
