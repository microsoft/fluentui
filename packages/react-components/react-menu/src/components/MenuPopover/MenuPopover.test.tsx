import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MenuPopover } from './MenuPopover';
import { isConformant } from '../../common/isConformant';
import { MenuPopoverProps } from './MenuPopover.types';

describe('MenuPopover', () => {
  const testid = 'test';

  isConformant({
    Component: MenuPopover,
    displayName: 'MenuPopover',
    requiredProps: { 'data-testid': testid } as MenuPopoverProps,
    getTargetElement: result => result.getByTestId(testid),
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
