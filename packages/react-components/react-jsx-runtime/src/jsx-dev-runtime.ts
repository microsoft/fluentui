import { DevRuntime } from './utils/DevRuntime';
import { createJSX } from './jsx/createJSX';

export { Fragment } from 'react';

export const jsxDEV = createJSX(DevRuntime.jsxDEV);
