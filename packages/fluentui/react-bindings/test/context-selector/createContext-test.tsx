import * as ReactIs from 'react-is';
import { createContext } from '../../src/context-selector/createContext';

describe('createContext', () => {
  it('creates a Provider component', () => {
    const Context = createContext(null);
    expect(ReactIs.isValidElementType(Context.Provider)).toBeTruthy();
  });
});
