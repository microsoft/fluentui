import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { DashboardGridDragSource } from './DashboardGridDragSource';

const mockOnPointerDown = jest.fn();
const mockOnKeyDown = jest.fn();

jest.mock('../../hooks/useDashboardGridDragSource', () => ({
  useDashboardGridDragSource: () => ({
    sourceRef: jest.fn(),
    previewRef: jest.fn(),
    onPointerDown: mockOnPointerDown,
    onKeyDown: mockOnKeyDown,
  }),
}));

describe('DashboardGridDragSource', () => {
  beforeEach(() => {
    mockOnPointerDown.mockClear();
    mockOnKeyDown.mockClear();
  });

  it('renders an accessible source and hidden dedicated preview slot', () => {
    const { getByRole } = render(
      <DashboardGridDragSource
        id="source"
        label="Add revenue"
        descriptor={{ id: 'revenue' }}
        preview={<div>Revenue preview</div>}
      >
        Add revenue
      </DashboardGridDragSource>,
    );

    const source = getByRole('button', { name: 'Add revenue' });
    const preview = source.querySelector('[data-dashboard-grid-preview]');
    expect(source.getAttribute('data-dashboard-grid-drag-source')).toBe('source');
    expect(preview?.getAttribute('aria-hidden')).toBe('true');
    expect(preview?.textContent).toContain('Revenue preview');

    fireEvent.pointerDown(source);
    fireEvent.keyDown(source, { key: 'Enter' });
    expect(mockOnPointerDown).toHaveBeenCalledTimes(1);
    expect(mockOnKeyDown).toHaveBeenCalledTimes(1);
  });

  it('removes a disabled source from the tab order', () => {
    const { getByRole } = render(
      <DashboardGridDragSource id="source" descriptor={{ id: 'revenue' }} label="Add revenue" disabled>
        Add revenue
      </DashboardGridDragSource>,
    );

    expect(getByRole('button', { name: 'Add revenue' }).getAttribute('tabindex')).toBe('-1');
  });
});
