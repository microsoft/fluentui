import type * as React from 'react';

export type JSXCreateElement = <P extends {}>(
  type: React.ElementType<P>,
  props: P | null,
  key?: React.Key,
  source?: unknown,
  self?: unknown,
) => React.ReactElement<P>;

export type JSXRuntime = {
  jsx: JSXCreateElement;
  jsxs: JSXCreateElement;
};

export type JSXDevRuntime = {
  jsxDEV: JSXCreateElement;
};
