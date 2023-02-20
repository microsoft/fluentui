import * as React from 'react';

export type GlobalObject = (typeof globalThis | NodeJS.Global) & Record<symbol, React.Context<unknown>>;
