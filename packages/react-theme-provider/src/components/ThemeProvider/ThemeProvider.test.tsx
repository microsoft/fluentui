import * as React from 'react';
import { ThemeContext } from '@fluentui/react-shared-contexts';
import { resetIdsForTests } from '@fluentui/react-utilities';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { ThemeProvider } from './ThemeProvider';
import { isConformant } from '../../common/isConformant';

describe('ThemeProvider', () => {
  isConformant({
    disabledTests: ['component-handles-classname'],
    Component: ThemeProvider,
    displayName: 'ThemeProvider',
    helperComponents: [ThemeContext.Provider],
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    resetIdsForTests();

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
