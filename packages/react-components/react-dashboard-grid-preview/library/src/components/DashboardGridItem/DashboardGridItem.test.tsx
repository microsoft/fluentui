import * as React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import type { DashboardGridHandle } from '../../hooks/useDashboardGrid';
import { DashboardGrid } from '../DashboardGrid/DashboardGrid';
import { DashboardGridProvider } from '../DashboardGridProvider/DashboardGridProvider';
import { createDashboardGridPointerDrag } from '../../interaction/pointerDrag';

const mockDestroyDrag = jest.fn();
const mockDestroyResize = jest.fn();
const mockCancelKeyboard = jest.fn();

jest.mock('../../interaction/pointerDrag', () => ({
  createDashboardGridPointerDrag: jest.fn(() => ({
    onPointerDown: jest.fn(),
    cancel: jest.fn(),
    destroy: mockDestroyDrag,
  })),
}));

jest.mock('../../interaction/pointerResize', () => ({
  createDashboardGridPointerResize: jest.fn(() => ({
    onPointerDown: jest.fn(),
    cancel: jest.fn(),
    destroy: mockDestroyResize,
  })),
}));

jest.mock('../../interaction/keyboardInteraction', () => ({
  createDashboardGridKeyboardInteraction: jest.fn(() => ({
    onKeyDown: jest.fn(),
    isArranging: jest.fn(() => false),
    cancel: mockCancelKeyboard,
  })),
}));

describe('DashboardGridItem interaction lifecycle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('keeps interaction controllers mounted across geometry snapshot updates', async () => {
    const imperativeRef = React.createRef<DashboardGridHandle>();
    const { unmount } = render(
      <DashboardGridProvider targetDocument={document}>
        <DashboardGrid
          aria-label="Dashboard"
          imperativeRef={imperativeRef}
          defaultItems={[{ id: 'item', column: 0, row: 0 }]}
          renderItem={item => <span>{item.id}</span>}
        />
      </DashboardGridProvider>,
    );

    await waitFor(() => expect(createDashboardGridPointerDrag).toHaveBeenCalledTimes(1));
    const initialDragCleanupCount = mockDestroyDrag.mock.calls.length;
    const initialResizeCleanupCount = mockDestroyResize.mock.calls.length;
    const initialKeyboardCleanupCount = mockCancelKeyboard.mock.calls.length;

    act(() => {
      imperativeRef.current?.updateItem('item', { column: 1 });
    });

    expect(mockDestroyDrag.mock.calls.length).toBe(initialDragCleanupCount);
    expect(mockDestroyResize.mock.calls.length).toBe(initialResizeCleanupCount);
    expect(mockCancelKeyboard.mock.calls.length).toBe(initialKeyboardCleanupCount);

    unmount();
    expect(mockDestroyDrag.mock.calls.length).toBe(initialDragCleanupCount + 1);
    expect(mockDestroyResize.mock.calls.length).toBe(initialResizeCleanupCount + 1);
    expect(mockCancelKeyboard.mock.calls.length).toBe(initialKeyboardCleanupCount + 1);
  });
});
