import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { DashboardGridDragSource } from './DashboardGridDragSource';
import { DashboardGridProvider } from '../DashboardGridProvider/DashboardGridProvider';
import { isConformant } from '../../testing/isConformant';

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
  isConformant({
    Component: DashboardGridDragSource,
    displayName: 'DashboardGridDragSource',
    requiredProps: {
      id: 'source',
      descriptor: { id: 'item' },
    },
    disabledTests: ['component-has-static-classnames-object', 'make-styles-overrides-win'],
    renderOptions: {
      wrapper: ({ children }) => <DashboardGridProvider>{children}</DashboardGridProvider>,
    },
  });

  beforeEach(() => {
    mockOnPointerDown.mockClear();
    mockOnKeyDown.mockClear();
  });

  it('renders a default state', () => {
    const { container } = render(
      <DashboardGridProvider>
        <DashboardGridDragSource id="source" descriptor={{ id: 'item' }}>
          Add item
        </DashboardGridDragSource>
      </DashboardGridProvider>,
    );

    const source = container.firstElementChild as HTMLElement;
    expect({
      tagName: source.tagName,
      role: source.getAttribute('role'),
      tabIndex: source.getAttribute('tabindex'),
      sourceId: source.getAttribute('data-dashboard-grid-drag-source'),
      text: source.textContent,
    }).toMatchInlineSnapshot(`
      Object {
        "role": "button",
        "sourceId": "source",
        "tabIndex": "0",
        "tagName": "DIV",
        "text": "Add item",
      }
    `);
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
