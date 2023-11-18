import * as React from 'react';
import { createOverflowManager, OverflowAxis, OverflowManager } from '@fluentui/priority-overflow';
import { useOverflowContainer } from './useOverflowContainer';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('@fluentui/priority-overflow');

const mockOverflowManager = (options: Partial<OverflowManager> = {}) => {
  const defaultMock: OverflowManager = {
    addItem: jest.fn(),
    addOverflowMenu: jest.fn(),
    disconnect: jest.fn(),
    forceUpdate: jest.fn(),
    observe: jest.fn(),
    removeItem: jest.fn(),
    removeOverflowMenu: jest.fn(),
    update: jest.fn(),
    addDivider: jest.fn(),
    removeDivider: jest.fn(),
  };
  (createOverflowManager as jest.Mock).mockReturnValue({
    ...defaultMock,
    ...options,
  } as OverflowManager);
};

describe('useOverflowContainer', () => {
  it('should create overflow manager', () => {
    renderHook(() => useOverflowContainer(() => undefined, { onUpdateItemVisibility: () => undefined }));

    expect(createOverflowManager).toHaveBeenCalledTimes(1);
  });

  it('should add to overflow manager when registering item', () => {
    const addItemMock = jest.fn();
    mockOverflowManager({ addItem: addItemMock });
    const { result } = renderHook(() =>
      useOverflowContainer(() => undefined, { onUpdateItemVisibility: () => undefined }),
    );

    const overflowItem = { element: document.createElement('div'), id: 'test', priority: 0, groupId: '0' };
    result.current.registerItem(overflowItem);

    expect(addItemMock).toHaveBeenCalledTimes(1);
    expect(addItemMock).toHaveBeenCalledWith(overflowItem);
  });

  it('should return cleanup when registering item', () => {
    const removeItemMock = jest.fn();
    mockOverflowManager({ removeItem: removeItemMock });
    const { result } = renderHook(() =>
      useOverflowContainer(() => undefined, { onUpdateItemVisibility: () => undefined }),
    );

    const overflowItem = { element: document.createElement('div'), id: 'test', priority: 0, groupId: '0' };
    const deregister = result.current.registerItem(overflowItem);

    deregister();
    expect(removeItemMock).toHaveBeenCalledTimes(1);
    expect(removeItemMock).toHaveBeenCalledWith(overflowItem.id);
  });

  it('should call observe with default options', () => {
    const observeMock = jest.fn();
    mockOverflowManager({ observe: observeMock });
    const { result, rerender } = renderHook(() => {
      return useOverflowContainer(() => undefined, { onUpdateItemVisibility: () => undefined });
    });
    (result.current.containerRef as React.MutableRefObject<HTMLDivElement>).current = document.createElement('div');
    rerender();
    expect(observeMock).toHaveBeenCalledTimes(1);
    expect(observeMock.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        <div />,
        Object {
          "minimumVisible": 0,
          "onUpdateItemVisibility": [Function],
          "onUpdateOverflow": [Function],
          "overflowAxis": "horizontal",
          "overflowDirection": "end",
          "padding": 10,
        },
      ]
    `);
  });

  it('should invoke updateOverflow on overflow manager', () => {
    const updateMock = jest.fn();
    mockOverflowManager({ update: updateMock });
    const { result } = renderHook(() =>
      useOverflowContainer(() => undefined, { onUpdateItemVisibility: () => undefined }),
    );

    result.current.updateOverflow();

    expect(updateMock).toHaveBeenCalledTimes(1);
  });

  it('should not re-render on first mount', () => {
    mockOverflowManager();
    const { result } = renderHook(() =>
      useOverflowContainer(() => undefined, { onUpdateItemVisibility: () => undefined }),
    );

    expect(result.all.length).toEqual(1);
  });

  it('should re-render when option changes', () => {
    let overflowAxis: OverflowAxis = 'horizontal';
    mockOverflowManager();
    const { result, rerender } = renderHook(() =>
      useOverflowContainer(() => undefined, { onUpdateItemVisibility: () => undefined, overflowAxis }),
    );

    expect(result.all.length).toEqual(1);

    overflowAxis = 'vertical';
    rerender();

    expect(result.all.length).toEqual(2);
  });
});
