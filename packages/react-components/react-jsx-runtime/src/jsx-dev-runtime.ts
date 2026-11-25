import { createJSX } from './jsx/createJSX';
import { jsxDEVSlot } from './jsx/jsxDEVSlot';
import { jsxDEV as reactJsxDEV } from './utils/DevRuntime';

export { Fragment } from 'react';

export const jsxDEV = createJSX(reactJsxDEV, jsxDEVSlot);
