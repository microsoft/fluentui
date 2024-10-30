import { render } from '@testing-library/react';
import { FluentProvider } from '@fluentui/react-provider';
import { getParent } from '@fluentui/react-utilities';
import * as React from 'react';

import { Portal } from './Portal';

describe('Portal', () => {
  it('creates an element and attaches it to "document.body"', () => {
    const { getByText } = render(<Portal>Test</Portal>);
    const element = getByText('Test');

    expect(document.body.children).toContain(element);
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

  it('applies "className"', () => {
    const { getByText } = render(<Portal mountNode={{ className: 'foo' }}>Test</Portal>);

    expect(getByText('Test')).toHaveClass('foo');
  });

  it('applies "zIndex" style', () => {
    const { getByText } = render(<Portal>Test</Portal>);

    expect(getByText('Test')).toHaveStyle({ zIndex: 1000000 });
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

  describe('mountNode', () => {
    it('renders portal content into the specified mount node', () => {
      const mountNode = document.createElement('div');

      mountNode.id = 'mount-node';
      document.body.appendChild(mountNode);

      const { getByText } = render(
        <Portal mountNode={mountNode}>
          <span>Test</span>
        </Portal>,
      );
      const portalEl = getByText('Test');

      expect(portalEl).toBeInstanceOf(HTMLSpanElement);
      expect(portalEl.parentElement).toBe(mountNode);
    });

    it('does not add attributes to a mount node', () => {
      const mountNode = document.createElement('div');

      mountNode.id = 'mount-node';
      document.body.appendChild(mountNode);

      render(
        <Portal mountNode={mountNode}>
          <span>Test</span>
        </Portal>,
      );

      expect(mountNode).toMatchInlineSnapshot(`
        <div
          id="mount-node"
        >
          <span>
            Test
          </span>
        </div>
      `);
    });
  });
});
