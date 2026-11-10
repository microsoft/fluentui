import * as React from 'react';
import { MenuGridGroupHeader } from './MenuGridGroupHeader';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { MenuGridGroupContextProvider } from '../../contexts/menuGridGroupContext';

describe('MenuGridGroupHeader', () => {
  isConformant({
    Component: MenuGridGroupHeader,
    displayName: 'MenuGridGroupHeader',
  });

  /**
   * Note: see more visual regression tests for MenuGridGroupHeader in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<MenuGridGroupHeader>Default MenuGridGroupHeader</MenuGridGroupHeader>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should allow user to specify their own id', () => {
    // Arrange
    const id = 'xxx';

    // Act
    const { container } = render(
      <MenuGridGroupContextProvider value={{ headerId: 'context' }}>
        <MenuGridGroupHeader id={id}>Header</MenuGridGroupHeader>
      </MenuGridGroupContextProvider>,
    );

    // Assert
    expect(container.firstElementChild?.id).toEqual(id);
  });
});
