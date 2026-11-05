import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import { PortalMountNodeProvider } from '@fluentui/react-shared-contexts';
import * as React from 'react';
import { createPortal } from 'react-dom';

import { usePortalMountNode } from './usePortalMountNode';

const TestPortal = (props: { children?: React.ReactNode; className?: string; disabled?: boolean }) => {
  const mountNode = usePortalMountNode(props);
  return mountNode ? createPortal(props.children, mountNode) : null;
};

describe('usePortalMountNode', () => {
  it('creates an element and attaches it to "document.body"', () => {
    const { result } = renderHook(() => usePortalMountNode({}));

    expect(result.current?.tagName).toBe('DIV');
    expect(result.current?.dataset.portalNode).toBe('true');
    expect(result.current?.parentElement).toBe(document.body);
  });

  it('creates an element and attaches it to "mountNode"', () => {
    const mountNode = document.createElement('div');
    const { result } = renderHook(() => usePortalMountNode({}), {
      wrapper: (props: { children?: React.ReactNode }) => <PortalMountNodeProvider {...props} value={mountNode} />,
    });

    expect(result.current?.tagName).toBe('DIV');
    expect(result.current?.dataset.portalNode).toBe('true');
    expect(result.current?.parentElement).toBe(mountNode);
  });

  it('applies classes to an element', () => {
    const { result } = renderHook(() => usePortalMountNode({ className: 'foo' }));

    expect(result.current?.classList).toContain('foo');
  });

  it('does not create an element if is disabled', () => {
    const { result } = renderHook(() => usePortalMountNode({ disabled: true }));

    expect(result.current).toBeNull();
  });

  it('keeps an empty mount attached when StrictMode replays effects', () => {
    const { result } = renderHook(() => usePortalMountNode({}), {
      wrapper: React.StrictMode,
    });

    expect(result.current?.parentElement).toBe(document.body);
  });

  const modernIt = (React as never)['useInsertion' + 'Effect'] ? it : it.skip;
  const react19It = Number.parseInt(React.version, 10) >= 19 ? it : it.skip;

  react19It.each(['style', 'link'] as const)(
    'keeps a hoisted %s at the document root and removes the empty portal mount',
    resource => {
      const href = resource === 'style' ? 'portal-mount-resource-style' : '/portal-mount-resource.css';
      const resourceProps = { href, precedence: 'default' };
      const view = render(
        <TestPortal>
          {resource === 'style' ? (
            <style {...resourceProps}>{'/* portal resource */'}</style>
          ) : (
            <link {...resourceProps} rel="stylesheet" />
          )}
          <span data-testid="resource-child" />
        </TestPortal>,
      );
      const mountNode = view.getByTestId('resource-child').parentElement!;
      const selector =
        resource === 'style' ? `style[data-href~="${href}"],style[href="${href}"]` : `link[href="${href}"]`;
      const hoistedAtHead = !!document.head.querySelector(selector);

      try {
        view.unmount();
        expect({
          hoistedAtHead,
          mountRemoved: !mountNode.isConnected,
        }).toEqual({ hoistedAtHead: true, mountRemoved: true });
      } finally {
        view.unmount();
        mountNode.remove();
        document.querySelectorAll(selector).forEach(element => element.remove());
      }
    },
  );

  modernIt('connects the first portal subtree without a separate descendant addition record', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const observer = new MutationObserver(() => undefined);
    observer.observe(document.body, { childList: true, subtree: true });

    const view = render(
      <TestPortal>
        <section data-testid="portal-content">
          <button>First</button>
          <button>Second</button>
        </section>
        <span data-testid="portal-sentinel" hidden />
      </TestPortal>,
      { container, baseElement: document.body },
    );

    try {
      const content = view.getByTestId('portal-content');
      const sentinel = view.getByTestId('portal-sentinel');
      const mountNode = content.parentElement!;
      const records = observer.takeRecords();
      const additions = records.filter(record =>
        Array.from(record.addedNodes).some(node => node === mountNode || node === content || node === sentinel),
      );

      expect(mountNode.parentElement).toBe(document.body);
      expect(additions).toHaveLength(2);
      expect(additions.some(record => Array.from(record.addedNodes).includes(content))).toBe(false);
    } finally {
      observer.disconnect();
      view.unmount();
      container.remove();
    }
  });

  it('preserves reentrant child ordering during a custom element connection', () => {
    const tagName = 'portal-reentrant-connection';
    if (!customElements.get(tagName)) {
      customElements.define(
        tagName,
        class extends HTMLElement {
          private marker?: HTMLElement;

          public connectedCallback() {
            this.marker = this.ownerDocument.createElement('span');
            this.marker.dataset.reentrant = 'true';
            this.parentElement!.appendChild(this.marker);
          }

          public disconnectedCallback() {
            this.marker?.remove();
          }
        },
      );
    }

    const view = render(
      <TestPortal>
        {React.createElement(tagName, { 'data-testid': 'portal-probe' })}
        <span data-testid="portal-sentinel" hidden />
      </TestPortal>,
    );

    try {
      const probe = view.getByTestId('portal-probe');
      const mountNode = probe.parentElement!;
      expect(mountNode.children).toHaveLength(3);
      expect(mountNode.children[0]).toBe(probe);
      expect((mountNode.children[1] as HTMLElement).dataset.reentrant).toBe('true');
      expect(mountNode.children[2]).toBe(view.getByTestId('portal-sentinel'));
    } finally {
      view.unmount();
    }
  });

  it('does not reconnect a mount node removed by a custom connection callback', () => {
    const tagName = 'portal-removed-during-connection';
    const removed: { mount?: HTMLElement } = {};
    if (!customElements.get(tagName)) {
      customElements.define(
        tagName,
        class extends HTMLElement {
          public connectedCallback() {
            removed.mount = this.parentElement ?? undefined;
            removed.mount?.remove();
          }
        },
      );
    }

    const view = render(
      <TestPortal>
        {React.createElement(tagName)}
        <span hidden />
      </TestPortal>,
    );

    try {
      expect(removed.mount).toBeDefined();
      expect(removed.mount?.isConnected).toBe(false);
    } finally {
      view.unmount();
    }
  });

  it('preserves mount identity on class updates and cleans up disable/re-enable under StrictMode', () => {
    const view = render(
      <React.StrictMode>
        <TestPortal className="first">
          <button data-testid="portal-child">Child</button>
        </TestPortal>
      </React.StrictMode>,
    );
    const initialMount = view.getByTestId('portal-child').parentElement!;

    view.rerender(
      <React.StrictMode>
        <TestPortal className="second">
          <button data-testid="portal-child">Child</button>
        </TestPortal>
      </React.StrictMode>,
    );
    expect(view.getByTestId('portal-child').parentElement).toBe(initialMount);
    expect(initialMount.classList).not.toContain('first');
    expect(initialMount.classList).toContain('second');

    view.rerender(
      <React.StrictMode>
        <TestPortal disabled>
          <button data-testid="portal-child">Child</button>
        </TestPortal>
      </React.StrictMode>,
    );
    expect(initialMount.isConnected).toBe(false);

    view.rerender(
      <React.StrictMode>
        <TestPortal>
          <button data-testid="portal-child">Child</button>
        </TestPortal>
      </React.StrictMode>,
    );
    const replacement = view.getByTestId('portal-child').parentElement!;
    expect(replacement).not.toBe(initialMount);
    expect(replacement.isConnected).toBe(true);
    view.unmount();
    expect(replacement.isConnected).toBe(false);
  });
});
