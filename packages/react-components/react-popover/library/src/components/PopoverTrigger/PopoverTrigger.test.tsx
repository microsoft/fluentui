import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PopoverTrigger } from './PopoverTrigger';
import { mockPopoverContext } from '../../testing/mockUsePopoverContext';
import { isConformant } from '../../testing/isConformant';

jest.mock('../../popoverContext');

describe('PopoverTrigger', () => {
  isConformant({
    Component: PopoverTrigger,
    displayName: 'PopoverTrigger',
    requiredProps: { children: <span /> },
    disabledTests: [
      // PopoverTrigger does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      // ...and therefore has no element to carry the Tailwind named-group marker either.
      // `component-has-group-marker` became a default test with the statics-removal sweep
      // (DECISIONS.md D16.6); PopoverTrigger clones the consumer's own child, so the element
      // the test would inspect belongs to the consumer. PopoverSurface — the outermost
      // element this package actually renders — carries the marker
      // (migration/griffel-to-tailwind).
      'component-has-group-marker',
      // PopoverTrigger does not have own styles
    ],
  });

  beforeEach(() => {
    mockPopoverContext();
  });

  /**
   * Note: see more visual regression tests for PopoverTrigger in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(
      <PopoverTrigger disableButtonEnhancement>
        <button>Popover trigger</button>
      </PopoverTrigger>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it.each([
    ['onClick', fireEvent.click],
    ['onContextMenu', fireEvent.contextMenu],
    ['onKeyDown', fireEvent.keyDown],
    ['onMouseEnter', fireEvent.mouseEnter],
    ['onMouseLeave', fireEvent.mouseLeave],
  ])('should keep the original %s handler', (handler, triggerEvent) => {
    // Arrange
    const spy = jest.fn();
    const { getByRole } = render(
      <PopoverTrigger disableButtonEnhancement>
        <button {...{ [handler]: spy }}>Trigger</button>
      </PopoverTrigger>,
    );

    // Act
    triggerEvent(getByRole('button'));

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should set aria-expanded on trigger element', () => {
    // Arrange
    const { getByRole } = render(
      <PopoverTrigger disableButtonEnhancement>
        <button>Trigger</button>
      </PopoverTrigger>,
    );

    // Assert
    expect(getByRole('button').getAttribute('aria-expanded')).toEqual('false');
  });

  it('should set aria-expanded to context value on trigger element', () => {
    mockPopoverContext({ open: true });

    // Arrange
    const { getByRole } = render(
      <PopoverTrigger disableButtonEnhancement>
        <button>Trigger</button>
      </PopoverTrigger>,
    );

    // Assert
    expect(getByRole('button').getAttribute('aria-expanded')).toEqual('true');
  });

  it('should allow user to override aria-expanded on trigger element', () => {
    // Arrange
    const { getByRole } = render(
      <PopoverTrigger disableButtonEnhancement>
        <button aria-expanded={undefined}>Trigger</button>
      </PopoverTrigger>,
    );

    // Assert
    expect(getByRole('button').getAttribute('aria-expanded')).toBeNull();
  });

  it('should retain original child callback ref', () => {
    // Arrange
    const ref = jest.fn();
    render(
      <PopoverTrigger disableButtonEnhancement>
        <button ref={ref}>Trigger</button>
      </PopoverTrigger>,
    );

    // Assert
    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        <button
          aria-expanded="false"
          data-tabster="{\\"restorer\\":{\\"type\\":1}}"
        >
          Trigger
        </button>,
      ]
    `);
  });

  it('should retain original child ref', () => {
    // Arrange
    const cb = jest.fn();
    const TestComponent = () => {
      const ref = React.useRef(null);
      React.useEffect(() => {
        cb(ref.current);
      }, []);
      return (
        <PopoverTrigger disableButtonEnhancement>
          <button ref={ref}>Trigger</button>
        </PopoverTrigger>
      );
    };
    render(<TestComponent />);

    // Assert
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        <button
          aria-expanded="false"
          data-tabster="{\\"restorer\\":{\\"type\\":1}}"
        >
          Trigger
        </button>,
      ]
    `);
  });
});
