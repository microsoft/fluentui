import * as React from 'react';
import { DialogTrigger } from './DialogTrigger';
import * as renderer from 'react-test-renderer';
import { createEvent, fireEvent, render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { mockUseDialogContext } from '../../testing/mockUseDialogContext';
import { Enter } from '@fluentui/keyboard-keys';
import { DialogTriggerProps } from './DialogTrigger.types';

jest.mock('../../contexts/dialogContext.ts');

describe('DialogTrigger', () => {
  beforeEach(() => mockUseDialogContext());

  isConformant<DialogTriggerProps>({
    disabledTests: [
      // DialogTrigger does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      // DialogTrigger does not have own styles
      'make-styles-overrides-win',
    ],
    Component: DialogTrigger,
    displayName: 'DialogTrigger',
    requiredProps: {
      children: <button>DialogTrigger</button>,
    },
  });

  /**
   * Note: see more visual regression tests for DialogTrigger in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(
      <DialogTrigger disableButtonEnhancement>
        <button>Dialog trigger</button>
      </DialogTrigger>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should retain original child callback ref', () => {
    // Arrange
    const ref = jest.fn();
    render(
      <DialogTrigger disableButtonEnhancement>
        <button ref={ref}>Trigger</button>
      </DialogTrigger>,
    );

    // Assert
    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        <button
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
        <DialogTrigger disableButtonEnhancement>
          <button ref={ref}>Trigger</button>
        </DialogTrigger>
      );
    };
    render(<TestComponent />);

    // Assert
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        <button
          data-tabster="{\\"restorer\\":{\\"type\\":1}}"
        >
          Trigger
        </button>,
      ]
    `);
  });

  it('should open dialog when aria-disabled is false', () => {
    const requestOpenChange = jest.fn();
    mockUseDialogContext({ requestOpenChange });

    const { getByRole } = render(
      <DialogTrigger disableButtonEnhancement action="open">
        <button aria-disabled={false}>trigger</button>
      </DialogTrigger>,
    );
    fireEvent.click(getByRole('button'));

    expect(requestOpenChange).toBeCalledTimes(1);
    expect(requestOpenChange).toHaveBeenCalledWith(expect.objectContaining({ open: true }));
  });

  it('should not open dialog when trigger is disabled', () => {
    const requestOpenChange = jest.fn();
    mockUseDialogContext({ requestOpenChange });

    const { getByRole } = render(
      <DialogTrigger disableButtonEnhancement>
        <button disabled>trigger</button>
      </DialogTrigger>,
    );
    fireEvent.click(getByRole('button'));

    expect(requestOpenChange).toBeCalledTimes(0);
  });

  it('should not keyboard click when event is default prevented', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <DialogTrigger disableButtonEnhancement>
        <div role="button" onClick={onClick}>
          trigger
        </div>
      </DialogTrigger>,
    );
    const event = createEvent.keyDown(getByRole('button'), { key: Enter });
    event.preventDefault();
    fireEvent(getByRole('button'), event);

    expect(onClick).toBeCalledTimes(0);
  });
});
