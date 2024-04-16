import * as React from 'react';
import { useOverflowItem } from './useOverflowItem';
import { OverflowContext, OverflowContextValue } from './overflowContext';
import { renderHook } from '@testing-library/react-hooks';

const mockContextValue = (options: Partial<OverflowContextValue> = {}) =>
  ({
    groupVisibility: {},
    hasOverflow: false,
    itemVisibility: {},
    registerItem: jest.fn(),
    updateOverflow: jest.fn(),
    ...options,
  } as OverflowContextValue);

describe('useOverflowItem', () => {
  it('should register item', () => {
    const registerItemMock = jest.fn();
    const value = mockContextValue({ registerItem: registerItemMock });
    renderHook(
      () => {
        const ref = useOverflowItem('test', 0, '0');
        (ref as React.MutableRefObject<HTMLDivElement>).current = document.createElement('div');
      },
      {
        wrapper: ({ children }) => <OverflowContext.Provider value={value}>{children}</OverflowContext.Provider>,
      },
    );

    expect(registerItemMock).toHaveBeenCalledTimes(1);
    expect(registerItemMock.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        Object {
          "element": <div />,
          "groupId": "0",
          "id": "test",
          "priority": 0,
        },
      ]
    `);
  });

  it('should cleanup item on unmount', () => {
    const cleanupMock = jest.fn();
    const registerItemMock = jest.fn().mockReturnValue(cleanupMock);
    const value = mockContextValue({ registerItem: registerItemMock });
    const { unmount } = renderHook(
      () => {
        const ref = useOverflowItem('test', 0, '0');
        (ref as React.MutableRefObject<HTMLDivElement>).current = document.createElement('div');
      },
      {
        wrapper: ({ children }) => <OverflowContext.Provider value={value}>{children}</OverflowContext.Provider>,
      },
    );

    unmount();
    expect(cleanupMock).toHaveBeenCalledTimes(1);
  });
});
