import { createContext, createContextSelector } from '@fluentui/global-context';
import { SYMBOL_NAMESPACE } from './global-context';
import { SYMBOL_NAMESPACE as CONTEXT_SELECTOR_SYMBOL_NAMESPACE } from './global-context-selector';

function cleanWindowSymbols(namespace: string) {
  getGlobalContextSymbols(namespace).forEach(sym => {
    // @ts-expect-error - Indexing object with symbols not supported until TS 4.4
    delete window[sym];
  });
}

function getWindowProperty(symbol: Symbol) {
  // @ts-expect-error - Indexing object with symbols not supported until TS 4.4
  return window[symbol];
}

function getGlobalContextSymbols(namespace: string) {
  return Object.getOwnPropertySymbols(global).reduce((acc, cur) => {
    if (Symbol.keyFor(cur)?.includes(namespace)) {
      acc.push(cur);
    }

    return acc;
  }, [] as Symbol[]);
}

describe('createContext', () => {
  beforeEach(() => cleanWindowSymbols(SYMBOL_NAMESPACE));

  it('should create context on window', () => {
    const MyContext = createContext(undefined, 'MyContext', 'package', '9.0.0');
    expect(getWindowProperty(getGlobalContextSymbols(SYMBOL_NAMESPACE)[0])).equals(MyContext);
  });

  it('should create single context', () => {
    const MyContext = createContext(undefined, 'MyContext', 'package', '9.0.0');
    const MyContext2 = createContext(undefined, 'MyContext', 'package', '9.0.0');

    expect(getGlobalContextSymbols(SYMBOL_NAMESPACE).length).equals(1);
    expect(getWindowProperty(getGlobalContextSymbols(SYMBOL_NAMESPACE)[0])).equals(MyContext);
    expect(MyContext2).equals(MyContext);
  });
});

describe('createContextSelector', () => {
  beforeEach(() => cleanWindowSymbols(CONTEXT_SELECTOR_SYMBOL_NAMESPACE));

  it('should create context on window', () => {
    const MyContext = createContextSelector({}, 'MyContext', 'package', '9.0.0');
    expect(getWindowProperty(getGlobalContextSymbols(CONTEXT_SELECTOR_SYMBOL_NAMESPACE)[0])).equals(MyContext);
  });

  it('should create single context', () => {
    const MyContext = createContextSelector({}, 'MyContext', 'package', '9.0.0');
    const MyContext2 = createContextSelector({}, 'MyContext', 'package', '9.0.0');

    expect(getGlobalContextSymbols(CONTEXT_SELECTOR_SYMBOL_NAMESPACE).length).equals(1);
    expect(getWindowProperty(getGlobalContextSymbols(CONTEXT_SELECTOR_SYMBOL_NAMESPACE)[0])).equals(MyContext);
    expect(MyContext2).equals(MyContext);
  });
});
