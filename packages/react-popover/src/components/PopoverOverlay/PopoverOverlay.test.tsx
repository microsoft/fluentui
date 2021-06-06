import * as React from 'react';
import { PopoverOverlay } from './PopoverOverlay';
import { render, fireEvent } from '@testing-library/react';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { Portal } from '@fluentui/react-portal';
import { mockPopoverContext } from '../../common/mockUsePopoverContext';
import { PopoverOverlayProps } from './PopoverOverlay.types';

jest.mock('../../popoverContext');

describe('PopoverOverlay', () => {
  isConformant({
    // as render test will pass a span tag which is also considered one of the skipped helperComponents
    disabledTests: ['as-renders-html'],
    Component: PopoverOverlay,
    displayName: 'PopoverOverlay',
    requiredProps: { open: true } as PopoverOverlayProps,
    helperComponents: [Portal, 'span'],
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  beforeEach(() => {
    mockPopoverContext({ open: true });
  });

  // PopoverOverlay is rendered by a Portal so won't be available in the rendered container
  const testid = 'component';

  /**
   * Note: see more visual regression tests for PopoverOverlay in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { getByTestId } = render(<PopoverOverlay data-testid={testid}>Default PopoverOverlay</PopoverOverlay>);
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
      <PopoverOverlay data-testid={testid} {...{ [handler]: spy }}>
        Content
      </PopoverOverlay>,
    );

    // Act
    triggerEvent(getByTestId(testid));

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not render when open is false', () => {
    // Arrange
    mockPopoverContext({ open: false });
    const { queryByTestId } = render(<PopoverOverlay data-testid={testid}>Content</PopoverOverlay>);

    // Assert
    expect(queryByTestId(testid)).toBeNull();
  });
});
