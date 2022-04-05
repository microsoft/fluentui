import { resetIdsForTests } from '@fluentui/react-utilities';
import * as React from 'react';
import { PopoverSurface } from './PopoverSurface';
import { render, fireEvent } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { mockPopoverContext } from '../../common/mockUsePopoverContext';
import { PopoverSurfaceProps } from './PopoverSurface.types';

jest.mock('../../popoverContext');

describe('PopoverSurface', () => {
  // PopoverSurface is rendered by a Portal so won't be available in the rendered container
  const testid = 'component';
  // also include an aria-label to prevent warnings in debug mode
  const props = { 'data-testid': testid, 'aria-label': 'test' };

  isConformant({
    Component: PopoverSurface,
    displayName: 'PopoverSurface',
    requiredProps: props as PopoverSurfaceProps,
    getTargetElement: result => result.getByTestId(testid),
  });

  beforeEach(() => {
    resetIdsForTests();
    mockPopoverContext({});
  });

  /**
   * Note: see more visual regression tests for PopoverSurface in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { getByTestId } = render(<PopoverSurface {...props}>Default PopoverSurface</PopoverSurface>);
    expect(getByTestId(testid)).toMatchSnapshot();
  });

  it.each([
    ['onMouseEnter', fireEvent.mouseEnter],
    ['onMouseLeave', fireEvent.mouseLeave],
    ['onKeyDown', fireEvent.keyDown],
  ])('should keep the original %s handler', (handler, triggerEvent) => {
    // Arrange
    const spy = jest.fn();
    const { getByTestId } = render(
      <PopoverSurface {...props} {...{ [handler]: spy }}>
        Content
      </PopoverSurface>,
    );

    // Act
    triggerEvent(getByTestId(testid));

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should set aria-modal true if focus trap is active', () => {
    // Arrange
    mockPopoverContext({ trapFocus: true });
    const { getByTestId } = render(<PopoverSurface {...props}>Content</PopoverSurface>);

    // Assert
    expect(getByTestId(testid).getAttribute('aria-modal')).toEqual('true');
  });

  it('should set role dialog if focus trap is active', () => {
    // Arrange
    mockPopoverContext({ trapFocus: true });
    const { queryByRole } = render(<PopoverSurface {...props}>Content</PopoverSurface>);

    // Assert
    expect(queryByRole('dialog')).not.toBeNull();
  });

  it('should set role complementary if focus trap is not active', () => {
    // Arrange
    mockPopoverContext({ trapFocus: false });
    const { getByTestId } = render(<PopoverSurface {...props}>Content</PopoverSurface>);

    // Assert
    expect(getByTestId(testid)).not.toBeNull();
  });
});
