import type * as React from 'react';

type SlotOptions = {
  elementType: keyof React.JSX.IntrinsicElements | React.ElementType;
  defaultProps?: Record<string, unknown>;
};

// Minimal stand-in for `slot` from `@fluentui/react-utilities`; the rule only needs the call shape and types.
export const slot = {
  always: <P>(value: P, options: SlotOptions): P => value,
  optional: <P>(value: P | undefined, options: SlotOptions): P | undefined => value,
};
