// This .tsx implementation file is transitively imported by ButtonState.ts.
// It MUST NOT be included in the extractor's inspection set — if it were,
// the duplicate `ButtonState` export would trigger a duplicate-key error.

import * as React from 'react';

/** Transitively imported type — gives ButtonState.ts a reason to pull this file in. */
export type ButtonRef = React.Ref<HTMLButtonElement>;

/** Intentional duplicate export that would conflict if this file were inspected. */
export type ButtonState = { root: { 'data-disabled'?: 'true' | 'false' } };

export const Button: React.FC = () => <button />;
