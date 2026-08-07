// Intentionally broken render file — contains JSX that requires a full React
// setup and a deliberate type error.  Because this file is a .tsx implementation
// file, the extractor excludes it from the inspection/diagnostic set.
// If it were ever included, the build would fail with TS2322.

import * as React from 'react';

/** This type error must NOT surface in getStateDataAttributes. */
const _bad: string = 42 as unknown as string; // TS2322 when checked

export const renderButton = (): React.ReactElement => <button>{_bad}</button>;
