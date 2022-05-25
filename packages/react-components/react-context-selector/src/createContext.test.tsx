import { createContext } from './createContext';
import * as ReactIs from 'react-is';

describe('createContext', () => {
  it('creates a Provider component', () => {
    const Context = createContext(null);
    expect(ReactIs.isValidElementType(Context.Provider)).toBeTruthy();
  });
});
