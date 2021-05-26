import * as React from 'react';
import { PopoverContent } from './PopoverContent';
import { render, fireEvent } from '@testing-library/react';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { Portal } from '@fluentui/react-portal';
import { mockPopoverContext } from '../../common/mockUsePopoverContext';
import { PopoverContentProps } from './PopoverContent.types';

jest.mock('../../popoverContext');

describe('PopoverContent', () => {
  isConformant({
    // as render test will pass a span tag which is also considered one of the skipped helperComponents
    disabledTests: ['as-renders-html'],
    Component: PopoverContent,
    displayName: 'PopoverContent',
    requiredProps: { open: true } as PopoverContentProps,
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

  // PopoverContent is rendered by a Portal so won't be available in the rendered container
  const testid = 'component';

  /**
   * Note: see more visual regression tests for PopoverContent in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { getByTestId } = render(<PopoverContent data-testid={testid}>Default PopoverContent</PopoverContent>);
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
      <PopoverContent data-testid={testid} {...{ [handler]: spy }}>
        Content
      </PopoverContent>,
    );

    // Act
    triggerEvent(getByTestId(testid));

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not render when open is false', () => {
    // Arrange
    mockPopoverContext({ open: false });
    const { queryByTestId } = render(<PopoverContent data-testid={testid}>Content</PopoverContent>);

    // Assert
    expect(queryByTestId(testid)).toBeNull();
  });
});
