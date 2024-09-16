import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useOverflowVisibility } from './useOverflowVisibility';
import { OverflowContext, OverflowContextValue } from './overflowContext';

describe('useOverflowVisibility', () => {
  it('should return item and group visiblity', () => {
    const groupVisibility = {
      foo: 'hidden',
      bar: 'overflow',
      baz: 'visible',
    } as const;

    const itemVisibility = {
      foo: true,
      bar: true,
      baz: false,
    } as const;
    const Wrapper: React.FC = props => {
      return (
        <OverflowContext.Provider
          {...props}
          value={
            {
              groupVisibility,
              itemVisibility,
            } as unknown as OverflowContextValue
          }
        />
      );
    };
    const { result } = renderHook(useOverflowVisibility, { wrapper: Wrapper });
    expect(result.current.groupVisibility).toEqual(groupVisibility);
    expect(result.current.itemVisibility).toEqual(itemVisibility);
  });
});
