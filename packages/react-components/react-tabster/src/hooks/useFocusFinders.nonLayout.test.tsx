import * as React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import { createTabster, disposeTabster, getTabster, getShadowDOMAPI } from 'tabster';
import type { Types } from 'tabster';
import { getParent } from '@fluentui/react-utilities';
import { createTabsterWithConfig } from './useTabster';

describe('local Tabster non-layout visibility policy', () => {
  const instances = new Set<Types.Tabster>();
  const shadowWindows = new Map<Window & { __tabsterShadowDOMAPI?: Types.DOMAPI }, Types.DOMAPI | undefined>();

  const initialize = (element: HTMLElement, visibilityMode?: Types.TabsterCoreProps['visibilityMode']) => {
    const view: (Window & { __tabsterShadowDOMAPI?: Types.DOMAPI }) | null = element.ownerDocument.defaultView;
    if (!view) {
      throw new Error('The focus test requires a DOM window.');
    }
    const instance = createTabster(view, {
      autoRoot: {},
      controlTab: false,
      getParent,
      checkUncontrolledCompletely: candidate =>
        candidate.firstElementChild?.hasAttribute('data-is-focus-trap-zone-bumper') === true || undefined,
      DOMAPI: view.__tabsterShadowDOMAPI,
      visibilityMode,
    });
    instances.add(instance);
    return instance;
  };

  afterEach(() => {
    cleanup();
    instances.forEach(instance => disposeTabster(instance));
    instances.clear();
    shadowWindows.forEach((previous, view) => {
      expect(getTabster(view)).toBeNull();
      if (previous === undefined) {
        delete view.__tabsterShadowDOMAPI;
      } else {
        view.__tabsterShadowDOMAPI = previous;
      }
    });
    shadowWindows.clear();
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

  it('preserves Fluent focus-trap handling when the preinitialized instance is reused', () => {
    const result = render(
      <>
        <div data-testid="trap">
          <span data-is-focus-trap-zone-bumper />
        </div>
        <div data-testid="ordinary" />
      </>,
    );
    const trap = result.getByTestId('trap');
    const instance = initialize(trap, 'non-layout');
    const reused = createTabsterWithConfig(trap.ownerDocument);
    if (!reused) {
      throw new Error('Fluent initialization requires a DOM window.');
    }
    instances.add(reused);
    expect(reused.focusable).toBe(instance.focusable);
    expect(reused.uncontrolled.isUncontrolledCompletely(trap, false)).toBe(true);
    expect(reused.uncontrolled.isUncontrolledCompletely(result.getByTestId('ordinary'), false)).toBe(false);
    expect(reused.uncontrolled.isUncontrolledCompletely(result.getByTestId('ordinary'), true)).toBe(true);
  });

  it.each(['display-none', 'content-hidden', 'hidden-host', 'visible'])(
    'preserves configured shadow traversal and filters %s slot ancestors',
    async hidden => {
      const result = render(
        <>
          <div data-testid="host">
            <button slot="action" data-testid="slotted">
              Slotted
            </button>
          </div>
          <button data-testid="next">Next</button>
        </>,
      );
      const host = result.getByTestId('host');
      const view: (Window & { __tabsterShadowDOMAPI?: Types.DOMAPI }) | null = host.ownerDocument.defaultView;
      if (!view) {
        throw new Error('The shadow focus test requires a DOM window.');
      }
      shadowWindows.set(view, view.__tabsterShadowDOMAPI);
      view.__tabsterShadowDOMAPI = getShadowDOMAPI();
      const wrapper = host.ownerDocument.createElement('span');
      const slot = host.ownerDocument.createElement('slot');
      slot.name = 'action';
      wrapper.appendChild(slot);
      host.attachShadow({ mode: 'open' }).appendChild(wrapper);
      if (hidden === 'display-none') {
        wrapper.style.display = 'none';
      } else if (hidden === 'content-hidden') {
        wrapper.style.contentVisibility = 'hidden';
      } else if (hidden === 'hidden-host') {
        host.style.display = 'none';
      }

      const instance = initialize(host, 'non-layout');
      const reused = createTabsterWithConfig(host.ownerDocument);
      if (!reused) {
        throw new Error('Fluent initialization requires a DOM window.');
      }
      instances.add(reused);
      expect(reused.focusable).toBe(instance.focusable);
      const slotted = result.getByTestId('slotted');
      expect(reused.focusable.isVisible(slotted)).toBe(hidden === 'visible');
      await waitFor(() =>
        expect(reused.focusable.findFirst({ container: result.container })).toBe(
          hidden === 'visible' ? slotted : result.getByTestId('next'),
        ),
      );
    },
  );
});
