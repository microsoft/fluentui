import * as React from 'react';
import { MenuTrigger } from './MenuTrigger';
import * as renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';

describe('MenuTrigger', () => {
  isConformant({
    disabledTests: [
      // MenuTrigger does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      // MenuTrigger does not have own styles
      'make-styles-overrides-win',
    ],
    Component: MenuTrigger,
    displayName: 'MenuTrigger',
    skipAsPropTests: true,
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
          aria-expanded="false"
          aria-haspopup="true"
          id=""
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
          aria-expanded="false"
          aria-haspopup="true"
          id=""
        >
          Trigger
        </button>,
      ]
    `);
  });
});
