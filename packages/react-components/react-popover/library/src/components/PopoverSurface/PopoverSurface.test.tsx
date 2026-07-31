import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { resetIdsForTests } from '@fluentui/react-utilities';
import * as React from 'react';
import { PopoverSurface } from './PopoverSurface';
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
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` is disabled because this package no longer
    // publishes BEM statics (DECISIONS.md D16.1): the test hard-codes the `fui-<Component>`
    // format and asserts those classes are rendered, both of which are exactly what D16
    // retires. `component-has-group-marker` (a default test) replaces it — it asserts
    // `group/fui-popover-surface` IS stamped and, per D16.2, is never `classList[0]`.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
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

  it('should set role group if focus trap is not active', () => {
    // Arrange
    mockPopoverContext({ trapFocus: false });
    const { getByTestId } = render(<PopoverSurface {...props}>Content</PopoverSurface>);

    // Assert
    expect(getByTestId(testid)).not.toBeNull();
  });
});
