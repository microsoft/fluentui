import { createJSX } from './jsx/createJSX';
import { jsxSlot } from './jsx/jsxSlot';
import { jsxsSlot } from './jsx/jsxsSlot';
import { Runtime } from './utils/Runtime';

export { Fragment } from 'react';

export const jsx = createJSX(Runtime.jsx, jsxSlot);
export const jsxs = createJSX(Runtime.jsxs, jsxsSlot);
