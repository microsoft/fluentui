import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PopoverTrigger } from './PopoverTrigger';
import * as renderer from 'react-test-renderer';
import { mockPopoverContext } from '../../common/mockUsePopoverContext';

jest.mock('../../popoverContext');

describe('PopoverTrigger', () => {
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
});
