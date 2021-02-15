import { createContext } from '@fluentui/react-context-selector';
import * as ReactIs from 'react-is';

describe('createContext', () => {
  it('creates a Provider component', () => {
    const Context = createContext(null);
    expect(ReactIs.isValidElementType(Context.Provider)).toBeTruthy();
  });
});
