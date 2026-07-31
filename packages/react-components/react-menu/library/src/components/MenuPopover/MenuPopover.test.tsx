import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MenuPopover } from './MenuPopover';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import type { MenuPopoverProps } from './MenuPopover.types';

describe('MenuPopover', () => {
  const testid = 'test';

  isConformant({
    Component: MenuPopover,
    displayName: 'MenuPopover',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts the `fui-<Component>__<slot>` BEM
    // format DECISIONS.md D16.1 removed. `component-has-group-marker` (a default test since
    // D16.6) replaces it: it asserts the group marker IS stamped and is never
    // `classList[0]` (D16.2). The `has-static-classnames` testOptions that fed the deleted
    // test went with it.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
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
