/// <reference path="types.d.ts" />

import * as React from 'react';
import { jsx as createElement, extractChildrenFromProps } from './jsx';

export function jsx<P extends {}>(
  type: React.ElementType<P>,
  props?: P | null,
  key?: string,
): React.ReactElement<P> | null {
  // extractChildrenFromProps is required since jsx signature differs from React.createElement signature
  return createElement(type, props, ...extractChildrenFromProps(props));
}

export function jsxs<P extends {}>(
  type: React.ElementType<P>,
  props?: P | null,
  key?: string,
): React.ReactElement<P> | null {
  // extractChildrenFromProps is required since jsxs signature differs from React.createElement signature
  return createElement(type, props, ...extractChildrenFromProps(props));
}

export { Fragment } from 'react/jsx-runtime';
