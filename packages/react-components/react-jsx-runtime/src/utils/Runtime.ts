import { jsx as reactJsx, jsxs as reactJsxs } from 'react/jsx-runtime';
import type { JSXRuntime } from './types';

export const jsx = reactJsx as JSXRuntime;
export const jsxs = reactJsxs as JSXRuntime;
