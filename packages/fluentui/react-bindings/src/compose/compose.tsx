import * as React from 'react';
import { ComposeInputComponent, ComposeInputOptions, ComposePreparedComponent, ComposePreparedOptions } from './types';

export const COMPOSE_PROP = 'FLUENT_COMPOSE_CONFIG';

function computeDisplayNames(InputComponent: ComposeInputComponent, options: ComposeInputOptions<any, any, any>): string[] {
  if (options.overrideStyles) {
    return [options.displayName || InputComponent.displayName].filter(Boolean) as string[];
  }

  // To support styles composition we need to properly pick up display names
  const previousOptions = InputComponent[COMPOSE_PROP];

  if (previousOptions) {
    return [...previousOptions.displayNames, options.displayName].filter(Boolean) as string[];
  }

  return [InputComponent.displayName, options.displayName].filter(Boolean) as string[];
}

function compose<OverrideProps, BehaviorProps, StylesProps, ComponentProps = {}>(
  InputComponent: ComposeInputComponent<ComponentProps>,
  options: ComposeInputOptions<ComponentProps & OverrideProps, BehaviorProps, StylesProps> = {}
): ComposePreparedComponent<ComponentProps & OverrideProps> {
  const ComposedComponent: React.FunctionComponent<ComponentProps & OverrideProps> & {
    [COMPOSE_PROP]: ComposePreparedOptions;
  } = InputComponent.bind(null);

  const { handledProps = [], mapPropsToBehavior, mapPropsToStyles } = options;
  const inputOptions: ComposePreparedOptions = InputComponent[COMPOSE_PROP] || {
    className: process.env.NODE_ENV === 'production' ? '' : 'no-classname-🙉',
    displayNames: [],

    mapPropsToBehaviorChain: [],
    mapPropsToStylesChain: [],

    handledProps: [],
    overrideStyles: false
  };

  ComposedComponent.displayName = options.displayName || InputComponent.displayName;
  ComposedComponent[COMPOSE_PROP] = {
    className: options.className || inputOptions.className,
    displayNames: computeDisplayNames(InputComponent, options),

    mapPropsToBehaviorChain: mapPropsToBehavior
      ? inputOptions.mapPropsToBehaviorChain.concat(mapPropsToBehavior)
      : inputOptions.mapPropsToBehaviorChain,
    mapPropsToStylesChain: mapPropsToStyles
      ? inputOptions.mapPropsToStylesChain.concat(mapPropsToStyles)
      : inputOptions.mapPropsToStylesChain,

    handledProps: [...inputOptions.handledProps, ...(handledProps as string[])],
    overrideStyles: options.overrideStyles || false
  };

  return ComposedComponent;
}

export default compose;
