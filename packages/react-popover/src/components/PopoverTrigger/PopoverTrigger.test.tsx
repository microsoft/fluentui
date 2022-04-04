import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PopoverTrigger } from './PopoverTrigger';
import * as renderer from 'react-test-renderer';
import { mockPopoverContext } from '../../common/mockUsePopoverContext';
import { isConformant } from '../../common/isConformant';

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
      'component-has-static-classname',
      'component-has-static-classnames-object',
      'component-has-static-classname-exported',
      // PopoverTrigger does not have own styles
      'make-styles-overrides-win',
    ],
  });

  beforeEach(() => {
    mockPopoverContext();
  });

  /**
   * Note: see more visual regression tests for PopoverTrigger in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(
      <PopoverTrigger>
        <button>Popover trigger</button>
      </PopoverTrigger>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
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
      <PopoverTrigger>
        <button {...{ [handler]: spy }}>Trigger</button>
      </PopoverTrigger>,
    );

    // Act
    triggerEvent(getByRole('button'));

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should set aria-haspopup on trigger element', () => {
    // Arrange
    const { getByRole } = render(
      <PopoverTrigger>
        <button>Trigger</button>
      </PopoverTrigger>,
    );

    // Assert
    expect(getByRole('button').getAttribute('aria-haspopup')).toEqual('true');
  });

  it('should allow user to override aria-haspopoup on trigger element', () => {
    // Arrange
    const { getByRole } = render(
      <PopoverTrigger>
        <button aria-haspopup="false">Trigger</button>
      </PopoverTrigger>,
    );

    // Assert
    expect(getByRole('button').getAttribute('aria-haspopup')).toEqual('false');
  });

  it('should retain original child callback ref', () => {
    // Arrange
    const ref = jest.fn();
    render(
      <PopoverTrigger>
        <button ref={ref}>Trigger</button>
      </PopoverTrigger>,
    );

    // Assert
    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        <button
          aria-haspopup="true"
          data-tabster="{\\"deloser\\":{}}"
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
        <PopoverTrigger>
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
          aria-haspopup="true"
          data-tabster="{\\"deloser\\":{}}"
        >
          Trigger
        </button>,
      ]
    `);
  });

  it('should use aria-haspopup="dialog" if focus trapped', () => {
    // Arrange
    mockPopoverContext({ trapFocus: true });
    const { getByRole } = render(
      <PopoverTrigger>
        <button>Trigger</button>
      </PopoverTrigger>,
    );

    // Assert
    expect(getByRole('button').getAttribute('aria-haspopup')).toEqual('dialog');
  });
});
