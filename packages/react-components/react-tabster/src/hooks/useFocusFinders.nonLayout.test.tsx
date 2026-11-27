import * as React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import { createTabster, disposeTabster, getTabster } from 'tabster';
import type { Types } from 'tabster';

describe('local Tabster non-layout visibility policy', () => {
  const instances = new Set<Types.Tabster>();

  const initialize = (element: HTMLElement, visibilityMode?: Types.TabsterCoreProps['visibilityMode']) => {
    const view = element.ownerDocument.defaultView;
    if (!view) {
      throw new Error('The focus test requires a DOM window.');
    }
    const instance = createTabster(view, { autoRoot: {}, controlTab: false, visibilityMode });
    instances.add(instance);
    return instance;
  };

  afterEach(() => {
    cleanup();
    instances.forEach(instance => disposeTabster(instance));
    instances.clear();
  });

  it('discovers and focuses an enabled button without layout geometry', async () => {
    const result = render(<button>Action</button>);
    const button = result.getByRole('button');
    const instance = initialize(button, 'non-layout');
    expect(button.offsetParent).toBeNull();
    expect(button.getClientRects()).toHaveLength(0);
    expect(instance.focusable.isFocusable(button)).toBe(true);
    await waitFor(() => expect(instance.focusable.findFirst({ container: result.container })).toBe(button));
    button.focus();
    expect(button.ownerDocument.activeElement).toBe(button);
  });

  it('rejects disconnected candidates and physically hidden ancestors', () => {
    const result = render(
      <div style={{ display: 'none' }}>
        <button data-testid="action">Action</button>
      </div>,
    );
    const button = result.getByTestId('action');
    const instance = initialize(button, 'non-layout');
    expect(instance.focusable.isVisible(button)).toBe(false);
    result.rerender(<button data-testid="action">Action</button>);
    const visibleButton = result.getByTestId('action');
    expect(instance.focusable.isVisible(visibleButton)).toBe(true);
    result.unmount();
    expect(instance.focusable.isVisible(visibleButton)).toBe(false);
  });

  it('allows a child to override inherited visibility', () => {
    const result = render(
      <div style={{ visibility: 'hidden' }}>
        <button style={{ visibility: 'visible' }}>Action</button>
      </div>,
    );
    const button = result.getByRole('button');
    const instance = initialize(button, 'non-layout');
    expect(instance.focusable.isVisible(button)).toBe(true);
  });

  it('distinguishes a content-hidden element from its hidden contents', () => {
    const result = render(
      <div style={{ contentVisibility: 'hidden' }} tabIndex={0} data-testid="container">
        <button data-testid="action">Action</button>
      </div>,
    );
    const container = result.getByTestId('container');
    const instance = initialize(container, 'non-layout');
    expect(instance.focusable.isVisible(container)).toBe(true);
    expect(instance.focusable.isVisible(result.getByTestId('action'))).toBe(false);
  });

  it('keeps the original mode on reuse and rejects conflicts without retaining a wrapper', () => {
    const result = render(<button>Action</button>);
    const button = result.getByRole('button');
    const instance = initialize(button, 'non-layout');
    const reused = initialize(button);
    expect(reused.focusable).toBe(instance.focusable);
    expect(reused.focusable.isVisible(button)).toBe(true);
    expect(() => initialize(button, 'layout')).toThrow('visibilityMode cannot change');
    disposeTabster(reused);
    instances.delete(reused);
    disposeTabster(instance);
    instances.delete(instance);
    const view = button.ownerDocument.defaultView;
    if (!view) {
      throw new Error('The focus test requires a DOM window.');
    }
    expect(getTabster(view)).toBeNull();
    const recreated = initialize(button);
    expect(recreated.focusable.isVisible(button)).toBe(false);
  });
});
