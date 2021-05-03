import { resetIdsForTests } from '@fluentui/react-utilities';
import * as React from 'react';
import { FluentProvider } from './FluentProvider';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { ProviderContext } from '@fluentui/react-shared-contexts';
import { ThemeProvider } from '@fluentui/react-theme-provider';

describe('FluentProvider', () => {
  isConformant({
    disabledTests: ['component-handles-classname'],
    Component: FluentProvider,
    displayName: 'FluentProvider',
    helperComponents: [ProviderContext.Provider, ThemeProvider],
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
   * Note: see more visual regression tests for FluentProvider in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<FluentProvider>Default FluentProvider</FluentProvider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
