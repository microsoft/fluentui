import * as ReactDevRuntime from 'react/jsx-dev-runtime';
import type { JSXRuntime } from './types';

export const DevRuntime = ReactDevRuntime as {
  jsxDEV: JSXRuntime;
};
