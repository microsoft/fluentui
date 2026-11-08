import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useKeyboardResizing } from './useKeyboardResizing';
import type { ColumnResizeState, EnableKeyboardModeOnChangeCallback, TableColumnId } from './types';

const createResizeState = () =>
  ({
    getColumnWidth: jest.fn(() => 200),
    setColumnWidth: jest.fn(),
    getColumnById: () => undefined,
    getColumns: () => [],
  } satisfies ColumnResizeState);

const ResizingExample = ({
  columnId,
  resizeState,
  onChange,
}: {
  columnId: TableColumnId;
  resizeState: ColumnResizeState;
  onChange: EnableKeyboardModeOnChangeCallback;
}) => {
  const { toggleInteractiveMode, getKeyboardResizingProps } = useKeyboardResizing(resizeState);
  return (
    <>
      <button onClick={() => toggleInteractiveMode(columnId, onChange)}>Resize</button>
      <div {...getKeyboardResizingProps(columnId, 200)} data-testid="handle" />
      <button>After</button>
    </>
  );
};

describe('useKeyboardResizing', () => {
  it.each([0, '', 1, 'name'])('enables and disables column %p on successive toggles', columnId => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useKeyboardResizing(createResizeState()));
    act(() => result.current.toggleInteractiveMode(columnId, onChange));
    expect(result.current.columnId).toBe(columnId);
    expect(onChange).toHaveBeenLastCalledWith(columnId, true);
    act(() => result.current.toggleInteractiveMode(columnId, onChange));
    expect(result.current.columnId).toBeUndefined();
    expect(onChange).toHaveBeenLastCalledWith(columnId, false);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it.each([0, ''])('switches from another column to %p', columnId => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useKeyboardResizing(createResizeState()));
    act(() => result.current.toggleInteractiveMode(1, onChange));
    act(() => result.current.toggleInteractiveMode(columnId, onChange));
    expect(result.current.columnId).toBe(columnId);
    expect(onChange).toHaveBeenLastCalledWith(columnId, true);
    act(() => result.current.toggleInteractiveMode(columnId, onChange));
    expect(result.current.columnId).toBeUndefined();
    expect(onChange).toHaveBeenLastCalledWith(columnId, false);
  });

  describe.each([0, ''])('keyboard interaction for column %p', columnId => {
    it.each([
      ['ArrowRight', false, 220],
      ['ArrowLeft', false, 180],
      ['ArrowRight', true, 205],
      ['ArrowLeft', true, 195],
    ] as const)('resizes with %s and shift=%s to %s', (key, shiftKey, width) => {
      const resizeState = createResizeState();
      const onChange = jest.fn();
      const { getByRole, getByTestId } = render(
        <ResizingExample columnId={columnId} resizeState={resizeState} onChange={onChange} />,
      );
      fireEvent.click(getByRole('button', { name: 'Resize' }));
      const handle = getByTestId('handle');
      expect(handle.getAttribute('aria-hidden')).toBe('false');
      expect(handle.matches(':focus')).toBe(true);
      expect(fireEvent.keyDown(handle, { key, shiftKey })).toBe(false);
      expect(resizeState.getColumnWidth).toHaveBeenLastCalledWith(columnId);
      expect(resizeState.setColumnWidth).toHaveBeenCalledTimes(1);
      expect(resizeState.setColumnWidth).toHaveBeenLastCalledWith(expect.any(KeyboardEvent), { columnId, width });
    });

    it.each(['Escape', 'Enter', ' '])('exits and cleans up keyboard mode with %p', key => {
      const onChange = jest.fn();
      const { getByRole, getByTestId } = render(
        <ResizingExample columnId={columnId} resizeState={createResizeState()} onChange={onChange} />,
      );
      fireEvent.click(getByRole('button', { name: 'Resize' }));
      const handle = getByTestId('handle');
      expect(fireEvent.keyDown(handle, { key })).toBe(false);
      expect(handle.getAttribute('aria-hidden')).toBe('true');
      expect(handle.hasAttribute('tabindex')).toBe(false);
      expect(handle.matches(':focus')).toBe(false);
      expect(onChange).toHaveBeenLastCalledWith(columnId, false);
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('disables keyboard mode on focus leaving the handle', () => {
      const onChange = jest.fn();
      const { getByRole, getByTestId } = render(
        <ResizingExample columnId={columnId} resizeState={createResizeState()} onChange={onChange} />,
      );
      fireEvent.click(getByRole('button', { name: 'Resize' }));
      act(() => getByRole('button', { name: 'After' }).focus());
      const handle = getByTestId('handle');
      expect(handle.getAttribute('aria-hidden')).toBe('true');
      expect(handle.hasAttribute('tabindex')).toBe(false);
      expect(onChange).toHaveBeenLastCalledWith(columnId, false);
      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });
});
