import * as React from 'react';
import type { OverflowAxis, OverflowManager } from '@fluentui/priority-overflow';
import { createOverflowManager } from '@fluentui/priority-overflow';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useOverflowContainer } from './useOverflowContainer';

jest.mock('@fluentui/priority-overflow');

const mockOverflowManager = (options: Partial<OverflowManager> = {}) => {
  const defaultMock: OverflowManager = {
    addItem: jest.fn(),
    addOverflowMenu: jest.fn(),
    disconnect: jest.fn(),
    forceUpdate: jest.fn(),
    observe: jest.fn(() => () => null),
    removeItem: jest.fn(),
    removeOverflowMenu: jest.fn(),
    update: jest.fn(),
    addDivider: jest.fn(),
    removeDivider: jest.fn(),
    setOptions: jest.fn(),
  };
  (createOverflowManager as jest.Mock).mockReturnValue({
    ...defaultMock,
    ...options,
  } as OverflowManager);
};

describe('useOverflowContainer', () => {
  beforeEach(() => {
    (createOverflowManager as jest.Mock).mockReset();
    mockOverflowManager();
  });

  it('should create overflow manager with the provided options', () => {
    renderHook(() => useOverflowContainer(() => undefined, { onUpdateItemVisibility: () => undefined, padding: 25 }));

    expect(createOverflowManager).toHaveBeenCalledTimes(1);
    expect((createOverflowManager as jest.Mock).mock.calls[0][0]).toMatchObject({
      padding: 25,
      onUpdateItemVisibility: expect.any(Function),
      onUpdateOverflow: expect.any(Function),
    });
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

  it('should call observe with the container element', () => {
    const observeMock = jest.fn(() => () => null);
    mockOverflowManager({ observe: observeMock });

    const TestComponent: React.FC = () => {
      const { containerRef } = useOverflowContainer<HTMLDivElement>(() => undefined, {
        onUpdateItemVisibility: () => undefined,
      });
      return <div ref={containerRef} data-testid="container" />;
    };

    const { getByTestId } = render(<TestComponent />);
    expect(observeMock).toHaveBeenCalledTimes(1);
    expect(observeMock).toHaveBeenCalledWith(getByTestId('container'));
  });

  it('should dispose observation on unmount', () => {
    const disposeMock = jest.fn();
    const observeMock = jest.fn(() => disposeMock);
    mockOverflowManager({ observe: observeMock });

    const TestComponent: React.FC = () => {
      const { containerRef } = useOverflowContainer<HTMLDivElement>(() => undefined, {
        onUpdateItemVisibility: () => undefined,
      });
      return <div ref={containerRef} />;
    };

    const { unmount } = render(<TestComponent />);
    expect(disposeMock).not.toHaveBeenCalled();
    unmount();
    expect(disposeMock).toHaveBeenCalledTimes(1);
  });

  it('should call setOptions when options change', () => {
    const setOptionsMock = jest.fn();
    mockOverflowManager({ setOptions: setOptionsMock });

    let overflowAxis: OverflowAxis = 'horizontal';
    const { rerender } = renderHook(() =>
      useOverflowContainer(() => undefined, { onUpdateItemVisibility: () => undefined, overflowAxis }),
    );

    setOptionsMock.mockClear();
    overflowAxis = 'vertical';
    rerender();

    expect(setOptionsMock).toHaveBeenCalled();
    expect(setOptionsMock.mock.calls[setOptionsMock.mock.calls.length - 1][0]).toMatchObject({
      overflowAxis: 'vertical',
    });
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
    let renderCount = 0;
    renderHook(() => {
      renderCount++;
      return useOverflowContainer(() => undefined, { onUpdateItemVisibility: () => undefined });
    });

    expect(renderCount).toEqual(1);
  });
});
