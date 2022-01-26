import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Portal } from '@fluentui/react-portal';
import { MenuPopover } from './MenuPopover';
import { isConformant } from '../../common/isConformant';

describe('MenuPopover', () => {
  isConformant({
    // FIXME disabled because it will test the virtual parent span
    disabledTests: ['as-renders-html'],
    Component: MenuPopover,
    displayName: 'MenuPopover',
    helperComponents: [Portal, 'span'],
  });

  it('renders a default state', () => {
    const { container } = render(<MenuPopover>Children</MenuPopover>);

    expect(container).toMatchSnapshot();
  });

  it.each([
    ['onMouseEnter', fireEvent.mouseEnter],
    ['onMouseLeave', fireEvent.mouseLeave],
    ['onBlur', fireEvent.blur],
    ['onKeyDown', fireEvent.keyDown],
  ])('should pass original %s handler to menu popup', (handler, trigger) => {
    // Arrange
    const testid = 'test';
    const spy = jest.fn();
    const props = { [handler]: spy };
    const { getByTestId } = render(
      <MenuPopover data-testid={testid} {...props}>
        Children
      </MenuPopover>,
    );

    // Act
    trigger(getByTestId(testid));

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
