import * as React from 'react';

export type GlobalObject = typeof globalThis & Record<symbol, React.Context<unknown>>;
