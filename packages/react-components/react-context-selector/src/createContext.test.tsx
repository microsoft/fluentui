import { createContext } from './createContext';
import { isValidElementType } from 'react-is';

describe('createContext', () => {
  it('creates a Provider component', () => {
    const Context = createContext(null);

    expect(isValidElementType(Context.Provider)).toBeTruthy();
  });
});
