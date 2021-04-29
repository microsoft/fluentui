import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PopupTrigger } from './PopupTrigger';
import * as renderer from 'react-test-renderer';
import { mockPopupContext } from '../../common/mockUsePopupContext';

jest.mock('../../popupContext');

describe('PopupTrigger', () => {
  beforeEach(() => {
    mockPopupContext();
  });

  /**
   * Note: see more visual regression tests for PopupTrigger in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(
      <PopupTrigger>
        <button>Popup trigger</button>
      </PopupTrigger>,
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
      <PopupTrigger>
        <button {...{ [handler]: spy }}>Trigger</button>
      </PopupTrigger>,
    );

    // Act
    triggerEvent(getByRole('button'));

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should set aria-haspopup on trigger element', () => {
    // Arrange
    const { getByRole } = render(
      <PopupTrigger>
        <button>Trigger</button>
      </PopupTrigger>,
    );

    // Assert
    expect(getByRole('button').getAttribute('aria-haspopup')).toEqual('true');
  });
});
