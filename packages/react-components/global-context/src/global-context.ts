import * as React from 'react';
import { canUseDOM } from '@fluentui/react-utilities';
import { GlobalObject } from './types';
import { getMajorVersion } from './utils';

const isBrowser = canUseDOM();
// eslint-disable-next-line no-restricted-globals
const globalObject: GlobalObject = isBrowser ? window : global;

// Identifier for the symbol, for easy idenfitifaction of symbols created by this util
// Useful for clearning global object during SSR reloads
export const SYMBOL_NAMESPACE = 'global-context:';

// During SSR the global object persists with the server process
// Clean out the global object during server reload during development
if (!isBrowser && process.env.NODE_ENV !== 'production') {
  const globalSymbols = Object.getOwnPropertySymbols(globalObject);
  globalSymbols.forEach(sym => {
    if (Symbol.keyFor(sym)?.startsWith(SYMBOL_NAMESPACE)) {
      delete globalObject[sym];
    }
  });
}

/**
 * Wrapper around @see React.createContext that implements context registration
 * in the globalThis object to avoid duplicate contexts. Contexts are keyed with
 * a unique sybmol for the package name, version and name of the context.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol}
 *
 * @param defaultValue - @see React.createContext
 * @param name - name of the context
 * @param packageName - name of the npm package where the module is used
 * @param packageVersion - version of the npm package where the module is used
 * @returns @see React.createContext
 */
export const createContext = <T>(defaultValue: T, name: string, packageName: string, packageVersion: string) => {
  // Symbol guaranteed to be unique for the entire runtime
  const sym = Symbol.for(`${SYMBOL_NAMESPACE}${packageName}/${name}/@${getMajorVersion(packageVersion)}`);

  // Objects keyed with symbols are not visible with console.log
  // Object symbol properties can't be iterated with `for` or `Object.keys`
  const globalSymbols = Object.getOwnPropertySymbols(globalObject);
  if (!globalSymbols.includes(sym)) {
    // eslint-disable-next-line @fluentui/no-context-default-value
    globalObject[sym] = React.createContext<unknown>(defaultValue);
  }

  return globalObject[sym] as React.Context<T>;
};
