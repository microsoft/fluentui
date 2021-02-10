import * as React from 'react';
import { ObjectShorthandProps, ShorthandRenderFunction } from './types';

/**
 * A helper function to resolve the correct kind of shorthand children to render
 */
export const renderShorthandChildren = <TProps,>(
  children: ObjectShorthandProps<TProps>['children'],
  props: TProps,
  Component: React.ElementType<TProps>,
) => {
  if (!children) {
    return null;
  }

  if (typeof children === 'function') {
    return (children as ShorthandRenderFunction<TProps>)(Component, props);
  }

  return React.createElement(Component, props);
};
