import * as React from 'react';
import { FluentProvider } from './FluentProvider';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { ProviderContext, ThemeContext } from '@fluentui/react-shared-contexts';
import { FocusManagementProvider } from '@fluentui/react-focus-management';

describe('FluentProvider', () => {
  isConformant({
    Component: FluentProvider,
    displayName: 'FluentProvider',
    helperComponents: [ProviderContext.Provider, ThemeContext.Provider, FocusManagementProvider],
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
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
