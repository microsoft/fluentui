import { resetIdsForTests } from '@fluentui/react-utilities';
import * as React from 'react';
import { PopoverSurface } from './PopoverSurface';
import { render, fireEvent } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { Portal } from '@fluentui/react-portal';
import { mockPopoverContext } from '../../common/mockUsePopoverContext';

jest.mock('../../popoverContext');

describe('PopoverSurface', () => {
  isConformant({
    Component: PopoverSurface,
    displayName: 'PopoverSurface',
    helperComponents: [Portal, 'span'],
  });

  beforeEach(() => {
    resetIdsForTests();
    mockPopoverContext({});
  });

  // PopoverSurface is rendered by a Portal so won't be available in the rendered container
  const testid = 'component';

  /**
   * Note: see more visual regression tests for PopoverSurface in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { getByTestId } = render(<PopoverSurface data-testid={testid}>Default PopoverSurface</PopoverSurface>);
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
      <PopoverSurface data-testid={testid} {...{ [handler]: spy }}>
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
    const { getByTestId } = render(<PopoverSurface data-testid={testid}>Content</PopoverSurface>);

    // Assert
    expect(getByTestId(testid).getAttribute('aria-modal')).toEqual('true');
  });

  it('should set role dialog if focus trap is active', () => {
    // Arrange
    mockPopoverContext({ trapFocus: true });
    const { queryByRole } = render(<PopoverSurface data-testid={testid}>Content</PopoverSurface>);

    // Assert
    expect(queryByRole('dialog')).not.toBeNull();
  });

  it('should set role complementary if focus trap is not active', () => {
    // Arrange
    mockPopoverContext({ trapFocus: false });
    const { getByTestId } = render(<PopoverSurface data-testid={testid}>Content</PopoverSurface>);

    // Assert
    expect(getByTestId(testid)).not.toBeNull();
  });
});
