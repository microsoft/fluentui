import * as React from 'react';
import { ThemeProvider } from './ThemeProvider';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { ThemeContext } from '@fluentui/react-shared-contexts';

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
});
