import * as React from 'react';
import { MenuTrigger } from './MenuTrigger';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('MenuTrigger', () => {
  isConformant({
    Component: MenuTrigger,
    displayName: 'MenuTrigger',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for MenuTrigger in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<MenuTrigger>Default MenuTrigger</MenuTrigger>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
