import * as React from 'react';
import * as ReactIs from 'react-is';

import { ComposedComponent, ComposeOptions, ComposePreparedOptions, Input } from './types';

function computeDisplayNames(inputOptions: ComposeOptions, parentOptions: ComposePreparedOptions): string[] {
  if (inputOptions.overrideStyles) {
    return [inputOptions.displayName].filter(Boolean) as string[];
  }

  // To support styles composition we need to properly pick up display names
  return inputOptions.displayName
    ? parentOptions.displayNames.concat(inputOptions.displayName)
    : parentOptions.displayNames;
}

export const defaultComposeOptions: ComposePreparedOptions = {
  className: process.env.NODE_ENV === 'production' ? '' : 'no-classname-🙉',
  displayName: '',
  displayNames: [],

  mapPropsToStylesPropsChain: [],
  render: () => null,

  handledProps: [] as never[],
  overrideStyles: false,
};

export function mergeComposeOptions(
  input: Input,
  inputOptions: ComposeOptions,
  parentOptions: ComposePreparedOptions = defaultComposeOptions,
): ComposePreparedOptions {
  return {
    className: inputOptions.className || parentOptions.className,
    displayName: inputOptions.displayName || parentOptions.displayName,
    displayNames: computeDisplayNames(inputOptions, parentOptions),

    mapPropsToStylesPropsChain: inputOptions.mapPropsToStylesProps
      ? [...parentOptions.mapPropsToStylesPropsChain, inputOptions.mapPropsToStylesProps]
      : parentOptions.mapPropsToStylesPropsChain,
    render: typeof input === 'function' ? input : parentOptions.render,

    handledProps: [...parentOptions.handledProps, ...((inputOptions.handledProps as never[]) || ([] as never[]))],
    overrideStyles: inputOptions.overrideStyles || false,
  };
}

/**
 * compose() allows you to pass two inputs:
 * - React.forwardRef + static fluentComposeConfig, i.e. previously composed component
 * - a function
 */
export function wasComposedPreviously<T extends React.ElementType = 'div', P = {}>(
  input: Input<T, P>,
): input is ComposedComponent<P> {
  const isForwardRef: boolean = (input as React.ExoticComponent).$$typeof === ReactIs.ForwardRef;

  return isForwardRef && !!(input as ComposedComponent<P>).fluentComposeConfig;
}
