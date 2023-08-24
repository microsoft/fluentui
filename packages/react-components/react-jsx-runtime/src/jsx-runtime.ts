import { Runtime } from './utils/Runtime';
import { createJSX } from './jsx/createJSX';

export { Fragment } from 'react';

export const jsx = createJSX(Runtime.jsx);
export const jsxs = createJSX(Runtime.jsxs);
