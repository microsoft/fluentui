import * as React from 'react';
import { render, renderHook } from '@testing-library/react';
import { useTableSelectionCellBase_unstable } from './useTableSelectionCell';
import { renderTableSelectionCell_unstable } from './renderTableSelectionCell';

const Cell = (props: Parameters<typeof useTableSelectionCellBase_unstable>[0]) => {
  const state = useTableSelectionCellBase_unstable({ as: 'div', ...props }, React.createRef());
  return renderTableSelectionCell_unstable(state);
};

describe('useTableSelectionCellBase_unstable', () => {
  it('renders a native checkbox by default', () => {
    const { container } = render(<Cell />);
    const input = container.querySelector('input') as HTMLInputElement;

    expect(input.type).toBe('checkbox');
    expect(input.checked).toBe(false);
    expect(input.indeterminate).toBe(false);
    expect(container.querySelector('.fui-Checkbox')).toBeNull();
  });

  it('reflects checked and mixed on the native checkbox', () => {
    const { container, rerender } = render(<Cell checked />);
    const input = () => container.querySelector('input') as HTMLInputElement;

    expect(input().checked).toBe(true);
    expect(input().indeterminate).toBe(false);

    rerender(<Cell checked="mixed" />);
    expect(input().checked).toBe(false);
    expect(input().indeterminate).toBe(true);

    rerender(<Cell checked={false} />);
    expect(input().indeterminate).toBe(false);
  });

  it('renders a native radio with a shared name', () => {
    const { container } = render(<Cell type="radio" checked />);
    const input = container.querySelector('input') as HTMLInputElement;

    expect(input.type).toBe('radio');
    expect(input.checked).toBe(true);
    expect(input.name).toMatch(/table-selection-radio/);
  });

  it('does not render a radio when invisible', () => {
    const { container } = render(<Cell type="radio" invisible />);

    expect(container.querySelector('input')).toBeNull();
  });

  it('lets a consumer replace the indicator props', () => {
    const { container } = render(<Cell checkboxIndicator={{ 'aria-label': 'Select row' }} />);

    expect(container.querySelector('input')?.getAttribute('aria-label')).toBe('Select row');
  });

  it('has no design state', () => {
    const { result } = renderHook(() => useTableSelectionCellBase_unstable({ checked: true }, React.createRef()));

    expect(result.current).not.toHaveProperty('subtle');
    expect(result.current.type).toBe('checkbox');
    expect(result.current.checked).toBe(true);
  });
});
