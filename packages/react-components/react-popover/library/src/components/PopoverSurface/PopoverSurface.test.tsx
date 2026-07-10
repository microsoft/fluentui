import { resetIdsForTests } from '@fluentui/react-utilities';
import * as React from 'react';
import { PopoverSurface } from './PopoverSurface';
import { getPopoverSurfaceAriaAttributes } from './usePopoverSurface';
import { render, fireEvent } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { mockPopoverContext } from '../../testing/mockUsePopoverContext';
import type { PopoverSurfaceProps } from './PopoverSurface.types';

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

  it('should set role group if focus trap is not active and an accessible name is provided', () => {
    // Arrange
    mockPopoverContext({ trapFocus: false });
    // props includes aria-label='test', so role='group' should be applied
    const { getByTestId } = render(<PopoverSurface {...props}>Content</PopoverSurface>);

    // Assert
    expect(getByTestId(testid).getAttribute('role')).toEqual('group');
  });
});

describe('getPopoverSurfaceAriaAttributes', () => {
  it('returns dialog attributes when focus is trapped', () => {
    expect(
      getPopoverSurfaceAriaAttributes({
        hasAccessibleName: false,
        trapFocus: true,
      }),
    ).toEqual({
      role: 'dialog',
      'aria-modal': true,
    });
  });

  it('returns group when the surface has an accessible name', () => {
    expect(
      getPopoverSurfaceAriaAttributes({
        hasAccessibleName: true,
        trapFocus: false,
      }),
    ).toEqual({
      role: 'group',
    });
  });

  it('returns no role when the surface is unlabelled', () => {
    expect(
      getPopoverSurfaceAriaAttributes({
        hasAccessibleName: false,
        trapFocus: false,
      }),
    ).toEqual({});
  });
});
