import * as React from 'react';

export function createUseIdMock() {
  let idCounter = 0;

  return {
    useId: jest.fn().mockImplementation((prefix: string) => {
      return React.useMemo(() => {
        idCounter += 1;
        return `${prefix}${idCounter}`;
      }, [prefix]);
    }),
    resetIdsForTests: () => {
      idCounter = 0;
    },
  };
}
