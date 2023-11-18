import * as ReactRuntime from 'react/jsx-runtime';
import type { JSXRuntime } from './types';

export const Runtime = ReactRuntime as {
  jsx: JSXRuntime;
  jsxs: JSXRuntime;
};
