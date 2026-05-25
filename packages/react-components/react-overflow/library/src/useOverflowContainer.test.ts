import type { OverflowAxis, OverflowManager } from '@fluentui/priority-overflow';
import { createOverflowManager } from '@fluentui/priority-overflow';
import { useOverflowContainer } from './useOverflowContainer';
import { act, renderHook } from '@testing-library/react-hooks';

jest.mock('@fluentui/priority-overflow');

const mockOverflowManager = (options: Partial<OverflowManager> = {}) => {
  const defaultMock: OverflowManager = {
    attachOverflowMenu: jest.fn(() => () => undefined),
    forceUpdate: jest.fn(),
    getSnapshot: jest.fn(() => ({ hasOverflow: false, overflowCount: 0, itemVisibility: {}, groupVisibility: {} })),
    observe: jest.fn(() => () => undefined),
    registerDivider: jest.fn(() => () => undefined),
    registerItem: jest.fn(() => () => undefined),
    removeItem: jest.fn(),
    setOptions: jest.fn(),
    subscribe: jest.fn(() => () => undefined),
    update: jest.fn(),
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
    const registerItemMock = jest.fn(() => () => undefined);
    mockOverflowManager({ registerItem: registerItemMock });
    const { result } = renderHook(() =>
      useOverflowContainer(() => undefined, { onUpdateItemVisibility: () => undefined }),
    );

    const overflowItem = { element: document.createElement('div'), id: 'test', priority: 0, groupId: '0' };
    result.current.registerItem(overflowItem);

    expect(registerItemMock).toHaveBeenCalledTimes(1);
    expect(registerItemMock).toHaveBeenCalledWith(overflowItem);
  });

  it('should return cleanup when registering item', () => {
    const deregisterItemMock = jest.fn();
    const registerItemMock = jest.fn(() => deregisterItemMock);
    mockOverflowManager({ registerItem: registerItemMock });
    const { result } = renderHook(() =>
      useOverflowContainer(() => undefined, { onUpdateItemVisibility: () => undefined }),
    );

    const overflowItem = { element: document.createElement('div'), id: 'test', priority: 0, groupId: '0' };
    const deregister = result.current.registerItem(overflowItem);

    deregister();
    expect(deregisterItemMock).toHaveBeenCalledTimes(1);
  });

  it('should call observe with default options', () => {
    const observeMock = jest.fn();
    mockOverflowManager({ observe: observeMock });
    const { result, rerender } = renderHook(() => {
      return useOverflowContainer(() => undefined, { onUpdateItemVisibility: () => undefined });
    });
    act(() => {
      result.current.containerRef(document.createElement('div'));
    });
    rerender();
    expect(observeMock).toHaveBeenCalledTimes(1);
    expect(observeMock.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        <div />,
      ]
    `);
  });

  it('should reconfigure the same manager when options change', () => {
    const setOptionsMock = jest.fn();
    mockOverflowManager({ setOptions: setOptionsMock });

    let overflowAxis: OverflowAxis = 'horizontal';
    const { rerender } = renderHook(() => {
      return useOverflowContainer(() => undefined, { onUpdateItemVisibility: () => undefined, overflowAxis });
    });

    expect(createOverflowManager).toHaveBeenCalledTimes(1);

    overflowAxis = 'vertical';
    rerender();

    expect(createOverflowManager).toHaveBeenCalledTimes(1);
    expect(setOptionsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        hasHiddenItems: false,
        minimumVisible: 0,
        onUpdateItemVisibility: expect.any(Function),
        onUpdateOverflow: expect.any(Function),
        overflowAxis: 'vertical',
        overflowDirection: 'end',
        padding: 10,
      }),
    );
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
    let renderCount = 0;
    renderHook(() => {
      renderCount++;
      return useOverflowContainer(() => undefined, { onUpdateItemVisibility: () => undefined });
    });

    expect(renderCount).toEqual(1);
  });
});
