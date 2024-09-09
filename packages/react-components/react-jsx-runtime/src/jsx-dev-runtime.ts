import { createJSX } from './jsx/createJSX';
import { jsxDEVSlot } from './jsx/jsxDEVSlot';
import { DevRuntime } from './utils/DevRuntime';

export { Fragment } from 'react';

export const jsxDEV = createJSX(DevRuntime.jsxDEV, jsxDEVSlot);
