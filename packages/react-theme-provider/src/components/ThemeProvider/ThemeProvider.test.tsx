import * as React from 'react';
import { ThemeContext } from '@fluentui/react-shared-contexts';
import { render } from '@testing-library/react';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { ThemeProvider } from './ThemeProvider';
import { isConformant } from '../../common/isConformant';

describe('ThemeProvider', () => {
  isConformant({
    Component: ThemeProvider,
    displayName: 'ThemeProvider',
    helperComponents: [ThemeContext.Provider],
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for ThemeProvider in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<ThemeProvider>Default ThemeProvider</ThemeProvider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should concat props className with themeClassName', () => {
    // Arrange
    const className = 'user';

    // Act
    const { container } = render(<ThemeProvider className={className}>ThemeProvider</ThemeProvider>);

    // Assert
    expect(container.querySelector(`.${className}`)?.className).toMatchInlineSnapshot(`"user theme-provider22"`);
  });
});
