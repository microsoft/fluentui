import * as React from 'react';
import type { OverflowManager } from '@fluentui/priority-overflow';
import { renderHook } from '@testing-library/react-hooks';
import { useOverflowVisibility } from './useOverflowVisibility';
import type { OverflowContextValue } from './overflowContext';
import { OverflowContext } from './overflowContext';

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
    const manager = {
      getSnapshot: jest.fn(() => ({
        hasOverflow: true,
        overflowCount: 1,
        itemVisibility,
        groupVisibility,
      })),
      subscribe: jest.fn(() => () => undefined),
    } as unknown as OverflowManager;
    const Wrapper: React.FC = props => {
      return (
        <OverflowContext.Provider
          {...props}
          value={
            {
              manager,
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
