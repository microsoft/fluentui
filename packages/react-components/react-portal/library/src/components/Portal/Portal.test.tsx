import { render } from '@testing-library/react';
import { FluentProvider } from '@fluentui/react-provider';
import { getParent } from '@fluentui/react-utilities';
import * as React from 'react';
import { createPortal } from 'react-dom';

import { Portal } from './Portal';

describe('Portal', () => {
  const expectMountOrder = (mountNodes: HTMLElement[]) => {
    mountNodes.slice(1).forEach((mountNode, index) => {
      const previous = mountNodes[index];
      expect(mountNode.parentNode).not.toBeNull();
      expect(previous.parentNode).toBe(mountNode.parentNode);
      expect(previous.compareDocumentPosition(mountNode)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
  };

  /**
   * Note: see more visual regression tests for Portal in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const children = 'test';
    const { getByText } = render(<Portal>{children}</Portal>);

    expect(getByText(children)).toMatchSnapshot();
  });

  it('applies "dir" attribute based on a context value', () => {
    const theme = {};
    const { getByText } = render(
      <>
        <FluentProvider dir="ltr" theme={theme}>
          <Portal>LTR</Portal>
        </FluentProvider>
        <FluentProvider dir="rtl" theme={theme}>
          <Portal>RTL</Portal>
        </FluentProvider>
      </>,
    );

    expect(getByText('LTR')).toHaveAttribute('dir', 'ltr');
    expect(getByText('RTL')).toHaveAttribute('dir', 'rtl');
  });

  it('applies "zIndex" style', () => {
    const { getByText } = render(<Portal>Test</Portal>);
    const element = getByText('Test');

    expect(element).toHaveStyle({
      zIndex: 1000000,
    });
  });

  it.each([false, true])('preserves initial nested mount order with StrictMode=%s', strictMode => {
    const existingMounts = new Set(Array.from(document.body.querySelectorAll('[data-portal-node]')));
    const children = (
      <Portal>
        <div data-testid="outer-content">
          <Portal>
            <button data-testid="inner-content">Inner</button>
          </Portal>
        </div>
      </Portal>
    );
    const view = render(strictMode ? <React.StrictMode>{children}</React.StrictMode> : children);
    const outerMount = view.getByTestId('outer-content').parentElement!;
    const innerMount = view.getByTestId('inner-content').parentElement!;

    try {
      expectMountOrder([outerMount, innerMount]);
    } finally {
      view.unmount();
      // React 17's legacy StrictMode path can abandon extra empty mounts.
      document.body.querySelectorAll('[data-portal-node]').forEach(mountNode => {
        if (!existingMounts.has(mountNode) && mountNode !== outerMount && mountNode !== innerMount) {
          mountNode.remove();
        }
      });
    }

    expect(outerMount.isConnected).toBe(false);
    expect(innerMount.isConnected).toBe(false);
  });

  it('preserves initial mount order across nested and sibling portals', () => {
    const view = render(
      <>
        <Portal>
          <div data-testid="outer-content">
            <Portal>
              <button data-testid="first-inner-content">First inner</button>
            </Portal>
            <Portal>
              <button data-testid="second-inner-content">Second inner</button>
            </Portal>
          </div>
        </Portal>
        <Portal>
          <button data-testid="sibling-content">Sibling</button>
        </Portal>
      </>,
    );

    try {
      const expectedOrder = ['outer-content', 'first-inner-content', 'second-inner-content', 'sibling-content'].map(
        testId => view.getByTestId(testId).parentElement!,
      );
      expectMountOrder(expectedOrder);
    } finally {
      view.unmount();
    }
  });

  it('preserves initial sibling mount order', () => {
    const view = render(
      <>
        <Portal>
          <button data-testid="first-content">First</button>
        </Portal>
        <Portal>
          <button data-testid="second-content">Second</button>
        </Portal>
      </>,
    );

    try {
      expectMountOrder([
        view.getByTestId('first-content').parentElement!,
        view.getByTestId('second-content').parentElement!,
      ]);
    } finally {
      view.unmount();
    }
  });

  it('preserves ordering with an independently created nested portal', () => {
    const IndependentPortal = () => {
      const [mountNode] = React.useState(() => {
        const element = document.createElement('div');
        element.setAttribute('data-independent-portal', 'true');
        document.body.appendChild(element);
        return element;
      });

      React.useEffect(() => () => mountNode.remove(), [mountNode]);
      return createPortal(<button data-testid="independent-content">Independent</button>, mountNode);
    };
    const view = render(
      <Portal>
        <div data-testid="outer-content">
          <IndependentPortal />
        </div>
      </Portal>,
    );
    const outerMount = view.getByTestId('outer-content').parentElement!;
    const independentMount = view.getByTestId('independent-content').parentElement!;

    try {
      expectMountOrder([outerMount, independentMount]);
    } finally {
      view.unmount();
    }

    expect(outerMount.isConnected).toBe(false);
    expect(independentMount.isConnected).toBe(false);
  });

  it('should not set virtual parent if mount node contains virtual parent', () => {
    const Test = () => {
      const [el, setEl] = React.useState<HTMLDivElement | null>(null);
      return (
        <div id="parent">
          <div id="container" ref={setEl}>
            <Portal mountNode={el}>Foo</Portal>
          </div>
        </div>
      );
    };

    const { container } = render(<Test />);

    const mountNode = container.querySelector<HTMLSpanElement>('#container');
    expect((getParent(mountNode) as HTMLElement).id).toBe('parent');
  });
});
