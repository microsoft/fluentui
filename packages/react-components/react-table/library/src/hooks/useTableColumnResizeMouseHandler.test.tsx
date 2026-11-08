import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { useTableColumnResizeMouseHandler } from './useTableColumnResizeMouseHandler';
import type { ColumnResizeState, TableColumnId } from './types';

const ResizingExample = ({ columnId, resizeState }: { columnId: TableColumnId; resizeState: ColumnResizeState }) => {
  const { getOnMouseDown, dragging } = useTableColumnResizeMouseHandler(resizeState);
  return (
    <div
      data-testid="handle"
      data-dragging={dragging}
      onMouseDown={getOnMouseDown(columnId)}
      onTouchStart={getOnMouseDown(columnId)}
    />
  );
};

describe('useTableColumnResizeMouseHandler', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it.each([0, '', 1, 'name'])('resizes column %p with mouse movement and stops after mouseup', columnId => {
    const resizeState: ColumnResizeState = {
      getColumnWidth: jest.fn(() => 200),
      setColumnWidth: jest.fn(),
      getColumnById: () => undefined,
      getColumns: () => [],
    };
    const { getByTestId } = render(<ResizingExample columnId={columnId} resizeState={resizeState} />);
    const handle = getByTestId('handle');
    const targetDocument = handle.ownerDocument;
    fireEvent.mouseDown(handle, { clientX: 100, button: 0 });
    try {
      expect(handle.getAttribute('data-dragging')).toBe('true');
      fireEvent.mouseMove(targetDocument, { clientX: 125 });
      act(() => jest.advanceTimersToNextFrame());
      expect(resizeState.setColumnWidth).toHaveBeenLastCalledWith(expect.any(MouseEvent), { columnId, width: 225 });
      fireEvent.mouseMove(targetDocument, { clientX: 110 });
      act(() => jest.advanceTimersToNextFrame());
      expect(resizeState.setColumnWidth).toHaveBeenLastCalledWith(expect.any(MouseEvent), { columnId, width: 210 });
      expect(resizeState.setColumnWidth).toHaveBeenCalledTimes(2);
    } finally {
      fireEvent.mouseUp(targetDocument);
    }
    expect(handle.getAttribute('data-dragging')).toBe('false');
    fireEvent.mouseMove(targetDocument, { clientX: 150 });
    act(() => jest.advanceTimersToNextFrame());
    expect(resizeState.setColumnWidth).toHaveBeenCalledTimes(2);
  });

  it.each([0, '', 1, 'name'])('resizes column %p with touch movement and stops after touchend', columnId => {
    const resizeState: ColumnResizeState = {
      getColumnWidth: jest.fn(() => 200),
      setColumnWidth: jest.fn(),
      getColumnById: () => undefined,
      getColumns: () => [],
    };
    const { getByTestId } = render(<ResizingExample columnId={columnId} resizeState={resizeState} />);
    const handle = getByTestId('handle');
    const targetDocument = handle.ownerDocument;
    fireEvent.touchStart(handle, { touches: [{ clientX: 100 }] });
    try {
      expect(handle.getAttribute('data-dragging')).toBe('true');
      fireEvent.touchMove(targetDocument, { touches: [{ clientX: 125 }] });
      act(() => jest.advanceTimersToNextFrame());
      expect(resizeState.setColumnWidth).toHaveBeenLastCalledWith(expect.any(TouchEvent), { columnId, width: 225 });
      fireEvent.touchMove(targetDocument, { touches: [{ clientX: 110 }] });
      act(() => jest.advanceTimersToNextFrame());
      expect(resizeState.setColumnWidth).toHaveBeenLastCalledWith(expect.any(TouchEvent), { columnId, width: 210 });
      expect(resizeState.setColumnWidth).toHaveBeenCalledTimes(2);
    } finally {
      fireEvent.touchEnd(targetDocument);
    }
    expect(handle.getAttribute('data-dragging')).toBe('false');
    fireEvent.touchMove(targetDocument, { touches: [{ clientX: 150 }] });
    act(() => jest.advanceTimersToNextFrame());
    expect(resizeState.setColumnWidth).toHaveBeenCalledTimes(2);
  });
});
