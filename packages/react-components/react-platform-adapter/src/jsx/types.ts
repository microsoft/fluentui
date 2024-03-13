import type * as React from 'react';

export type CreateJSXElement = <P extends {}>(
  type: React.ElementType<P>,
  props: P | null,
  key?: React.Key,
  source?: unknown,
  self?: unknown,
) => React.ReactElement<P>;

export type JSXRuntime = {
  jsx: CreateJSXElement;
  jsxs: CreateJSXElement;
};

export type JSXDevRuntime = {
  jsxDEV: CreateJSXElement;
};
