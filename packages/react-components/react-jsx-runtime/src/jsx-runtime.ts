import { createJSX } from './jsx/createJSX';
import { jsxSlot } from './jsx/jsxSlot';
import { jsxsSlot } from './jsx/jsxsSlot';
import { jsx as reactJsx, jsxs as reactJsxs } from './utils/Runtime';

export { Fragment } from 'react';

export const jsx = createJSX(reactJsx, jsxSlot);
export const jsxs = createJSX(reactJsxs, jsxsSlot);
