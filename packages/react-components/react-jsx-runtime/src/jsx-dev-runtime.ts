/// <reference path="types.d.ts" />

import * as React from 'react';
import { jsx as createElement, extractChildrenFromProps } from './jsx';

export function jsxDEV<P extends {}>(
  type: React.ElementType<P>,
  props?: P | null,
  key?: string,
  isStaticChildren?: boolean,
  source?: unknown,
  self?: unknown,
): React.ReactElement<P> | null {
  // extractChildrenFromProps is required since jsxDev signature differs from React.createElement signature
  return createElement(type, props, ...extractChildrenFromProps(props));
}

export { Fragment } from 'react/jsx-dev-runtime';
