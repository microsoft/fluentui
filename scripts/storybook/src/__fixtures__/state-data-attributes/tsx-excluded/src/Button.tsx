// This .tsx implementation file lives alongside ButtonState.ts.
// It MUST NOT be included in the extractor's inspection set — if it were,
// the duplicate `ButtonState` export would trigger a duplicate-key error.

import * as React from 'react';

/** Intentional duplicate export that would conflict if this file were inspected. */
export type ButtonState = { root: { 'data-disabled'?: 'true' | 'false' } };

export const Button: React.FC = () => <button />;
