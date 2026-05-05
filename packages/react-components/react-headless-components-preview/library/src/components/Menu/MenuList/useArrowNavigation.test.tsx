import * as React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { useArrowNavigation } from './useArrowNavigation';

const Harness = ({ disabled }: { disabled?: number[] } = { disabled: [] }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { onKeyDown } = useArrowNavigation(containerRef, {
    itemSelector: '[role="menuitem"]',
    circular: true,
  });
  return (
    <div ref={containerRef} role="menu" onKeyDown={onKeyDown}>
      {[0, 1, 2, 3].map(i => (
        <div
          key={i}
          role="menuitem"
          tabIndex={0}
          data-testid={`item-${i}`}
          aria-disabled={disabled?.includes(i) ? 'true' : undefined}
        >
          Item {i}
        </div>
      ))}
    </div>
  );
};

describe('useArrowNavigation', () => {
  const focused = (container: HTMLElement) => container.ownerDocument.activeElement?.getAttribute('data-testid');

  it('ArrowDown moves focus from item 0 to item 1', () => {
    const { getByTestId, container } = render(<Harness />);
    act(() => getByTestId('item-0').focus());
    fireEvent.keyDown(getByTestId('item-0'), { key: 'ArrowDown' });
    expect(focused(container)).toBe('item-1');
  });

  it('ArrowDown wraps from last item to first (circular)', () => {
    const { getByTestId, container } = render(<Harness />);
    act(() => getByTestId('item-3').focus());
    fireEvent.keyDown(getByTestId('item-3'), { key: 'ArrowDown' });
    expect(focused(container)).toBe('item-0');
  });

  it('ArrowUp moves focus from item 2 to item 1', () => {
    const { getByTestId, container } = render(<Harness />);
    act(() => getByTestId('item-2').focus());
    fireEvent.keyDown(getByTestId('item-2'), { key: 'ArrowUp' });
    expect(focused(container)).toBe('item-1');
  });

  it('ArrowUp wraps from first item to last (circular)', () => {
    const { getByTestId, container } = render(<Harness />);
    act(() => getByTestId('item-0').focus());
    fireEvent.keyDown(getByTestId('item-0'), { key: 'ArrowUp' });
    expect(focused(container)).toBe('item-3');
  });

  it('Home jumps to the first item', () => {
    const { getByTestId, container } = render(<Harness />);
    act(() => getByTestId('item-2').focus());
    fireEvent.keyDown(getByTestId('item-2'), { key: 'Home' });
    expect(focused(container)).toBe('item-0');
  });

  it('End jumps to the last item', () => {
    const { getByTestId, container } = render(<Harness />);
    act(() => getByTestId('item-0').focus());
    fireEvent.keyDown(getByTestId('item-0'), { key: 'End' });
    expect(focused(container)).toBe('item-3');
  });

  it('ArrowDown from no-active-element starts at item 0', () => {
    const { getByTestId, container } = render(<Harness />);
    fireEvent.keyDown(getByTestId('item-0'), { key: 'ArrowDown' });
    expect(focused(container)).toBe('item-0');
  });

  it('ignores unrelated keys', () => {
    const { getByTestId, container } = render(<Harness />);
    act(() => getByTestId('item-1').focus());
    fireEvent.keyDown(getByTestId('item-1'), { key: 'a' });
    expect(focused(container)).toBe('item-1');
  });
});
