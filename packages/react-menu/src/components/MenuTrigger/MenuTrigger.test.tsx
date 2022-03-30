import * as React from 'react';
import { MenuTrigger } from './MenuTrigger';
import * as renderer from 'react-test-renderer';
import { createEvent, fireEvent, render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { mockUseMenuContext } from '../../common/mockUseMenuContext';
import { useMenuTriggerContext_unstable } from '../../contexts/menuTriggerContext';
import { Enter } from '@fluentui/keyboard-keys';

jest.mock('../../contexts/menuContext.ts');

describe('MenuTrigger', () => {
  beforeEach(() => mockUseMenuContext());

  isConformant({
    disabledTests: [
      // MenuTrigger does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classname',
      'component-has-static-classnames-object',
      'component-has-static-classname-exported',
      // MenuTrigger does not have own styles
      'make-styles-overrides-win',
    ],
    Component: MenuTrigger,
    displayName: 'MenuTrigger',
    requiredProps: {
      children: <button>MenuTrigger</button>,
    },
  });

  /**
   * Note: see more visual regression tests for MenuTrigger in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(
      <MenuTrigger>
        <button>Menu trigger</button>
      </MenuTrigger>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should retain original child callback ref', () => {
    // Arrange
    const ref = jest.fn();
    render(
      <MenuTrigger>
        <button ref={ref}>Trigger</button>
      </MenuTrigger>,
    );

    // Assert
    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        <button
          aria-haspopup="menu"
          id="id"
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
        <MenuTrigger>
          <button ref={ref}>Trigger</button>
        </MenuTrigger>
      );
    };
    render(<TestComponent />);

    // Assert
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        <button
          aria-haspopup="menu"
          id="id"
        >
          Trigger
        </button>,
      ]
    `);
  });

  it('should not open menu when aria-disabled is true', () => {
    const setOpen = jest.fn();
    mockUseMenuContext({ setOpen });

    const { getByRole } = render(
      <MenuTrigger>
        <button aria-disabled>trigger</button>
      </MenuTrigger>,
    );
    fireEvent.click(getByRole('button'));

    expect(setOpen).toBeCalledTimes(0);
  });

  it('should open menu when aria-disabled is false', () => {
    const setOpen = jest.fn();
    mockUseMenuContext({ setOpen });

    const { getByRole } = render(
      <MenuTrigger>
        <button aria-disabled={false}>trigger</button>
      </MenuTrigger>,
    );
    fireEvent.click(getByRole('button'));

    expect(setOpen).toBeCalledTimes(1);
    expect(setOpen).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ open: true }));
  });

  it('should open menu when trigger is disabled', () => {
    const setOpen = jest.fn();
    mockUseMenuContext({ setOpen });

    const { getByRole } = render(
      <MenuTrigger>
        <button disabled>trigger</button>
      </MenuTrigger>,
    );
    fireEvent.click(getByRole('button'));

    expect(setOpen).toBeCalledTimes(0);
  });

  it('should set MenuTriggerContext to false if not a submenu', () => {
    mockUseMenuContext({ isSubmenu: false });
    let contextValue: boolean | undefined;
    const TestComponent = () => {
      contextValue = useMenuTriggerContext_unstable();

      return null;
    };

    render(
      <MenuTrigger>
        <button>
          <TestComponent />
        </button>
      </MenuTrigger>,
    );

    expect(contextValue).toBe(false);
  });

  it('should set MenuTriggerContext to true if in a submenu', () => {
    mockUseMenuContext({ isSubmenu: true });
    let contextValue: boolean | undefined;
    const TestComponent = () => {
      contextValue = useMenuTriggerContext_unstable();

      return null;
    };

    render(
      <MenuTrigger>
        <button>
          <TestComponent />
        </button>
      </MenuTrigger>,
    );

    expect(contextValue).toBe(true);
  });

  it('should not keyboard click when event is default prevented', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <MenuTrigger>
        <div role="button" onClick={onClick}>
          trigger
        </div>
      </MenuTrigger>,
    );
    const event = createEvent.keyDown(getByRole('button'), { key: Enter });
    event.preventDefault();
    fireEvent(getByRole('button'), event);

    expect(onClick).toBeCalledTimes(0);
  });
});
