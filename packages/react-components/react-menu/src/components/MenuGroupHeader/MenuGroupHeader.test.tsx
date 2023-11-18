import * as React from 'react';
import { MenuGroupHeader } from './MenuGroupHeader';
import * as renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { MenuGroupContextProvider } from '../../contexts/menuGroupContext';

describe('MenuGroupHeader', () => {
  isConformant({
    Component: MenuGroupHeader,
    displayName: 'MenuGroupHeader',
  });

  /**
   * Note: see more visual regression tests for MenuGroupHeader in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<MenuGroupHeader>Default MenuGroupHeader</MenuGroupHeader>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should allow user to specify their own id', () => {
    // Arrange
    const id = 'xxx';

    // Act
    const { container } = render(
      <MenuGroupContextProvider value={{ headerId: 'context' }}>
        <MenuGroupHeader id={id}>Header</MenuGroupHeader>
      </MenuGroupContextProvider>,
    );

    // Assert
    expect(container.firstElementChild?.id).toEqual(id);
  });
});
