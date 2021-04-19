import * as React from 'react';
import { ComposedComponent, Input } from './consts';

/**
 * compose() allows you to pass two inputs:
 * - React.forwardRef + static fluentComposeConfig, i.e. previously composed component
 * - a function
 */
export function wasComposedPreviously<TElementType extends React.ElementType = 'div', TProps = {}>(
  input: Input<TElementType, TProps>,
): input is ComposedComponent<TProps> {
  return !!(input as ComposedComponent<TProps>).fluentComposeConfig;
}
