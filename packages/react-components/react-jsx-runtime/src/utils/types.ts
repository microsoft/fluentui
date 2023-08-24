import type * as React from 'react';

export type JSXRuntime = <P extends {}>(
  type: React.ElementType<P>,
  props: P | null,
  key?: React.Key,
  source?: unknown,
  self?: unknown,
) => React.ReactElement<P>;
