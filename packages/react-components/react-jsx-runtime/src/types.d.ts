declare module 'react/jsx-runtime' {
  import type * as React from 'react';

  export const Fragment: symbol;

  export function jsx<P extends {}>(
    type: React.ElementType<P>,
    props?: P | null,
    key?: string,
  ): React.ReactElement<P> | null;

  export function jsxs<P extends {}>(
    type: React.ElementType<P>,
    props?: P | null,
    key?: string,
  ): React.ReactElement<P> | null;
}
declare module 'react/jsx-dev-runtime' {
  import type * as React from 'react';

  export const Fragment: symbol;

  export function jsxDEV<P extends {}>(
    type: React.ElementType<P>,
    props?: P | null,
    key?: string,
    isStaticChildren?: boolean,
    source?: unknown,
    self?: unknown,
  ): React.ReactElement<P> | null;
}
