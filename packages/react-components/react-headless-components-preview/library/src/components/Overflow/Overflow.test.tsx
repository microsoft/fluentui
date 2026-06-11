import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Overflow } from './Overflow';
import { OverflowItem, useOverflowMenu } from './index';

describe('Overflow', () => {
  beforeAll(() => {
    // jsdom does not implement ResizeObserver, which the overflow manager observes the container with.
    // https://github.com/jsdom/jsdom/issues/3368
    global.ResizeObserver = class ResizeObserver {
      public observe() {
        /* noop */
      }
      public unobserve() {
        /* noop */
      }
      public disconnect() {
        /* noop */
      }
    };
  });

  isConformant({
    Component: Overflow,
    displayName: 'Overflow',
    // Overflow is renderless (clones its single child) and provides context, so the slot/render
    // based conformance assertions do not apply.
    disabledTests: ['component-handles-ref', 'component-has-root-ref', 'component-handles-classname'],
    requiredProps: { children: <div /> } as object,
  });

  it('forwards the ref to the single child', () => {
    const overflowRef = jest.fn();
    const childRef = jest.fn();

    render(
      <Overflow ref={overflowRef}>
        <div id="child" ref={childRef} />
      </Overflow>,
    );

    expect(overflowRef).toHaveBeenCalledWith(expect.objectContaining({ id: 'child', tagName: 'DIV' }));
    expect(childRef).toHaveBeenCalledWith(expect.objectContaining({ id: 'child', tagName: 'DIV' }));
  });

  it('does not add any built-in className to the cloned child', () => {
    const { container } = render(
      <Overflow>
        <div className="my-container" />
      </Overflow>,
    );

    // The headless Overflow must preserve only the child's own className — no Griffel/fui-* classes.
    expect((container.firstChild as HTMLElement).className).toBe('my-container');
  });

  it('registers overflow items on the child element', () => {
    const { getByText } = render(
      <Overflow>
        <div>
          <OverflowItem id="1">
            <button>foo</button>
          </OverflowItem>
        </div>
      </Overflow>,
    );

    expect(getByText('foo')).toHaveAttribute('data-overflow-item');
  });

  it('marks the overflow menu element with data-overflow-menu for styling', () => {
    const Menu: React.FC = () => {
      const { ref } = useOverflowMenu<HTMLButtonElement>();
      return (
        <button ref={ref} data-testid="menu">
          menu
        </button>
      );
    };

    const { getByTestId } = render(
      <Overflow>
        <div>
          <Menu />
        </div>
      </Overflow>,
    );

    // Headless: the engine sets the data attribute; consumers style it (e.g. `flex-shrink: 0`).
    expect(getByTestId('menu')).toHaveAttribute('data-overflow-menu');
  });
});
