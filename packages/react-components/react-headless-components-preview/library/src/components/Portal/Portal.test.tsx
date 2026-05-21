import * as React from 'react';
import { render } from '@testing-library/react';
import { getParent } from '@fluentui/react-utilities';
import { isConformant } from '../../testing/isConformant';
import { Portal } from './Portal';

describe('Portal', () => {
  isConformant({
    Component: Portal,
    displayName: 'Portal',
    disabledTests: ['component-handles-classname', 'component-has-root-ref', 'component-handles-ref'],
  });

  it('renders children into document.body by default', () => {
    const { getByTestId, baseElement } = render(
      <Portal>
        <div data-testid="portal-child">Content</div>
      </Portal>,
    );

    const child = getByTestId('portal-child');
    expect(child.parentElement).toBe(baseElement);
  });

  it('renders children into the provided mountNode', () => {
    const TestComponent = () => {
      const [el, setEl] = React.useState<HTMLDivElement | null>(null);
      return (
        <>
          <div data-testid="mount" ref={setEl} />
          {el && (
            <Portal mountNode={el}>
              <div data-testid="portal-child">Content</div>
            </Portal>
          )}
        </>
      );
    };

    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('portal-child').parentElement).toBe(getByTestId('mount'));
  });

  it('renders a hidden anchor span at the original tree location', () => {
    const { container } = render(
      <div data-testid="parent">
        <Portal>
          <div>Content</div>
        </Portal>
      </div>,
    );

    const anchor = container.querySelector<HTMLSpanElement>('[data-testid="parent"] > span');
    expect(anchor).not.toBeNull();
    expect(anchor).toHaveAttribute('hidden');
  });

  it('links the portal mountNode to the anchor via setVirtualParent', () => {
    const TestComponent = () => {
      const [mountNode, setMountNode] = React.useState<HTMLDivElement | null>(null);
      return (
        <div data-testid="react-parent">
          <Portal mountNode={mountNode}>
            <div>Content</div>
          </Portal>
          <div data-testid="mount" ref={setMountNode} />
        </div>
      );
    };

    const { getByTestId } = render(<TestComponent />);
    const anchor = getByTestId('react-parent').querySelector<HTMLSpanElement>(':scope > span');

    // Virtual parent of the mountNode is the anchor — walking up from the
    // mountNode reaches the anchor, then the React parent.
    expect(getParent(getByTestId('mount'))).toBe(anchor);
  });

  it('does not link virtual parent when mountNode already contains the anchor', () => {
    const TestComponent = () => {
      const [el, setEl] = React.useState<HTMLDivElement | null>(null);
      return (
        <div data-testid="virtual-parent-cycle">
          <div data-testid="mount-container" ref={setEl}>
            {el && (
              <Portal mountNode={el}>
                <div>Content</div>
              </Portal>
            )}
          </div>
        </div>
      );
    };

    const { getByTestId } = render(<TestComponent />);
    // mountNode contains the anchor span, so linking would create a parent cycle.
    // We expect no virtual parent to be set; getParent falls back to the real DOM parent.
    expect(getParent(getByTestId('mount-container'))).toBe(getByTestId('virtual-parent-cycle'));
  });
});
