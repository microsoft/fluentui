/*
 * This suite intentionally runs in node environment to simulate SSR
 * @jest-environment node
 */

import { createContext, SYMBOL_NAMESPACE } from './global-context';

function getGlobalProperty(symbol: Symbol) {
  // @ts-expect-error - Indexing object with symbols not supported until TS 4.4
  return global[symbol];
}

function getGlobalContextSymbols() {
  return Object.getOwnPropertySymbols(global).reduce((acc, cur) => {
    if (Symbol.keyFor(cur)?.includes(SYMBOL_NAMESPACE)) {
      acc.push(cur);
    }

    return acc;
  }, [] as Symbol[]);
}

describe('createContext', () => {
  beforeEach(() => {
    getGlobalContextSymbols().forEach(sym => {
      // @ts-expect-error - Indexing object with symbols not supported until TS 4.4
      delete global[sym];
    });
  });

  it('should create context on global', () => {
    const MyContext = createContext({}, 'MyContext', 'package', '9.0.0');
    const sym = getGlobalContextSymbols()[0];
    expect(getGlobalProperty(sym)).toBe(MyContext);
  });

  it('should create single context', () => {
    const MyContext = createContext({}, 'MyContext', 'package', '9.0.0');
    const MyContext2 = createContext({}, 'MyContext', 'package', '9.0.0');

    expect(getGlobalContextSymbols().length).toEqual(1);
    expect(getGlobalProperty(getGlobalContextSymbols()[0])).toBe(MyContext);
    expect(MyContext2).toBe(MyContext);
  });
});
