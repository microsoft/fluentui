import * as React from 'react';
import { PopupContent } from './PopupContent';
import { render, fireEvent } from '@testing-library/react';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { Portal } from '@fluentui/react-portal';
import { mockPopupContext } from '../../common/mockUsePopupContext';

jest.mock('../../popupContext');

describe('PopupContent', () => {
  isConformant({
    Component: PopupContent,
    displayName: 'PopupContent',
    requiredProps: { open: true },
    helperComponents: [Portal],
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  beforeEach(() => {
    mockPopupContext({ open: true });
  });

  // PopupContent is rendered by a Portal so won't be available in the rendered container
  const testid = 'component';

  /**
   * Note: see more visual regression tests for PopupContent in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { getByTestId } = render(<PopupContent data-testid={testid}>Default PopupContent</PopupContent>);
    expect(getByTestId(testid)).toMatchSnapshot();
  });

  it.each([
    ['onMouseEnter', fireEvent.mouseEnter],
    ['onMouseLeave', fireEvent.mouseLeave],
  ])('should keep the original %s handler', (handler, triggerEvent) => {
    // Arrange
    const spy = jest.fn();
    const { getByTestId } = render(
      <PopupContent data-testid={testid} {...{ [handler]: spy }}>
        Content
      </PopupContent>,
    );

    // Act
    triggerEvent(getByTestId(testid));

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not render when open is false', () => {
    // Arrange
    mockPopupContext({ open: false });
    const { queryByTestId } = render(<PopupContent data-testid={testid}>Content</PopupContent>);

    // Assert
    expect(queryByTestId(testid)).toBeNull();
  });
});
