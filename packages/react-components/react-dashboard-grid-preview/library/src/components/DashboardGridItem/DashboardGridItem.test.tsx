import * as React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { DashboardGridHandle } from '../../hooks/useDashboardGrid';
import { DashboardGrid } from '../DashboardGrid/DashboardGrid';
import { DashboardGridProvider } from '../DashboardGridProvider/DashboardGridProvider';
import { DashboardGridItem } from './DashboardGridItem';
import { createDashboardGridPointerDrag } from '../../interaction/pointerDrag';
import { isConformant } from '../../testing/isConformant';
import { createDashboardGridPointerResize } from '../../interaction/pointerResize';

const mockDestroyDrag = jest.fn();
const mockDestroyResize = jest.fn();
const mockCancelKeyboard = jest.fn();
const mockPointerDownDrag = jest.fn();

jest.mock('../../interaction/pointerDrag', () => ({
  createDashboardGridPointerDrag: jest.fn(() => ({
    onPointerDown: mockPointerDownDrag,
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
  isConformant({
    Component: DashboardGridItem,
    displayName: 'DashboardGridItem',
    requiredProps: { id: 'item' },
    disabledTests: ['component-has-static-classnames-object', 'make-styles-overrides-win'],
    getTargetElement: result => result.container.querySelector('[data-dashboard-grid-item="item"]') as HTMLElement,
    renderOptions: {
      wrapper: ({ children }) => (
        <DashboardGridProvider targetDocument={document}>
          <DashboardGrid aria-label="Dashboard">{children}</DashboardGrid>
        </DashboardGridProvider>
      ),
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a default state', () => {
    const { container } = render(
      <DashboardGridProvider targetDocument={document}>
        <DashboardGrid aria-label="Dashboard">
          <DashboardGridItem id="item">Item</DashboardGridItem>
        </DashboardGrid>
      </DashboardGridProvider>,
    );

    const item = container.querySelector('[data-dashboard-grid-item="item"]') as HTMLElement;
    expect({
      tagName: item.tagName,
      role: item.getAttribute('role'),
      label: item.getAttribute('aria-label'),
      itemId: item.getAttribute('data-dashboard-grid-item'),
      text: item.textContent,
      resizeHandle: item
        .querySelector('[data-dashboard-grid-resize-handle]')
        ?.getAttribute('data-dashboard-grid-resize-handle'),
    }).toMatchInlineSnapshot(`
      Object {
        "itemId": "item",
        "label": "item",
        "resizeHandle": "se",
        "role": "group",
        "tagName": "DIV",
        "text": "Item",
      }
    `);
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

  it('starts pointer interaction from the item root', async () => {
    render(
      <DashboardGridProvider targetDocument={document}>
        <DashboardGrid
          aria-label="Dashboard"
          defaultItems={[{ id: 'item', column: 0, row: 0 }]}
          renderItem={item => <span>{item.id}</span>}
        />
      </DashboardGridProvider>,
    );

    await waitFor(() => expect(createDashboardGridPointerDrag).toHaveBeenCalledTimes(1));
    fireEvent.pointerDown(screen.getByText('item'));

    expect(mockPointerDownDrag).toHaveBeenCalledTimes(1);
  });

  it('keeps a declarative item registered after its store definition appears', async () => {
    const imperativeRef = React.createRef<DashboardGridHandle>();
    render(
      <DashboardGridProvider targetDocument={document}>
        <DashboardGrid aria-label="Dashboard" imperativeRef={imperativeRef}>
          <DashboardGridItem id="declarative">
            <span>Declarative content</span>
          </DashboardGridItem>
        </DashboardGrid>
      </DashboardGridProvider>,
    );

    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(imperativeRef.current?.getItems()).toEqual([expect.objectContaining({ id: 'declarative' })]);
  });

  it('creates resize interactions for a locked resizable item', async () => {
    render(
      <DashboardGridProvider targetDocument={document}>
        <DashboardGrid
          aria-label="Dashboard"
          defaultItems={[{ id: 'locked', locked: true, resizable: true }]}
          renderItem={item => <span>{item.id}</span>}
        />
      </DashboardGridProvider>,
    );

    await waitFor(() => expect(createDashboardGridPointerResize).toHaveBeenCalled());
  });
});
